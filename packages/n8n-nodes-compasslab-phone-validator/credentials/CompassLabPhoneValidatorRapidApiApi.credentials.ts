import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabPhoneValidatorRapidApiApi implements ICredentialType {
	name = 'compassLabPhoneValidatorRapidApiApi';

	displayName = 'CompassLab Phone Validator (RapidAPI) API';

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
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to Phone Number Validator and Formatter on RapidAPI first; it has a free plan.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-rapidapi-key': '={{$credentials.apiKey}}',
			},
		},
	};
}
