import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabEmailValidatorApiMarketApi implements ICredentialType {
	name = 'compassLabEmailValidatorApiMarketApi';

	displayName = 'CompassLab Email Validator (api.market) API';

	icon: Icon = {
		light: 'file:../icons/email-validator.svg',
		dark: 'file:../icons/email-validator.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-email-validator#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to Email Validator with MX and Disposable Check on api.market first; it has a free plan.',
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
			baseURL: 'https://prod.api.market/api/v1/compasslab-1/email-validator',
			method: 'GET',
			url: '/v1/email/validate',
			qs: { email: 'test@example.com', check_dns: false },
		},
	};
}
