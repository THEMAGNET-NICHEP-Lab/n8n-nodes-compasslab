import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestMethods,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabApiMarketApi implements ICredentialType {
	name = 'compassLabApiMarketApi';

	displayName = 'CompassLab (api.market) API';

	icon: Icon = { light: 'file:../icons/compasslab.svg', dark: 'file:../icons/compasslab.dark.svg' };

	documentationUrl = 'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). One key works for every CompassLab API you subscribe to; each has a free plan.',
		},
		{
			displayName: 'API for the Connection Test',
			name: 'testApi',
			type: 'options',
			options: [
				{ name: 'Article Extractor to Clean Text and Markdown', value: 'article-extractor' },
				{ name: 'Website Contact Extractor for Emails and Phones', value: 'contact-extractor' },
				{ name: 'Email Validator with MX and Disposable Check', value: 'email-validator' },
				{ name: 'Public Holidays and Business Days', value: 'holidays' },
				{ name: 'Link Preview and URL Metadata', value: 'link-preview' },
				{ name: 'PDF to Text and Markdown', value: 'pdf-to-text' },
				{ name: 'Phone Number Validator and Formatter', value: 'phone-validator' },
				{ name: 'QR Code and Barcode Generator and Reader', value: 'qr-barcode' },
				{ name: 'Social Links Finder for Company Profiles', value: 'social-links' },
				{ name: 'Website Technology Stack Detector', value: 'tech-stack' },
			],
			default: 'holidays',
			description:
				'Pick an API you subscribed to. The test makes one small call to it, which counts as one call on your plan.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-market-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ "https://prod.api.market/api/v1/compasslab-1/" + {"holidays":"public-holidays","email-validator":"email-validator","phone-validator":"phone-validator","article-extractor":"article-extractor","link-preview":"link-preview","contact-extractor":"contact-extractor","social-links":"social-links-finder","tech-stack":"tech-stack-detector","qr-barcode":"qr-barcode","pdf-to-text":"pdf-to-text"}[$credentials.testApi] }}',
			url: '={{ {"holidays":"/v1/holidays/countries","email-validator":"/v1/email/validate?email=test%40example.com&check_dns=false","phone-validator":"/v1/phone/validate?number=%2B442079460958","article-extractor":"/v1/extract?url=https%3A%2F%2Fexample.com&output=text&max_chars=100","link-preview":"/v1/preview?url=https%3A%2F%2Fexample.com","contact-extractor":"/v1/contacts?domain=example.com&max_pages=1","social-links":"/v1/social-links?domain=example.com","tech-stack":"/v1/tech-stack?url=https%3A%2F%2Fexample.com&dns=false","qr-barcode":"/v1/qr?data=test&format=svg","pdf-to-text":"/v1/pdf/text"}[$credentials.testApi] }}',
			// n8n resolves expressions in the test request; PDF to Text is the only POST-only API
			method: '={{ $credentials.testApi === "pdf-to-text" ? "POST" : "GET" }}' as IHttpRequestMethods,
			body: { file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', pages: '1' },
		},
	};
}
