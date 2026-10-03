// Builds one self-contained n8n community node package per CompassLab API from the shared source.
//
//   node generate.mjs          writes packages/n8n-nodes-compasslab-<id>/
//
// Shared code lives in src/shared, each API's operations in src/products/<id>.ts, and the table below holds
// everything else (names, marketplace slug and host, README text). Edit those, never the generated packages.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const REPO = 'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab';
const AUTHOR = { name: 'CompassLab', email: 'jaouchamouad@proton.me' }; // public support address, required by n8n's linter
const VERSION = '0.1.0';
const LEGAL = {
	holidays: 'https://eu-business-validator.onrender.com',
	email: 'https://email-validator-8cgg.onrender.com',
	web: 'https://web-tools-hbvr.onrender.com',
	pdf: 'https://pdf-eryx.onrender.com',
};

// id: package suffix and src/products file. cls: class prefix. apiTitle: the marketplace listing name.
const PRODUCTS = [
	{
		id: 'holidays',
		cls: 'CompassLabHolidays',
		title: 'CompassLab Holidays',
		apiTitle: 'Public Holidays and Business Days',
		slug: 'public-holidays',
		host: 'public-holidays-and-business-days.p.rapidapi.com',
		legal: LEGAL.holidays,
		colour: '#2DA44E',
		glyph: 'H',
		categories: ['Utility', 'Productivity'],
		description:
			'Public holidays for 250 countries and regions, plus business-day math: is it a working day, add days, count days',
		keywords: ['public holidays', 'business days', 'working days', 'due date', 'calendar'],
		operations: [
			['Get Holidays', 'Public holidays of a country (and region) for one year, one item per holiday'],
			['Get Countries', 'Supported countries with their regions, languages, holiday types and weekend'],
			['Is Business Day', 'Whether a date is a business day and, if not, why (weekend, holiday, your closing day)'],
			['Add Business Days', 'Add or subtract business days: due dates, delivery and payment terms'],
			['Count Business Days', 'Business days between two dates, with the holidays in the range'],
		],
		examples: [
			'**Due dates that skip holidays.** Webhook (order received) > CompassLab Holidays: Add Business Days (country `DE`, 10 days) > your invoicing tool.',
			'**No reminders on days off.** Schedule trigger > CompassLab Holidays: Is Business Day (today, your country) > IF `is_business_day` > send the reminders.',
		],
		measured:
			'Checked against official 2026 government holiday lists for 10 regions: 9 of 10 match every weekday day off.',
	},
	{
		id: 'email-validator',
		cls: 'CompassLabEmailValidator',
		title: 'CompassLab Email Validator',
		apiTitle: 'Email Validator with MX and Disposable Check',
		slug: 'email-validator',
		host: 'email-validator-with-mx-and-disposable-check.p.rapidapi.com',
		legal: LEGAL.email,
		colour: '#1F6FEB',
		glyph: '@',
		categories: ['Marketing', 'Utility'],
		description:
			'Validate email addresses: syntax, MX records, disposable and role addresses, free providers, typo suggestions',
		keywords: ['email validation', 'email verifier', 'mx check', 'disposable email', 'list cleaning'],
		operations: [
			['Validate', 'One address: syntax, MX records, disposable, role and free-provider flags, typo suggestion'],
			['Validate Many', 'Up to 10 addresses in one request (counts as one request), one item per address'],
		],
		examples: [
			'**Clean a signup list.** Google Sheets (read rows) > CompassLab Email Validator: Validate > IF `status` is `valid` > Google Sheets (update row).',
			'**Catch typos in forms.** Form trigger > CompassLab Email Validator: Validate > IF `suggestion` is not empty > ask the user to confirm the corrected address.',
		],
		measured: '20 of 20 verdicts correct on our labelled real-world set, about 70 ms per address.',
	},
	{
		id: 'phone-validator',
		cls: 'CompassLabPhoneValidator',
		title: 'CompassLab Phone Validator',
		apiTitle: 'Phone Number Validator and Formatter',
		slug: 'phone-validator',
		host: 'phone-number-validator-and-formatter1.p.rapidapi.com',
		legal: LEGAL.email,
		colour: '#8250DF',
		glyph: '#',
		categories: ['Communication', 'Utility'],
		description:
			'Validate and format phone numbers from any country: E.164, national format, type, country, region, time zone',
		keywords: ['phone validation', 'phone number formatter', 'e164', 'libphonenumber', 'crm cleanup'],
		operations: [
			['Validate', 'One number: valid or not (and why), E.164, international and national format, type, country, region, time zones'],
			['Validate Many', 'Up to 50 numbers in one request (counts as one request), one item per number'],
		],
		examples: [
			'**Normalise CRM phone numbers.** CRM (get contacts) > CompassLab Phone Validator: Validate (default country `GB`) > CRM update with `e164`.',
			'**SMS only to mobiles.** Google Sheets > CompassLab Phone Validator: Validate > IF `type` is `mobile` > your SMS node.',
		],
		measured:
			"25 of 25 real business numbers from 10 countries match Google's official libphonenumber demo, about 70 ms per number.",
	},
	{
		id: 'article-extractor',
		cls: 'CompassLabArticleExtractor',
		title: 'CompassLab Article Extractor',
		apiTitle: 'Article Extractor to Clean Text and Markdown',
		slug: 'article-extractor',
		host: 'article-extractor-to-clean-text-and-markdown.p.rapidapi.com',
		legal: LEGAL.web,
		colour: '#CF222E',
		glyph: 'A',
		categories: ['Marketing', 'Utility'],
		description:
			'Turn any web page or PDF link into clean Markdown and text, with title, author, date and language',
		keywords: ['article extractor', 'url to markdown', 'web scraping', 'content extraction', 'rag'],
		operations: [
			['Extract', 'Main content of one page as Markdown and/or text, with title, author, date, language and an honest status'],
			['Extract Many', 'Up to 3 pages in one request (counts as one request), one item per page'],
		],
		examples: [
			'**RSS to AI summary.** RSS trigger > CompassLab Article Extractor: Extract (output Markdown, max 20,000 characters) > AI summarisation > Slack.',
			'**Research agent.** AI Agent with CompassLab Article Extractor as a tool: it reads any link you give it.',
		],
		measured: 'Median answer about 0.6 s per page on our server.',
	},
	{
		id: 'link-preview',
		cls: 'CompassLabLinkPreview',
		title: 'CompassLab Link Preview',
		apiTitle: 'Link Preview and URL Metadata',
		slug: 'link-preview',
		host: 'link-preview-and-url-metadata2.p.rapidapi.com',
		legal: LEGAL.web,
		colour: '#BF8700',
		glyph: 'L',
		categories: ['Marketing', 'Utility'],
		description:
			'Link previews for any URL: title, description, image, favicon, site name and canonical URL, within 5 seconds',
		keywords: ['link preview', 'url metadata', 'open graph', 'unfurl', 'og image'],
		operations: [
			['Get Link Preview', 'Title, description, image, favicon, site name, canonical URL, language and type of any URL'],
		],
		examples: [
			'**Rich links in chat.** Slack or Discord trigger (message with a link) > CompassLab Link Preview > post a card with `title`, `description` and `image`.',
			'**Bookmark manager.** Webhook (saved link) > CompassLab Link Preview > Notion or Airtable row.',
		],
		measured: 'Median answer about 0.2 s; gives up after 5 s so your workflow never hangs.',
	},
	{
		id: 'contact-extractor',
		cls: 'CompassLabContactExtractor',
		title: 'CompassLab Contact Extractor',
		apiTitle: 'Website Contact Extractor for Emails and Phones',
		slug: 'contact-extractor',
		host: 'website-contact-extractor-for-emails-and-phones.p.rapidapi.com',
		legal: LEGAL.web,
		colour: '#0969DA',
		glyph: 'C',
		categories: ['Sales', 'Marketing'],
		description:
			"Find a company's published business emails, phones, social profiles, address and VAT ID from its domain",
		keywords: ['contact extractor', 'lead enrichment', 'company contacts', 'b2b leads', 'crm enrichment'],
		operations: [
			['Find Contacts', 'Business emails, phones (E.164), social profiles, company name, address and VAT ID, each with its source page and a confidence score'],
		],
		examples: [
			'**Enrich new leads.** CRM trigger (new company) > CompassLab Contact Extractor: Find Contacts (company domain) > CRM update.',
			'**Supplier onboarding.** Form trigger > CompassLab Contact Extractor > compare the published address and VAT ID with what the supplier entered.',
		],
		measured:
			'On 40 real company domains, 30 returned at least one email or phone (the others publish none or block bots); median 2.7 s.',
	},
	{
		id: 'social-links',
		cls: 'CompassLabSocialLinks',
		title: 'CompassLab Social Links',
		apiTitle: 'Social Links Finder for Company Profiles',
		slug: 'social-links-finder',
		host: 'social-links-finder-for-company-profiles.p.rapidapi.com',
		legal: LEGAL.web,
		colour: '#E16F24',
		glyph: 'S',
		categories: ['Sales', 'Marketing'],
		description:
			"Find a company's official LinkedIn, X, Instagram, YouTube, TikTok, GitHub and more from its domain",
		keywords: ['social links', 'company social profiles', 'linkedin company', 'lead enrichment', 'social media'],
		operations: [
			['Find Social Links', "A company's official profiles on 14 networks, with handles, company name and logo"],
			['Find Social Links for Many', 'Up to 5 domains in one request (counts as one request), one item per domain'],
		],
		examples: [
			'**CRM enrichment.** CRM (get companies) > CompassLab Social Links: Find Social Links > CRM update with the LinkedIn and X URLs.',
			'**Partner directory.** Google Sheets (vendor domains) > CompassLab Social Links: Find Social Links for Many > Airtable.',
		],
		measured:
			'On 20 real company domains, 17 returned 2 or more official profiles; every profile checked by hand belonged to the company. Median 1.8 s.',
	},
	{
		id: 'tech-stack',
		cls: 'CompassLabTechStack',
		title: 'CompassLab Tech Stack',
		apiTitle: 'Website Technology Stack Detector',
		slug: 'tech-stack-detector',
		host: 'website-technology-stack-detector.p.rapidapi.com',
		legal: LEGAL.web,
		colour: '#57606A',
		glyph: 'T',
		categories: ['Sales', 'Development'],
		description:
			'Detect the technologies behind any website: CMS, shop platform, analytics, CDN, hosting, payments and more',
		keywords: ['tech stack', 'technology lookup', 'website technology', 'cms detector', 'technographics'],
		operations: [
			['Detect Tech Stack', 'Technologies of a website with category, version when exposed, confidence and the evidence that matched'],
		],
		examples: [
			'**Find Shopify stores.** Google Sheets (prospect domains) > CompassLab Tech Stack > IF technologies contain `Shopify` > CRM.',
			'**Agency audit.** Form trigger (client URL) > CompassLab Tech Stack > AI Agent writes the audit > email.',
		],
		measured:
			'Main platform detected on 19 of 20 sites with publicly known stacks; 7.7 technologies found per site on average.',
	},
	{
		id: 'qr-barcode',
		cls: 'CompassLabQrBarcode',
		title: 'CompassLab QR and Barcode',
		apiTitle: 'QR Code and Barcode Generator and Reader',
		slug: 'qr-barcode',
		host: 'qr-code-and-barcode-generator-and-reader.p.rapidapi.com',
		legal: LEGAL.web,
		colour: '#24292F',
		glyph: 'QR',
		categories: ['Utility'],
		description:
			'Generate QR codes and EAN-13, UPC-A, Code 128, Code 39 barcodes (PNG or SVG), and read them from images',
		keywords: ['qr code', 'barcode', 'qr code generator', 'barcode reader', 'ean13'],
		operations: [
			['Generate QR Code', 'A QR code as a PNG or SVG file, with colours, error correction and size'],
			['Generate Barcode', 'An EAN-13, UPC-A, Code 128 or Code 39 barcode as a PNG or SVG file (check digit computed or verified)'],
			['Read Codes', 'Every QR code and barcode in an image (URL or file), with format, value and position'],
		],
		examples: [
			'**Tickets with QR codes.** Webhook (new booking) > CompassLab QR and Barcode: Generate QR Code (booking URL) > Gmail with the `data` file attached.',
			'**Scan product photos.** Google Drive trigger (new photo) > CompassLab QR and Barcode: Read Codes (Source `Binary File`) > look up the GTIN.',
		],
		measured: '50 of 50 generated codes read back exactly and 10 of 10 photo-like images read; reading takes about 70 ms.',
	},
	{
		id: 'pdf-to-text',
		cls: 'CompassLabPdfToText',
		title: 'CompassLab PDF to Text',
		apiTitle: 'PDF to Text and Markdown',
		slug: 'pdf-to-text',
		host: 'pdf-to-text-and-markdown.p.rapidapi.com',
		legal: LEGAL.pdf,
		colour: '#A40E26',
		glyph: 'PDF',
		categories: ['Utility', 'Productivity'],
		description:
			'Extract the text of a PDF (URL or file) as plain text, Markdown or page by page, with metadata and scanned-page flags',
		keywords: ['pdf to text', 'pdf to markdown', 'pdf extraction', 'pdf parser', 'rag'],
		operations: [
			['Extract Text', 'Text of a PDF from a URL or a binary file, as plain text, Markdown or one entry per page, with page count, metadata, language and scanned pages'],
		],
		examples: [
			'**PDF attachments to text.** Gmail trigger (with attachments) > CompassLab PDF to Text (Source `Binary File`, field `attachment_0`) > AI Agent or a database.',
			'**Documents for RAG.** Google Drive (download PDF) > CompassLab PDF to Text (format Markdown) > vector store.',
		],
		measured:
			'20 of 20 real PDFs handled correctly (papers, standards, tax forms, law texts, a scan and a password-protected file).',
	},
];

