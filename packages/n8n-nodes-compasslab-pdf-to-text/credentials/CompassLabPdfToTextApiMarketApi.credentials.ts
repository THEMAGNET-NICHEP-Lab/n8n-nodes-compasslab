import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabPdfToTextApiMarketApi implements ICredentialType {
	name = 'compassLabPdfToTextApiMarketApi';

	displayName = 'CompassLab PDF to Text (api.market) API';

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
				'Your api.market key (x-api-market-key). Subscribe to PDF to Text and Markdown on api.market first; it has a free plan.',
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
			baseURL: 'https://prod.api.market/api/v1/compasslab-1/pdf-to-text',
			method: 'POST',
			url: '/v1/pdf/text',
			body: {
				file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
				pages: '1',
			},
		},
	};
}
