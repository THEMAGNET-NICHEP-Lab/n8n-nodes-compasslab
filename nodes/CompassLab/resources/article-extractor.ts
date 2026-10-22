import type { INodeProperties } from 'n8n-workflow';
import {baseURL, listExpression } from '../shared/transport';


const outputField = (send: 'query' | 'body'): INodeProperties => ({
	displayName: 'Output',
	name: 'output',
	type: 'options',
	options: [
		{ name: 'Markdown and Text', value: 'both' },
		{ name: 'Markdown', value: 'markdown' },
		{ name: 'Text', value: 'text' },
	],
	default: 'both',
	description: 'Which content fields to fill',
	routing: { send: { type: send, property: 'output' } },
});

const options = (send: 'query' | 'body'): INodeProperties[] => [
	{
		displayName: 'Include Images',
		name: 'include_images',
		type: 'boolean',
		default: false,
		description: 'Whether to also return the images with their alt text',
		routing: { send: { type: send, property: 'include_images' } },
	},
	{
		displayName: 'Include Links',
		name: 'include_links',
		type: 'boolean',
		default: false,
		description: "Whether to also return the page's links",
		routing: { send: { type: send, property: 'include_links' } },
	},
	{
		displayName: 'Max Characters',
		name: 'max_chars',
		type: 'number',
		default: 20000,
		typeOptions: { minValue: 1, maxValue: 1000000 },
		description: 'Cut the content to this many characters (keeps answers small for AI models)',
		routing: { send: { type: send, property: 'max_chars' } },
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
				name: 'Extract',
				value: 'extract',
				action: 'Extract an article',
				description:
					'Get the main content of a web page or PDF link as Markdown and text, with title, author, date and language',
				routing: { request: { method: 'GET', baseURL, url: '/v1/extract' } },
			},
			{
				name: 'Extract Many',
				value: 'extractMany',
				action: 'Extract up to 3 articles',
				description:
					'Extract up to 3 pages in one request (counts as one request); one item per page',
				routing: {
					request: { method: 'POST', baseURL, url: '/v1/extract/batch' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'results' } }] },
				},
			},
		],
		default: 'extract',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://example.com/blog/post',
		displayOptions: { show: { operation: ['extract'] } },
		routing: { send: { type: 'query', property: 'url' } },
	},
	{
		displayName: 'URLs',
		name: 'urls',
		type: 'string',
		typeOptions: { rows: 3 },
		default: '',
		required: true,
		description: 'Up to 3 URLs, one per line or comma-separated',
		displayOptions: { show: { operation: ['extractMany'] } },
		routing: {
			send: { type: 'body', property: 'urls', value: listExpression('urls', '[\\s,;]+') },
		},
	},
	{ ...outputField('query'), displayOptions: { show: { operation: ['extract'] } } },
	{
		...outputField('body'),
		name: 'outputBatch',
		displayOptions: { show: { operation: ['extractMany'] } },
	},
	{
		displayName: 'Options',
		name: 'articleOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { operation: ['extract'] } },
		options: options('query'),
	},
	{
		displayName: 'Options',
		name: 'articleBatchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { operation: ['extractMany'] } },
		options: options('body'),
	},
];
