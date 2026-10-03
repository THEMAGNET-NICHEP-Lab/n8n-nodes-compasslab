import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabHolidaysRapidApiApi implements ICredentialType {
	name = 'compassLabHolidaysRapidApiApi';

	displayName = 'CompassLab Holidays (RapidAPI) API';

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
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to Public Holidays and Business Days on RapidAPI first; it has a free plan.',
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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://public-holidays-and-business-days.p.rapidapi.com',
			method: 'GET',
			url: '/v1/holidays/countries',
		},
	};
}
