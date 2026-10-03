import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { withErrorHandling } from './shared/transport';

export class CompassLabEmailValidator implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab Email Validator',
		name: 'compassLabEmailValidator',
		icon: {
			light: 'file:../../icons/email-validator.svg',
			dark: 'file:../../icons/email-validator.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Validate email addresses: syntax, MX records, disposable and role addresses, free providers, typo suggestions',
		defaults: {
			name: 'CompassLab Email Validator',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabEmailValidatorApiMarketApi',
				required: true,
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabEmailValidatorRapidApiApi',
				required: true,
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-email-validator/0.1.3',
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
				description: 'Where you subscribed to Email Validator with MX and Disposable Check',
			},
			...withErrorHandling(operations),
		],
	};
}
