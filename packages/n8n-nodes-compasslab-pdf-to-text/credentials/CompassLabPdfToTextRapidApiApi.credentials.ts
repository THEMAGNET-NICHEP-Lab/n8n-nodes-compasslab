import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabPdfToTextRapidApiApi implements ICredentialType {
	name = 'compassLabPdfToTextRapidApiApi';

	displayName = 'CompassLab PDF to Text (RapidAPI) API';

	icon: Icon = {
		light: 'file:../icons/pdf-to-text.svg',
		dark: 'file:../icons/pdf-to-text.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-pdf-to-text#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to PDF to Text and Markdown on RapidAPI first; it has a free plan.',
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
