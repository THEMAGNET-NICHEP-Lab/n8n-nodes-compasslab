# n8n-nodes-compasslab

This is an n8n community node for the **CompassLab APIs**: one node, ten small and reliable APIs for everyday automation, each a resource of the node.

| Resource | API | Operations |
|---|---|---|
| **Article** | Article Extractor to Clean Text and Markdown | Extract, Extract Many |
| **Company Contact** | Website Contact Extractor for Emails and Phones | Find Contacts |
| **Email** | Email Validator with MX and Disposable Check | Validate, Validate Many |
| **Holiday and Business Day** | Public Holidays and Business Days | Get Holidays, Get Countries, Is Business Day, Add Business Days, Count Business Days |
| **Link Preview** | Link Preview and URL Metadata | Get Link Preview |
| **PDF** | PDF to Text and Markdown | Extract Text |
| **Phone Number** | Phone Number Validator and Formatter | Validate, Validate Many |
| **QR Code and Barcode** | QR Code and Barcode Generator and Reader | Generate QR Code, Generate Barcode, Read Codes |
| **Social Link** | Social Links Finder for Company Profiles | Find Social Links, Find Social Links for Many |
| **Tech Stack** | Website Technology Stack Detector | Detect Tech Stack |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Operations](#operations) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab`.

## Credentials

The APIs are sold on two marketplaces. Pick one; the node works with both, and every API has a **free plan**. One key works for every CompassLab API you subscribe to.

**api.market**
1. Sign up at [api.market](https://api.market) and open the CompassLab APIs you need (search for "CompassLab").
2. Subscribe to each one you will use (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for the CompassLab API you need, for example "Email Validator with MX and Disposable Check".
2. Subscribe to its free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab (RapidAPI) API** credential and paste the key.

In the credential, **API for the Connection Test** picks which API the test calls: choose one you subscribed to. The test makes one small call, which counts as one call on your plan. In the node, choose the same **Marketplace** as your credential.

## Usage

- Each input item makes one request. The "Many" operations send a list in one request (it counts as one request on your plan) and return one item per entry; enter one entry per line or comma-separated, or map a field from a previous node.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.
- Web resources (Article, Link Preview, Company Contact, Social Link, Tech Stack) always return a `status` (`ok`, `blocked_by_robots`, `blocked_by_site`, `not_found`, `timeout`, ...). Check it with an IF node. The APIs respect robots.txt and never bypass logins, paywalls or CAPTCHAs.
- Files: Generate QR Code and Generate Barcode return a binary file (`data` by default). Read Codes and PDF Extract Text accept a URL or a binary file from a previous node (for example an email attachment).

## Example workflows

- **RSS to AI summary.** RSS trigger > CompassLab (Article): Extract (output Markdown, max 20,000 characters) > AI summarisation > Slack.
- **Research agent.** AI Agent with CompassLab (Article) as a tool: it reads any link you give it.
- **Enrich new leads.** CRM trigger (new company) > CompassLab (Company Contact): Find Contacts (company domain) > CRM update.
- **Supplier onboarding.** Form trigger > CompassLab (Company Contact) > compare the published address and VAT ID with what the supplier entered.
- **Clean a signup list.** Google Sheets (read rows) > CompassLab (Email): Validate > IF `status` is `valid` > Google Sheets (update row).
- **Catch typos in forms.** Form trigger > CompassLab (Email): Validate > IF `suggestion` is not empty > ask the user to confirm the corrected address.
- **Due dates that skip holidays.** Webhook (order received) > CompassLab (Holiday and Business Day): Add Business Days (country `DE`, 10 days) > your invoicing tool.
- **No reminders on days off.** Schedule trigger > CompassLab (Holiday and Business Day): Is Business Day (today, your country) > IF `is_business_day` > send the reminders.
- **Rich links in chat.** Slack or Discord trigger (message with a link) > CompassLab (Link Preview) > post a card with `title`, `description` and `image`.
- **Bookmark manager.** Webhook (saved link) > CompassLab (Link Preview) > Notion or Airtable row.
- **PDF attachments to text.** Gmail trigger (with attachments) > CompassLab (PDF) (Source `Binary File`, field `attachment_0`) > AI Agent or a database.
- **Documents for RAG.** Google Drive (download PDF) > CompassLab (PDF) (format Markdown) > vector store.
- **Normalise CRM phone numbers.** CRM (get contacts) > CompassLab (Phone Number): Validate (default country `GB`) > CRM update with `e164`.
- **SMS only to mobiles.** Google Sheets > CompassLab (Phone Number): Validate > IF `type` is `mobile` > your SMS node.
- **Tickets with QR codes.** Webhook (new booking) > CompassLab (QR Code and Barcode): Generate QR Code (booking URL) > Gmail with the `data` file attached.
- **Scan product photos.** Google Drive trigger (new photo) > CompassLab (QR Code and Barcode): Read Codes (Source `Binary File`) > look up the GTIN.
- **CRM enrichment.** CRM (get companies) > CompassLab (Social Link): Find Social Links > CRM update with the LinkedIn and X URLs.
- **Partner directory.** Google Sheets (vendor domains) > CompassLab (Social Link): Find Social Links for Many > Airtable.
- **Find Shopify stores.** Google Sheets (prospect domains) > CompassLab (Tech Stack) > IF technologies contain `Shopify` > CRM.
- **Agency audit.** Form trigger (client URL) > CompassLab (Tech Stack) > AI Agent writes the audit > email.

Ready-to-import templates: [templates/](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab/tree/main/templates).

## Operations

### Article (Article Extractor to Clean Text and Markdown)

- **Extract**: Main content of one page as Markdown and/or text, with title, author, date, language and an honest status
- **Extract Many**: Up to 3 pages in one request (counts as one request), one item per page

Measured: Median answer about 0.6 s per page on our server.

### Company Contact (Website Contact Extractor for Emails and Phones)

- **Find Contacts**: Business emails, phones (E.164), social profiles, company name, address and VAT ID, each with its source page and a confidence score

Measured: On 40 real company domains, 30 returned at least one email or phone (the others publish none or block bots); median 2.7 s.

### Email (Email Validator with MX and Disposable Check)

- **Validate**: One address: syntax, MX records, disposable, role and free-provider flags, typo suggestion
- **Validate Many**: Up to 10 addresses in one request (counts as one request), one item per address

Measured: 20 of 20 verdicts correct on our labelled real-world set, about 70 ms per address.

### Holiday and Business Day (Public Holidays and Business Days)

- **Get Holidays**: Public holidays of a country (and region) for one year, one item per holiday
- **Get Countries**: Supported countries with their regions, languages, holiday types and weekend
- **Is Business Day**: Whether a date is a business day and, if not, why (weekend, holiday, your closing day)
- **Add Business Days**: Add or subtract business days: due dates, delivery and payment terms
- **Count Business Days**: Business days between two dates, with the holidays in the range

Measured: Checked against official 2026 government holiday lists for 10 regions: 9 of 10 match every weekday day off.

### Link Preview (Link Preview and URL Metadata)

- **Get Link Preview**: Title, description, image, favicon, site name, canonical URL, language and type of any URL

Measured: Median answer about 0.2 s; gives up after 5 s so your workflow never hangs.

### PDF (PDF to Text and Markdown)

- **Extract Text**: Text of a PDF from a URL or a binary file, as plain text, Markdown or one entry per page, with page count, metadata, language and scanned pages

Measured: 20 of 20 real PDFs handled correctly (papers, standards, tax forms, law texts, a scan and a password-protected file).

### Phone Number (Phone Number Validator and Formatter)

- **Validate**: One number: valid or not (and why), E.164, international and national format, type, country, region, time zones
- **Validate Many**: Up to 50 numbers in one request (counts as one request), one item per number

Measured: 25 of 25 real business numbers from 10 countries match Google's official libphonenumber demo, about 70 ms per number.

### QR Code and Barcode (QR Code and Barcode Generator and Reader)

- **Generate QR Code**: A QR code as a PNG or SVG file, with colours, error correction and size
- **Generate Barcode**: An EAN-13, UPC-A, Code 128 or Code 39 barcode as a PNG or SVG file (check digit computed or verified)
- **Read Codes**: Every QR code and barcode in an image (URL or file), with format, value and position

Measured: 50 of 50 generated codes read back exactly and 10 of 10 photo-like images read; reading takes about 70 ms.

### Social Link (Social Links Finder for Company Profiles)

- **Find Social Links**: A company's official profiles on 14 networks, with handles, company name and logo
- **Find Social Links for Many**: Up to 5 domains in one request (counts as one request), one item per domain

Measured: On 20 real company domains, 17 returned 2 or more official profiles; every profile checked by hand belonged to the company. Median 1.8 s.

### Tech Stack (Website Technology Stack Detector)

- **Detect Tech Stack**: Technologies of a website with category, version when exposed, confidence and the evidence that matched

Measured: Main platform detected on 19 of 20 sites with publicly known stacks; 7.7 technologies found per site on average.

We publish only what we measured.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Privacy: https://web-tools-hbvr.onrender.com/privacy
- Terms: https://web-tools-hbvr.onrender.com/terms

## Version history

- **0.2.1**: republished for the n8n Creator Portal checks (no code change).
- **0.2.0**: one node with the ten APIs as resources and one credential per marketplace (replaces the ten `n8n-nodes-compasslab-<api>` packages).

## License

[MIT](LICENSE.md)
