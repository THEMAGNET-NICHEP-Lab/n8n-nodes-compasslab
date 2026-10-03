# n8n-nodes-compasslab-holidays

This is an n8n community node for **Public Holidays and Business Days** by CompassLab: public holidays for 250 countries and regions, plus business-day math: is it a working day, add days, count days.

| Operation | What it does |
|---|---|
| **Get Holidays** | Public holidays of a country (and region) for one year, one item per holiday |
| **Get Countries** | Supported countries with their regions, languages, holiday types and weekend |
| **Is Business Day** | Whether a date is a business day and, if not, why (weekend, holiday, your closing day) |
| **Add Business Days** | Add or subtract business days: due dates, delivery and payment terms |
| **Count Business Days** | Business days between two dates, with the holidays in the range |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-holidays`.

## Credentials

Public Holidays and Business Days is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **Public Holidays and Business Days** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab Holidays (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **Public Holidays and Business Days**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab Holidays (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test checks your key without using any of your quota.

## Usage

- Each input item makes one request.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.

**Measured quality:** Checked against official 2026 government holiday lists for 10 regions: 9 of 10 match every weekday day off. We publish only what we measured.

## Example workflows

- **Due dates that skip holidays.** Webhook (order received) > CompassLab Holidays: Add Business Days (country `DE`, 10 days) > your invoicing tool.
- **No reminders on days off.** Schedule trigger > CompassLab Holidays: Is Business Day (today, your country) > IF `is_business_day` > send the reminders.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab
- Privacy: https://eu-business-validator.onrender.com/privacy
- Terms: https://eu-business-validator.onrender.com/terms

## Version history

- **0.1.1**: node category renamed to n8n's current list.
- **0.1.0**: first release.

## License

[MIT](LICENSE.md)
