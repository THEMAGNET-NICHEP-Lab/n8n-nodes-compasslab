import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { withErrorHandling } from './shared/transport';

export class CompassLabQrBarcode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab QR and Barcode',
		name: 'compassLabQrBarcode',
		icon: {
			light: 'file:../../icons/qr-barcode.svg',
			dark: 'file:../../icons/qr-barcode.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Generate QR codes and EAN-13, UPC-A, Code 128, Code 39 barcodes (PNG or SVG), and read them from images',
		defaults: {
			name: 'CompassLab QR and Barcode',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabQrBarcodeApiMarketApi',
				required: true,
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabQrBarcodeRapidApiApi',
				required: true,
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-qr-barcode/0.1.3',
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
				description: 'Where you subscribed to QR Code and Barcode Generator and Reader',
			},
			...withErrorHandling(operations),
		],
	};
}
