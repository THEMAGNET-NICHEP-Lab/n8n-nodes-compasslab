import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabArticleExtractorRapidApiApi implements ICredentialType {
	name = 'compassLabArticleExtractorRapidApiApi';

	displayName = 'CompassLab Article Extractor (RapidAPI) API';

	icon: Icon = {
		light: 'file:../icons/article-extractor.svg',
		dark: 'file:../icons/article-extractor.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-article-extractor#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to Article Extractor to Clean Text and Markdown on RapidAPI first; it has a free plan.',
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
