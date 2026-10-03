import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabPdfToTextApiMarketApi implements ICredentialType {
	name = 'compassLabPdfToTextApiMarketApi';

	displayName = 'CompassLab PDF to Text (api.market) API';

	icon: Icon = {
		light: 'file:../icons/pdf-to-text.svg',
		dark: 'file:../icons/pdf-to-text.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab/tree/main/packages/n8n-nodes-compasslab-pdf-to-text#credentials';

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
}
