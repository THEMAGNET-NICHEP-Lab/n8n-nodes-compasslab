# n8n-nodes-compasslab-social-links

This is an n8n community node for **Social Links Finder for Company Profiles** by CompassLab: find a company's official LinkedIn, X, Instagram, YouTube, TikTok, GitHub and more from its domain.

| Operation | What it does |
|---|---|
| **Find Social Links** | A company's official profiles on 14 networks, with handles, company name and logo |
| **Find Social Links for Many** | Up to 5 domains in one request (counts as one request), one item per domain |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-social-links`.

## Credentials

Social Links Finder for Company Profiles is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **Social Links Finder for Company Profiles** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab Social Links (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **Social Links Finder for Company Profiles**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab Social Links (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test checks your key without using any of your quota.

## Usage

- Each input item makes one request. The "Many" operations send a list in one request (it counts as one request on your plan) and return one item per entry; enter one entry per line or comma-separated, or map a field from a previous node.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.
- Web results always carry a `status` (`ok`, `blocked_by_robots`, `blocked_by_site`, `not_found`, `timeout`, ...). Check it with an IF node. The API respects robots.txt and never bypasses logins, paywalls or CAPTCHAs.

**Measured quality:** On 20 real company domains, 17 returned 2 or more official profiles; every profile checked by hand belonged to the company. Median 1.8 s. We publish only what we measured.

## Example workflows

- **CRM enrichment.** CRM (get companies) > CompassLab Social Links: Find Social Links > CRM update with the LinkedIn and X URLs.
- **Partner directory.** Google Sheets (vendor domains) > CompassLab Social Links: Find Social Links for Many > Airtable.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab
- Privacy: https://web-tools-hbvr.onrender.com/privacy
- Terms: https://web-tools-hbvr.onrender.com/terms

## Version history

- **0.1.0**: first release.

## License

[MIT](LICENSE.md)
