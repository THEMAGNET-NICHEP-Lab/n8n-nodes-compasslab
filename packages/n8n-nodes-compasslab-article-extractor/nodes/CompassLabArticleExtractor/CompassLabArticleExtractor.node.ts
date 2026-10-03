import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { apiMarketTest, rapidApiTest } from './shared/credentialTest';
import { withErrorHandling } from './shared/transport';

export class CompassLabArticleExtractor implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab Article Extractor',
		name: 'compassLabArticleExtractor',
		icon: {
			light: 'file:../../icons/article-extractor.svg',
			dark: 'file:../../icons/article-extractor.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Turn any web page or PDF link into clean Markdown and text, with title, author, date and language',
		defaults: {
			name: 'CompassLab Article Extractor',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabArticleExtractorApiMarketApi',
				required: true,
				testedBy: 'apiMarketTest',
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabArticleExtractorRapidApiApi',
				required: true,
				testedBy: 'rapidApiTest',
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-article-extractor/0.1.2',
			},
		},
		properties: [
			{
				displayName: 'Marketplace',
				name: 'authentication',
				type: 'options',
				options: [
					{ name: 'Api.market', value: 'apiMarket' },
					{ name: 'RapidAPI', value: 'rapidApi' },
				],
				default: 'apiMarket',
				description: 'Where you subscribed to Article Extractor to Clean Text and Markdown',
			},
			...withErrorHandling(operations),
		],
	};

	methods = {
		credentialTest: {
			apiMarketTest,
			rapidApiTest,
		},
	};
}
