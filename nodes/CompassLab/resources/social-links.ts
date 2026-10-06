import type { INodeProperties } from 'n8n-workflow';
import { baseURL, listExpression } from '../shared/transport';

export const operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Find Social Links',
				value: 'findSocialLinks',
				action: 'Find the social profiles of a company',
				description:
					"Find a company's official LinkedIn, X, Instagram, YouTube, TikTok, GitHub and more",
				routing: { request: { method: 'GET', baseURL, url: '/v1/social-links' } },
			},
			{
				name: 'Find Social Links for Many',
				value: 'findSocialLinksMany',
				action: 'Find the social profiles of up to 5 companies',
				description: 'Up to 5 domains in one request (counts as one request); one item per domain',
				routing: {
					request: { method: 'POST', baseURL, url: '/v1/social-links/batch' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'results' } }] },
				},
			},
		],
		default: 'findSocialLinks',
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'example.com',
		description: 'Company domain or website URL',
		displayOptions: { show: { operation: ['findSocialLinks'] } },
		routing: { send: { type: 'query', property: 'domain' } },
	},
	{
		displayName: 'Domains',
		name: 'domains',
		type: 'string',
		typeOptions: { rows: 3 },
		default: '',
		required: true,
		description: 'Up to 5 domains or website URLs, one per line or comma-separated',
		displayOptions: { show: { operation: ['findSocialLinksMany'] } },
		routing: {
			send: { type: 'body', property: 'domains', value: listExpression('domains', '[\\s,;]+') },
		},
	},
	{
		displayName: 'Include Handles',
		name: 'include_handles',
		type: 'boolean',
		default: true,
		description: "Whether to also return each account's handle",
		displayOptions: { show: { operation: ['findSocialLinks'] } },
		routing: { send: { type: 'query', property: 'include_handles' } },
	},
	{
		displayName: 'Include Handles',
		name: 'include_handles_batch',
		type: 'boolean',
		default: true,
		description: "Whether to also return each account's handle",
		displayOptions: { show: { operation: ['findSocialLinksMany'] } },
		routing: { send: { type: 'body', property: 'include_handles' } },
	},
];
