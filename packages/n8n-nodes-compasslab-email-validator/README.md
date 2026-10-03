# n8n-nodes-compasslab-email-validator

This is an n8n community node for **Email Validator with MX and Disposable Check** by CompassLab: validate email addresses: syntax, MX records, disposable and role addresses, free providers, typo suggestions.

| Operation | What it does |
|---|---|
| **Validate** | One address: syntax, MX records, disposable, role and free-provider flags, typo suggestion |
| **Validate Many** | Up to 10 addresses in one request (counts as one request), one item per address |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-email-validator`.

## Credentials

Email Validator with MX and Disposable Check is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **Email Validator with MX and Disposable Check** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab Email Validator (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **Email Validator with MX and Disposable Check**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab Email Validator (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test makes one small call to the API, which counts as one call on your plan.

## Usage

- Each input item makes one request. The "Many" operations send a list in one request (it counts as one request on your plan) and return one item per entry; enter one entry per line or comma-separated, or map a field from a previous node.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.

**Measured quality:** 20 of 20 verdicts correct on our labelled real-world set, about 70 ms per address. We publish only what we measured.

## Example workflows

- **Clean a signup list.** Google Sheets (read rows) > CompassLab Email Validator: Validate > IF `status` is `valid` > Google Sheets (update row).
- **Catch typos in forms.** Form trigger > CompassLab Email Validator: Validate > IF `suggestion` is not empty > ask the user to confirm the corrected address.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab
- Privacy: https://email-validator-8cgg.onrender.com/privacy
- Terms: https://email-validator-8cgg.onrender.com/terms

## Version history

- **0.1.3**: the credential test is a request in the credential (n8n's standard).
- **0.1.2**: each package now has its own repository.
- **0.1.1**: node category renamed to n8n's current list.
- **0.1.0**: first release.

## License

[MIT](LICENSE.md)
