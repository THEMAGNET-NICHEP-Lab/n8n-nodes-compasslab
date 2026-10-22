import type { INodeProperties } from 'n8n-workflow';
import {baseURL, ifSet, listExpression } from '../shared/transport';


// Optional settings; when not added, nothing is sent and the API's own defaults apply (the same values)
const options = (send: 'query' | 'body'): INodeProperties[] => [
	{
		displayName: 'Default Country',
		name: 'country',
		type: 'string',
		default: '',
		placeholder: 'GB',
		description:
			'Two-letter country code used for numbers written without +country code (national format)',
		routing: { send: { type: send, property: 'country', value: ifSet } },
	},
];

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
				action: 'Validate and format a phone number',
				description:
					'Validate one number and get E.164, national format, type, country, region and time zone',
				routing: { request: { method: 'GET', baseURL, url: '/v1/phone/validate' } },
			},
			{
				name: 'Validate Many',
				value: 'validateMany',
				action: 'Validate up to 50 phone numbers',
				description:
					'Validate up to 50 numbers in one request (counts as one request); one item per number',
				routing: {
					request: { method: 'POST', baseURL, url: '/v1/phone/batch' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'results' } }] },
				},
			},
		],
		default: 'validate',
	},
	{
		displayName: 'Phone Number',
		name: 'number',
		type: 'string',
		default: '',
		required: true,
		placeholder: '+44 20 7946 0958',
		description: 'Any format: +33 1 23 45 67 89, 0033..., (212) 555-0123, 1-800-FLOWERS',
		displayOptions: { show: { operation: ['validate'] } },
		routing: { send: { type: 'query', property: 'number' } },
	},
	{
		displayName: 'Phone Numbers',
		name: 'numbers',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		required: true,
		description: 'Up to 50 numbers, one per line (or separated by ; or ,)',
		displayOptions: { show: { operation: ['validateMany'] } },
		routing: { send: { type: 'body', property: 'numbers', value: listExpression('numbers') } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { operation: ['validate'] } },
		options: options('query'),
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { operation: ['validateMany'] } },
		options: options('body'),
	},
];
