# n8n-nodes-compasslab-phone-validator

This is an n8n community node for **Phone Number Validator and Formatter** by CompassLab: validate and format phone numbers from any country: E.164, national format, type, country, region, time zone.

| Operation | What it does |
|---|---|
| **Validate** | One number: valid or not (and why), E.164, international and national format, type, country, region, time zones |
| **Validate Many** | Up to 50 numbers in one request (counts as one request), one item per number |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-phone-validator`.

## Credentials

Phone Number Validator and Formatter is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **Phone Number Validator and Formatter** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab Phone Validator (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **Phone Number Validator and Formatter**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab Phone Validator (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test checks your key without using any of your quota.

## Usage

- Each input item makes one request. The "Many" operations send a list in one request (it counts as one request on your plan) and return one item per entry; enter one entry per line or comma-separated, or map a field from a previous node.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.

**Measured quality:** 25 of 25 real business numbers from 10 countries match Google's official libphonenumber demo, about 70 ms per number. We publish only what we measured.

## Example workflows

- **Normalise CRM phone numbers.** CRM (get contacts) > CompassLab Phone Validator: Validate (default country `GB`) > CRM update with `e164`.
- **SMS only to mobiles.** Google Sheets > CompassLab Phone Validator: Validate > IF `type` is `mobile` > your SMS node.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab
- Privacy: https://email-validator-8cgg.onrender.com/privacy
- Terms: https://email-validator-8cgg.onrender.com/terms

## Version history

- **0.1.1**: node category renamed to n8n's current list.
- **0.1.0**: first release.

## License

[MIT](LICENSE.md)
