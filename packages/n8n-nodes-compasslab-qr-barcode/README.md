# n8n-nodes-compasslab-qr-barcode

This is an n8n community node for **QR Code and Barcode Generator and Reader** by CompassLab: generate QR codes and EAN-13, UPC-A, Code 128, Code 39 barcodes (PNG or SVG), and read them from images.

| Operation | What it does |
|---|---|
| **Generate QR Code** | A QR code as a PNG or SVG file, with colours, error correction and size |
| **Generate Barcode** | An EAN-13, UPC-A, Code 128 or Code 39 barcode as a PNG or SVG file (check digit computed or verified) |
| **Read Codes** | Every QR code and barcode in an image (URL or file), with format, value and position |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-qr-barcode`.

## Credentials

QR Code and Barcode Generator and Reader is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **QR Code and Barcode Generator and Reader** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab QR and Barcode (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **QR Code and Barcode Generator and Reader**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab QR and Barcode (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test makes one small call to the API, which counts as one call on your plan.

## Usage

- Each input item makes one request.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.
- Generate QR Code and Generate Barcode return a binary file (`data` by default) to attach, upload or save. Read Codes accepts an image URL or a binary file from a previous node.

**Measured quality:** 50 of 50 generated codes read back exactly and 10 of 10 photo-like images read; reading takes about 70 ms. We publish only what we measured.

## Example workflows

- **Tickets with QR codes.** Webhook (new booking) > CompassLab QR and Barcode: Generate QR Code (booking URL) > Gmail with the `data` file attached.
- **Scan product photos.** Google Drive trigger (new photo) > CompassLab QR and Barcode: Read Codes (Source `Binary File`) > look up the GTIN.

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
