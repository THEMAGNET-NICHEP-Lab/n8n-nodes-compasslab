# n8n-nodes-compasslab-article-extractor

This is an n8n community node for **Article Extractor to Clean Text and Markdown** by CompassLab: turn any web page or PDF link into clean Markdown and text, with title, author, date and language.

| Operation | What it does |
|---|---|
| **Extract** | Main content of one page as Markdown and/or text, with title, author, date, language and an honest status |
| **Extract Many** | Up to 3 pages in one request (counts as one request), one item per page |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-article-extractor`.

## Credentials

Article Extractor to Clean Text and Markdown is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **Article Extractor to Clean Text and Markdown** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab Article Extractor (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **Article Extractor to Clean Text and Markdown**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab Article Extractor (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test checks your key without using any of your quota.

## Usage

- Each input item makes one request. The "Many" operations send a list in one request (it counts as one request on your plan) and return one item per entry; enter one entry per line or comma-separated, or map a field from a previous node.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.
- Web results always carry a `status` (`ok`, `blocked_by_robots`, `blocked_by_site`, `not_found`, `timeout`, ...). Check it with an IF node. The API respects robots.txt and never bypasses logins, paywalls or CAPTCHAs.

**Measured quality:** Median answer about 0.6 s per page on our server. We publish only what we measured.

## Example workflows

- **RSS to AI summary.** RSS trigger > CompassLab Article Extractor: Extract (output Markdown, max 20,000 characters) > AI summarisation > Slack.
- **Research agent.** AI Agent with CompassLab Article Extractor as a tool: it reads any link you give it.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab
- Privacy: https://web-tools-hbvr.onrender.com/privacy
- Terms: https://web-tools-hbvr.onrender.com/terms

## Version history

- **0.1.2**: each package now has its own repository.
- **0.1.1**: node category renamed to n8n's current list.
- **0.1.0**: first release.

## License

[MIT](LICENSE.md)
