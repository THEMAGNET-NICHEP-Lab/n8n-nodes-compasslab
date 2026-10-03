import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabContactExtractorRapidApiApi implements ICredentialType {
	name = 'compassLabContactExtractorRapidApiApi';

	displayName = 'CompassLab Contact Extractor (RapidAPI) API';

	icon: Icon = {
		light: 'file:../icons/contact-extractor.svg',
		dark: 'file:../icons/contact-extractor.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab/tree/main/packages/n8n-nodes-compasslab-contact-extractor#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to Website Contact Extractor for Emails and Phones on RapidAPI first; it has a free plan.',
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