const lower = (s) => s[0].toLowerCase() + s.slice(1);
const write = (path, text) => {
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, text.replace(/\r\n/g, '\n'));
};

function icon(p, dark) {
	const ring = dark ? lighten(p.colour) : p.colour;
	const size = p.glyph.length > 2 ? 11 : p.glyph.length > 1 ? 14 : 18;
	return `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="18" stroke="${ring}" stroke-width="3"/>
<text x="20" y="20" fill="${ring}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="700" text-anchor="middle" dominant-baseline="central">${p.glyph.replace('&', '&amp;')}</text>
</svg>
`;
}

function lighten(hex) {
	const n = parseInt(hex.slice(1), 16);
	const mix = (c) => Math.round(c + (255 - c) * 0.45);
	const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(mix);
	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function credential(p, kind) {
	const apiMarket = kind === 'ApiMarket';
	const cls = `${p.cls}${kind}Api`;
	const where = apiMarket ? 'api.market' : 'RapidAPI';
	const header = apiMarket ? 'x-api-market-key' : 'x-rapidapi-key';
	return `import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ${cls} implements ICredentialType {
	name = '${lower(cls)}';

	displayName = '${p.title} (${where}) API';

	icon: Icon = { light: 'file:../icons/${p.id}.svg', dark: 'file:../icons/${p.id}.dark.svg' };

	documentationUrl = '${REPO}/tree/main/packages/n8n-nodes-compasslab-${p.id}#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your ${where} key (${apiMarket ? 'x-api-market-key' : 'X-RapidAPI-Key'}). Subscribe to ${p.apiTitle} on ${where} first; it has a free plan.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'${header}': '={{$credentials.apiKey}}',
			},
		},
	};
}
`;
}

function node(p) {
	const apiMarketCred = lower(`${p.cls}ApiMarketApi`);
	const rapidCred = lower(`${p.cls}RapidApiApi`);
	return `import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { apiMarketTest, rapidApiTest } from './shared/credentialTest';
import { withErrorHandling } from './shared/transport';

export class ${p.cls} implements INodeType {
	description: INodeTypeDescription = {
		displayName: '${p.title}',
		name: '${lower(p.cls)}',
		icon: { light: 'file:../../icons/${p.id}.svg', dark: 'file:../../icons/${p.id}.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: '${p.description.replace(/'/g, "\\'")}',
		defaults: {
			name: '${p.title}',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: '${apiMarketCred}',
				required: true,
				testedBy: 'apiMarketTest',
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: '${rapidCred}',
				required: true,
				testedBy: 'rapidApiTest',
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': '${`n8n-nodes-compasslab-${p.id}/${VERSION}`}',
			},
		},
		properties: [
			{
				displayName: 'Marketplace',
				name: 'authentication',
				type: 'options',
				options: [
					{ name: 'Api.market', value: 'apiMarket' },
					{ name: 'RapidAPI', value: 'rapidApi' },
				],
				default: 'apiMarket',
				description: 'Where you subscribed to ${p.apiTitle}',
			},
			...withErrorHandling(operations),
		],
	};

	methods = {
		credentialTest: {
			apiMarketTest,
			rapidApiTest,
		},
	};
}
`;
}

function readme(p, pkg) {
	const ops = p.operations.map(([name, what]) => `| **${name}** | ${what} |`).join('\n');
	return `# ${pkg}

This is an n8n community node for **${p.apiTitle}** by CompassLab: ${p.description[0].toLowerCase()}${p.description.slice(1)}.

| Operation | What it does |
|---|---|
${ops}

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter \`${pkg}\`.

## Credentials

${p.apiTitle} is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **${p.apiTitle}** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (\`x-api-market-key\`).
3. In n8n, create a **${p.title} (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **${p.apiTitle}**.
2. Subscribe to the free BASIC plan and copy your \`X-RapidAPI-Key\` from the playground.
3. In n8n, create a **${p.title} (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test checks your key without using any of your quota.

## Usage

- Each input item makes one request.${p.operations.some(([n]) => / Many$/.test(n)) ? ' The "Many" operations send a list in one request (it counts as one request on your plan) and return one item per entry; enter one entry per line or comma-separated, or map a field from a previous node.' : ''}
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.
${['article-extractor', 'link-preview', 'contact-extractor', 'social-links', 'tech-stack'].includes(p.id) ? '- Web results always carry a `status` (`ok`, `blocked_by_robots`, `blocked_by_site`, `not_found`, `timeout`, ...). Check it with an IF node. The API respects robots.txt and never bypasses logins, paywalls or CAPTCHAs.\n' : ''}${p.id === 'qr-barcode' ? '- Generate QR Code and Generate Barcode return a binary file (`data` by default) to attach, upload or save. Read Codes accepts an image URL or a binary file from a previous node.\n' : ''}${p.id === 'pdf-to-text' ? '- Source `URL` or `Binary File` (for example an email attachment). Up to 15 MB and 200 pages per call. Scanned pages have no text layer: they are listed in `scanned_pages` (no OCR).\n' : ''}
**Measured quality:** ${p.measured} We publish only what we measured.

## Example workflows

${p.examples.map((e) => `- ${e}`).join('\n')}

## Compatibility

Built with the \`n8n-node\` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: ${REPO}
- Privacy: ${p.legal}/privacy
- Terms: ${p.legal}/terms

## Version history

- **${VERSION}**: first release.

## License

[MIT](LICENSE.md)
`;
}

function packageJson(p, pkg) {
	return JSON.stringify(
		{
			name: pkg,
			version: VERSION,
			description: `n8n node for ${p.apiTitle} (CompassLab): ${p.description}.`,
			license: 'MIT',
			homepage: `${REPO}/tree/main/packages/${pkg}#readme`,
			keywords: ['n8n-community-node-package', 'n8n', 'compasslab', ...p.keywords],
			author: AUTHOR,
			repository: { type: 'git', url: `git+${REPO}.git`, directory: `packages/${pkg}` },
			scripts: {
				build: 'n8n-node build',
				'build:watch': 'tsc --watch',
				dev: 'n8n-node dev',
				lint: 'n8n-node lint',
				'lint:fix': 'n8n-node lint --fix',
				release: 'n8n-node release',
				prepublishOnly: 'n8n-node prerelease',
			},
			files: ['dist'],
			publishConfig: { access: 'public' },
			n8n: {
				n8nNodesApiVersion: 1,
				strict: true,
				credentials: [
					`dist/credentials/${p.cls}ApiMarketApi.credentials.js`,
					`dist/credentials/${p.cls}RapidApiApi.credentials.js`,
				],
				nodes: [`dist/nodes/${p.cls}/${p.cls}.node.js`],
			},
			devDependencies: {
				'@n8n/node-cli': '^0.50.4',
				eslint: '9.39.4',
				prettier: '3.8.3',
				'release-it': '20.2.0',
				typescript: '5.9.3',
			},
			peerDependencies: { 'n8n-workflow': '*' },
		},
		null,
		'\t',
	) + '\n';
}

const codex = (p) =>
	JSON.stringify(
		{
			node: `n8n-nodes-compasslab-${p.id}`,
			nodeVersion: '1.0',
			codexVersion: '1.0',
			categories: p.categories,
			resources: {
				credentialDocumentation: [{ url: `${REPO}/tree/main/packages/n8n-nodes-compasslab-${p.id}#credentials` }],
				primaryDocumentation: [{ url: `${REPO}/tree/main/packages/n8n-nodes-compasslab-${p.id}#readme` }],
			},
		},
		null,
		'\t',
	) + '\n';

const config = (p) => `// Generated by generate.mjs: this package's API on each marketplace.
export const API_TITLE = '${p.apiTitle}';
export const API_MARKET_SLUG = '${p.slug}';
export const RAPIDAPI_HOST = '${p.host}';
`;

for (const p of PRODUCTS) {
	const pkg = `n8n-nodes-compasslab-${p.id}`;
	const dir = join(ROOT, 'packages', pkg);
	const nodeDir = join(dir, 'nodes', p.cls);
	rmSync(join(dir, 'nodes'), { recursive: true, force: true });
	rmSync(join(dir, 'credentials'), { recursive: true, force: true });
	write(join(dir, 'package.json'), packageJson(p, pkg));
	write(join(dir, 'README.md'), readme(p, pkg));
	cpSync(join(ROOT, 'LICENSE.md'), join(dir, 'LICENSE.md'));
	cpSync(join(ROOT, 'src', 'tsconfig.json'), join(dir, 'tsconfig.json'));
	cpSync(join(ROOT, 'src', 'eslint.config.mjs'), join(dir, 'eslint.config.mjs'));
	write(join(dir, 'icons', `${p.id}.svg`), icon(p, false));
	write(join(dir, 'icons', `${p.id}.dark.svg`), icon(p, true));
	write(join(dir, 'credentials', `${p.cls}ApiMarketApi.credentials.ts`), credential(p, 'ApiMarket'));
	write(join(dir, 'credentials', `${p.cls}RapidApiApi.credentials.ts`), credential(p, 'RapidApi'));
	write(join(nodeDir, `${p.cls}.node.ts`), node(p));
	write(join(nodeDir, `${p.cls}.node.json`), codex(p));
	write(join(nodeDir, 'operations.ts'), readFileSync(join(ROOT, 'src', 'products', `${p.id}.ts`), 'utf8'));
	write(join(nodeDir, 'shared', 'config.ts'), config(p));
	for (const f of ['transport.ts', 'credentialTest.ts']) {
		write(join(nodeDir, 'shared', f), readFileSync(join(ROOT, 'src', 'shared', f), 'utf8'));
	}
}
console.log(`generated ${PRODUCTS.length} packages${AUTHOR.email ? '' : ' (AUTHOR.email is empty: lint fails until it is set)'}`);
