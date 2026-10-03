import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabPhoneValidatorApiMarketApi implements ICredentialType {
	name = 'compassLabPhoneValidatorApiMarketApi';

	displayName = 'CompassLab Phone Validator (api.market) API';

	icon: Icon = {
		light: 'file:../icons/phone-validator.svg',
		dark: 'file:../icons/phone-validator.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-phone-validator#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to Phone Number Validator and Formatter on api.market first; it has a free plan.',
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
			baseURL: 'https://prod.api.market/api/v1/compasslab-1/phone-validator',
			method: 'GET',
			url: '/v1/phone/validate',
			qs: { number: '+442079460958' },
		},
	};
}
