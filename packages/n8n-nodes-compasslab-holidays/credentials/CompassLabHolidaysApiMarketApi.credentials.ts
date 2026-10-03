import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabHolidaysApiMarketApi implements ICredentialType {
	name = 'compassLabHolidaysApiMarketApi';

	displayName = 'CompassLab Holidays (api.market) API';

	icon: Icon = { light: 'file:../icons/holidays.svg', dark: 'file:../icons/holidays.dark.svg' };

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-holidays#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to Public Holidays and Business Days on api.market first; it has a free plan.',
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
}
