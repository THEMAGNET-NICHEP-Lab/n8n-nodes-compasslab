import type { INodeProperties } from 'n8n-workflow';
import {baseURL, fileSourceFields, sendAsMultipart } from './shared/transport';


export const operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
				options: [
			{
				name: 'Extract Text',
				value: 'extractText',
				action: 'Extract text from a PDF',
				description:
					'Get the text of a PDF as plain text, Markdown or page by page, with metadata and scanned-page flags',
				routing: {
					request: { method: 'POST', baseURL, url: '/v1/pdf/text' },
					send: { preSend: [sendAsMultipart] },
				},
			},
		],
		default: 'extractText',
	},
	...fileSourceFields(
		{ operation: ['extractText'] },
		{
			name: 'file_url',
			displayName: 'PDF URL',
			placeholder: 'https://example.com/report.pdf',
			description: 'Public link to the PDF (max 15 MB)',
		},
	),
	{
		displayName: 'Output Format',
		name: 'format',
		type: 'options',
		options: [
			{ name: 'Text', value: 'text', description: 'One plain-text string' },
			{ name: 'Markdown', value: 'markdown', description: 'Headings, paragraphs and lists' },
			{ name: 'Pages', value: 'pages', description: 'One entry per page with its word count' },
		],
		default: 'text',
				routing: { send: { type: 'body', property: 'format' } },
	},
	{
		displayName: 'Options',
		name: 'pdfOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
				options: [
			{
				displayName: 'Pages',
				name: 'pages',
				type: 'string',
				default: '',
				placeholder: '1-5,8',
				description: 'Pages to read, for example 1-5,8 or 10-. Default: all.',
				routing: { send: { type: 'body', property: 'pages' } },
			},
			{
				displayName: 'Max Pages',
				name: 'max_pages',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 1, maxValue: 200 },
				description: 'Read at most this many of the selected pages',
				routing: { send: { type: 'body', property: 'max_pages' } },
			},
		],
	},
];
