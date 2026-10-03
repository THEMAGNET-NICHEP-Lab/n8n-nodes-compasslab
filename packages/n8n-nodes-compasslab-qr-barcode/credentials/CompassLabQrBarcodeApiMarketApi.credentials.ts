import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CompassLabQrBarcodeApiMarketApi implements ICredentialType {
	name = 'compassLabQrBarcodeApiMarketApi';

	displayName = 'CompassLab QR and Barcode (api.market) API';

	icon: Icon = { light: 'file:../icons/qr-barcode.svg', dark: 'file:../icons/qr-barcode.dark.svg' };

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-qr-barcode#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your api.market key (x-api-market-key). Subscribe to QR Code and Barcode Generator and Reader on api.market first; it has a free plan.',
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
