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
				name: 'Get Link Preview',
				value: 'getLinkPreview',
				action: 'Get a link preview',
				description:
					'Get the title, description, image, favicon, site name and canonical URL of any URL',
				routing: { request: { method: 'GET', baseURL, url: '/v1/preview' } },
			},
		],
		default: 'getLinkPreview',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'https://example.com/blog/post',
		description: 'Any public page URL. The API answers or gives up within 5 seconds.',
		routing: { send: { type: 'query', property: 'url' } },
	},
];
