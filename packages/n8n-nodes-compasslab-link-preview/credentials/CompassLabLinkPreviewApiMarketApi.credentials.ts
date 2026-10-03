import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabLinkPreviewApiMarketApi implements ICredentialType {
	name = 'compassLabLinkPreviewApiMarketApi';

	displayName = 'CompassLab Link Preview (api.market) API';

	icon: Icon = {
		light: 'file:../icons/link-preview.svg',
		dark: 'file:../icons/link-preview.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-link-preview#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to Link Preview and URL Metadata on api.market first; it has a free plan.',
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
			baseURL: 'https://prod.api.market/api/v1/compasslab-1/link-preview',
			method: 'GET',
			url: '/v1/preview',
			qs: { url: 'https://example.com' },
		},
	};
}
