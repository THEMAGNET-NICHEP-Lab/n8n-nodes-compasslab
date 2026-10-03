import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { apiMarketTest, rapidApiTest } from './shared/credentialTest';
import { withErrorHandling } from './shared/transport';

export class CompassLabSocialLinks implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab Social Links',
		name: 'compassLabSocialLinks',
		icon: {
			light: 'file:../../icons/social-links.svg',
			dark: 'file:../../icons/social-links.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			"Find a company's official LinkedIn, X, Instagram, YouTube, TikTok, GitHub and more from its domain",
		defaults: {
			name: 'CompassLab Social Links',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabSocialLinksApiMarketApi',
				required: true,
				testedBy: 'apiMarketTest',
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabSocialLinksRapidApiApi',
				required: true,
				testedBy: 'rapidApiTest',
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
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
				description: 'Where you subscribed to Social Links Finder for Company Profiles',
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
