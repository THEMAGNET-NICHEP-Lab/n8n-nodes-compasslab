import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { apiMarketTest, rapidApiTest } from './shared/credentialTest';
import { withErrorHandling } from './shared/transport';

export class CompassLabPhoneValidator implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab Phone Validator',
		name: 'compassLabPhoneValidator',
		icon: {
			light: 'file:../../icons/phone-validator.svg',
			dark: 'file:../../icons/phone-validator.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Validate and format phone numbers from any country: E.164, national format, type, country, region, time zone',
		defaults: {
			name: 'CompassLab Phone Validator',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabPhoneValidatorApiMarketApi',
				required: true,
				testedBy: 'apiMarketTest',
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabPhoneValidatorRapidApiApi',
				required: true,
				testedBy: 'rapidApiTest',
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-phone-validator/0.1.1',
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
				description: 'Where you subscribed to Phone Number Validator and Formatter',
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
