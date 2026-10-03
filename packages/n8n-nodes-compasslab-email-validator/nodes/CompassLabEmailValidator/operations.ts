import type { INodeProperties } from 'n8n-workflow';
import { baseURL, listExpression } from './shared/transport';

export const operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Validate',
				value: 'validate',
				action: 'Validate an email address',
				description:
					'Check syntax, MX records, disposable, role and free-provider flags, and typos',
				routing: { request: { method: 'GET', baseURL, url: '/v1/email/validate' } },
			},
			{
				name: 'Validate Many',
				value: 'validateMany',
				action: 'Validate up to 10 email addresses',
				description:
					'Validate up to 10 addresses in one request (counts as one request); one item per address',
				routing: {
					request: { method: 'POST', baseURL, url: '/v1/email/validate/batch' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'results' } }] },
				},
			},
		],
		default: 'validate',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		displayOptions: { show: { operation: ['validate'] } },
		routing: { send: { type: 'query', property: 'email' } },
	},
	{
		displayName: 'Emails',
		name: 'emails',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		required: true,
		description: 'Up to 10 addresses, one per line or comma-separated',
		displayOptions: { show: { operation: ['validateMany'] } },
		routing: { send: { type: 'body', property: 'emails', value: listExpression('emails') } },
	},
	{
		displayName: 'Check DNS',
		name: 'check_dns',
		type: 'boolean',
		default: true,
		description:
			'Whether to look up MX records. Turn off for syntax and list checks only (faster).',
		displayOptions: { show: { operation: ['validate'] } },
		routing: { send: { type: 'query', property: 'check_dns' } },
	},
	{
		displayName: 'Check DNS',
		name: 'check_dns_batch',
		type: 'boolean',
		default: true,
		description: 'Whether to look up MX records for each domain',
		displayOptions: { show: { operation: ['validateMany'] } },
		routing: { send: { type: 'body', property: 'check_dns' } },
	},
];
