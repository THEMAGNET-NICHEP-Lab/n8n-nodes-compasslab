import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabLinkPreviewRapidApiApi implements ICredentialType {
	name = 'compassLabLinkPreviewRapidApiApi';

	displayName = 'CompassLab Link Preview (RapidAPI) API';

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
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to Link Preview and URL Metadata on RapidAPI first; it has a free plan.',
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
			baseURL: 'https://link-preview-and-url-metadata2.p.rapidapi.com',
			method: 'GET',
			url: '/v1/preview',
			qs: { url: 'https://example.com' },
		},
	};
}
