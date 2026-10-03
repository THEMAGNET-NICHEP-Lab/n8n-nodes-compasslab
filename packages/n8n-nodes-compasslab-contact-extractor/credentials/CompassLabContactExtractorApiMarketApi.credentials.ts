import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabContactExtractorApiMarketApi implements ICredentialType {
	name = 'compassLabContactExtractorApiMarketApi';

	displayName = 'CompassLab Contact Extractor (api.market) API';

	icon: Icon = {
		light: 'file:../icons/contact-extractor.svg',
		dark: 'file:../icons/contact-extractor.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-contact-extractor#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to Website Contact Extractor for Emails and Phones on api.market first; it has a free plan.',
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
			baseURL: 'https://prod.api.market/api/v1/compasslab-1/contact-extractor',
			method: 'GET',
			url: '/v1/contacts',
			qs: { domain: 'example.com', max_pages: 1 },
		},
	};
}
