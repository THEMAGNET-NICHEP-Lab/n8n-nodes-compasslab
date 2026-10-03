import type { INodeProperties } from 'n8n-workflow';
import { baseURL } from './shared/transport';

export const operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Find Contacts',
				value: 'findContacts',
				action: 'Find the business contacts of a company website',
				description:
					'Get the business emails, phones, social profiles, address and VAT ID a company publishes on its website',
				routing: { request: { method: 'GET', baseURL, url: '/v1/contacts' } },
			},
		],
		default: 'findContacts',
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'example.com',
		description: 'Company domain or website URL',
		routing: { send: { type: 'query', property: 'domain' } },
	},
	{
		displayName: 'Options',
		name: 'contactOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [
			{
				displayName: 'Max Pages',
				name: 'max_pages',
				type: 'number',
				default: 5,
				typeOptions: { minValue: 1, maxValue: 10 },
				description: 'Pages to read, homepage included',
				routing: { send: { type: 'query', property: 'max_pages' } },
			},
			{
				displayName: 'Use Sitemap',
				name: 'include_sitemap',
				type: 'boolean',
				default: false,
				description: 'Whether to also look for contact pages in sitemap.xml',
				routing: { send: { type: 'query', property: 'include_sitemap' } },
			},
		],
	},
];
