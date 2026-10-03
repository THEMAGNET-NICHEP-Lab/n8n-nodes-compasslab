import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CompassLabSocialLinksRapidApiApi implements ICredentialType {
	name = 'compassLabSocialLinksRapidApiApi';

	displayName = 'CompassLab Social Links (RapidAPI) API';

	icon: Icon = {
		light: 'file:../icons/social-links.svg',
		dark: 'file:../icons/social-links.dark.svg',
	};

	documentationUrl =
		'https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-social-links#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your RapidAPI key (X-RapidAPI-Key). Subscribe to Social Links Finder for Company Profiles on RapidAPI first; it has a free plan.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-rapidapi-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://social-links-finder-for-company-profiles.p.rapidapi.com',
			method: 'GET',
			url: '/v1/social-links',
			qs: { domain: 'example.com' },
		},
	};
}
