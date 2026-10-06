import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations as holiday } from './resources/holidays';
import { operations as email } from './resources/email-validator';
import { operations as phone } from './resources/phone-validator';
import { operations as article } from './resources/article-extractor';
import { operations as linkPreview } from './resources/link-preview';
import { operations as contact } from './resources/contact-extractor';
import { operations as socialLinks } from './resources/social-links';
import { operations as techStack } from './resources/tech-stack';
import { operations as code } from './resources/qr-barcode';
import { operations as pdf } from './resources/pdf-to-text';
import { forResource, withErrorHandling } from './shared/transport';

export class CompassLab implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CompassLab',
		name: 'compassLab',
		icon: {
			light: 'file:../../icons/compasslab.svg',
			dark: 'file:../../icons/compasslab.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Validate emails and phone numbers, get holidays and business days, extract articles and PDFs, preview links, find company contacts, social links and tech stacks, and generate or read QR codes and barcodes',
		defaults: {
			name: 'CompassLab',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'compassLabApiMarketApi',
				required: true,
				displayOptions: { show: { authentication: ['apiMarket'] } },
			},
			{
				name: 'compassLabRapidApi',
				required: true,
				displayOptions: { show: { authentication: ['rapidApi'] } },
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				// Lets us count the calls that come from n8n; no user data
				'X-CompassLab-Client': 'n8n-nodes-compasslab/0.2.1',
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
				description: 'Where you subscribed to the CompassLab APIs',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Article', value: 'article' },
					{ name: 'Company Contact', value: 'contact' },
					{ name: 'Email', value: 'email' },
					{ name: 'Holiday and Business Day', value: 'holiday' },
					{ name: 'Link Preview', value: 'linkPreview' },
					{ name: 'PDF', value: 'pdf' },
					{ name: 'Phone Number', value: 'phone' },
					{ name: 'QR Code and Barcode', value: 'code' },
					{ name: 'Social Link', value: 'socialLinks' },
					{ name: 'Tech Stack', value: 'techStack' },
				],
				default: 'email',
			},
			...forResource('holiday', withErrorHandling(holiday)),
			...forResource('email', withErrorHandling(email)),
			...forResource('phone', withErrorHandling(phone)),
			...forResource('article', withErrorHandling(article)),
			...forResource('linkPreview', withErrorHandling(linkPreview)),
			...forResource('contact', withErrorHandling(contact)),
			...forResource('socialLinks', withErrorHandling(socialLinks)),
			...forResource('techStack', withErrorHandling(techStack)),
			...forResource('code', withErrorHandling(code)),
			...forResource('pdf', withErrorHandling(pdf)),
		],
	};
}
