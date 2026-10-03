import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
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
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabSocialLinksRapidApiApi',
				required: true,
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-social-links/0.1.3',
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
}
