import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabArticleExtractorApiMarketApi implements ICredentialType {
	name = 'compassLabArticleExtractorApiMarketApi';

	displayName = 'CompassLab Article Extractor (api.market) API';

	icon: Icon = {
		light: 'file:../icons/article-extractor.svg',
		dark: 'file:../icons/article-extractor.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab/tree/main/packages/n8n-nodes-compasslab-article-extractor#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to Article Extractor to Clean Text and Markdown on api.market first; it has a free plan.',
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
