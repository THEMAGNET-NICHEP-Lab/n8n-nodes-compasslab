import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://pdf-to-text-and-markdown.p.rapidapi.com',
			method: 'POST',
			url: '/v1/pdf/text',
			body: {
				file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
				pages: '1',
			},
		},
	};
}
