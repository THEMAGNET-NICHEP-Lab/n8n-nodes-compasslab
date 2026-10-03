import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { withErrorHandling } from './shared/transport';

export class CompassLabPdfToText implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab PDF to Text',
		name: 'compassLabPdfToText',
		icon: {
			light: 'file:../../icons/pdf-to-text.svg',
			dark: 'file:../../icons/pdf-to-text.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Extract the text of a PDF (URL or file) as plain text, Markdown or page by page, with metadata and scanned-page flags',
		defaults: {
			name: 'CompassLab PDF to Text',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabPdfToTextApiMarketApi',
				required: true,
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabPdfToTextRapidApiApi',
				required: true,
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-pdf-to-text/0.1.3',
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
				description: 'Where you subscribed to PDF to Text and Markdown',
			},
			...withErrorHandling(operations),
		],
	};
}
