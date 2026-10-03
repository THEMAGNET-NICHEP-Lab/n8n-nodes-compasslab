import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabQrBarcodeRapidApiApi implements ICredentialType {
	name = 'compassLabQrBarcodeRapidApiApi';

	displayName = 'CompassLab QR and Barcode (RapidAPI) API';

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
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to QR Code and Barcode Generator and Reader on RapidAPI first; it has a free plan.',
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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://qr-code-and-barcode-generator-and-reader.p.rapidapi.com',
			method: 'GET',
			url: '/v1/qr',
			qs: { data: 'test', format: 'svg' },
		},
	};
}
