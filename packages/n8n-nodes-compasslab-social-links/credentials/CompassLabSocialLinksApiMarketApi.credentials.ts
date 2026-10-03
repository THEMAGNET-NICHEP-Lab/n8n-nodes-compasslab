import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabSocialLinksApiMarketApi implements ICredentialType {
	name = 'compassLabSocialLinksApiMarketApi';

	displayName = 'CompassLab Social Links (api.market) API';

	icon: Icon = {
		light: 'file:../icons/social-links.svg',
		dark: 'file:../icons/social-links.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-social-links#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to Social Links Finder for Company Profiles on api.market first; it has a free plan.',
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
			baseURL: 'https://prod.api.market/api/v1/compasslab-1/social-links-finder',
			method: 'GET',
			url: '/v1/social-links',
			qs: { domain: 'example.com' },
		},
	};
}
