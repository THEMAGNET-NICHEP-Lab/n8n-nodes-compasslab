import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { withErrorHandling } from './shared/transport';

export class CompassLabLinkPreview implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab Link Preview',
		name: 'compassLabLinkPreview',
		icon: {
			light: 'file:../../icons/link-preview.svg',
			dark: 'file:../../icons/link-preview.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Link previews for any URL: title, description, image, favicon, site name and canonical URL, within 5 seconds',
		defaults: {
			name: 'CompassLab Link Preview',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabLinkPreviewApiMarketApi',
				required: true,
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabLinkPreviewRapidApiApi',
				required: true,
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-link-preview/0.1.3',
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
				description: 'Where you subscribed to Link Preview and URL Metadata',
			},
			...withErrorHandling(operations),
		],
	};
}
