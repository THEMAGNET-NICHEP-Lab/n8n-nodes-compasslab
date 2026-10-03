# n8n-nodes-compasslab-link-preview

This is an n8n community node for **Link Preview and URL Metadata** by CompassLab: link previews for any URL: title, description, image, favicon, site name and canonical URL, within 5 seconds.

| Operation | What it does |
|---|---|
| **Get Link Preview** | Title, description, image, favicon, site name, canonical URL, language and type of any URL |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-link-preview`.

## Credentials

Link Preview and URL Metadata is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **Link Preview and URL Metadata** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab Link Preview (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **Link Preview and URL Metadata**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab Link Preview (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test makes one small call to the API, which counts as one call on your plan.

## Usage

- Each input item makes one request.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.
- Web results always carry a `status` (`ok`, `blocked_by_robots`, `blocked_by_site`, `not_found`, `timeout`, ...). Check it with an IF node. The API respects robots.txt and never bypasses logins, paywalls or CAPTCHAs.

**Measured quality:** Median answer about 0.2 s; gives up after 5 s so your workflow never hangs. We publish only what we measured.

## Example workflows

- **Rich links in chat.** Slack or Discord trigger (message with a link) > CompassLab Link Preview > post a card with `title`, `description` and `image`.
- **Bookmark manager.** Webhook (saved link) > CompassLab Link Preview > Notion or Airtable row.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab
- Privacy: https://web-tools-hbvr.onrender.com/privacy
- Terms: https://web-tools-hbvr.onrender.com/terms

## Version history

- **0.1.3**: the credential test is a request in the credential (n8n's standard).
- **0.1.2**: each package now has its own repository.
- **0.1.1**: node category renamed to n8n's current list.
- **0.1.0**: first release.

## License

[MIT](LICENSE.md)
