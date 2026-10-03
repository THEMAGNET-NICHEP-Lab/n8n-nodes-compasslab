import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { apiMarketTest, rapidApiTest } from './shared/credentialTest';
import { withErrorHandling } from './shared/transport';

export class CompassLabContactExtractor implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab Contact Extractor',
		name: 'compassLabContactExtractor',
		icon: {
			light: 'file:../../icons/contact-extractor.svg',
			dark: 'file:../../icons/contact-extractor.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			"Find a company's published business emails, phones, social profiles, address and VAT ID from its domain",
		defaults: {
			name: 'CompassLab Contact Extractor',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabContactExtractorApiMarketApi',
				required: true,
				testedBy: 'apiMarketTest',
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabContactExtractorRapidApiApi',
				required: true,
				testedBy: 'rapidApiTest',
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab-contact-extractor/0.1.2',
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
				description: 'Where you subscribed to Website Contact Extractor for Emails and Phones',
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
