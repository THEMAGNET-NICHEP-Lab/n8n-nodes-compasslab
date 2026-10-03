# n8n-nodes-compasslab-pdf-to-text

This is an n8n community node for **PDF to Text and Markdown** by CompassLab: extract the text of a PDF (URL or file) as plain text, Markdown or page by page, with metadata and scanned-page flags.

| Operation | What it does |
|---|---|
| **Extract Text** | Text of a PDF from a URL or a binary file, as plain text, Markdown or one entry per page, with page count, metadata, language and scanned pages |

The node can also be used as a **tool by the n8n AI Agent**.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Usage](#usage) · [Example workflows](#example-workflows) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In short: **Settings > Community Nodes > Install**, then enter `n8n-nodes-compasslab-pdf-to-text`.

## Credentials

PDF to Text and Markdown is sold on two marketplaces. Pick one; the node works with both, and both have a **free plan**.

**api.market**
1. Sign up at [api.market](https://api.market) and open **PDF to Text and Markdown** (search for "CompassLab").
2. Subscribe (the FREE plan needs no credit card) and copy your API key (`x-api-market-key`).
3. In n8n, create a **CompassLab PDF to Text (api.market) API** credential and paste the key.

**RapidAPI**
1. Sign up at [rapidapi.com](https://rapidapi.com) and search for **PDF to Text and Markdown**.
2. Subscribe to the free BASIC plan and copy your `X-RapidAPI-Key` from the playground.
3. In n8n, create a **CompassLab PDF to Text (RapidAPI) API** credential and paste the key.

In the node, choose the same **Marketplace** as your credential. The credential test makes one small call to the API, which counts as one call on your plan.

## Usage

- Each input item makes one request.
- Errors show the API's own reason (for example a wrong parameter, or a missing subscription and how to fix it). Turn on **Settings > On Error > Continue** to keep processing the other items.
- Source `URL` or `Binary File` (for example an email attachment). Up to 15 MB and 200 pages per call. Scanned pages have no text layer: they are listed in `scanned_pages` (no OCR).

**Measured quality:** 20 of 20 real PDFs handled correctly (papers, standards, tax forms, law texts, a scan and a password-protected file). We publish only what we measured.

## Example workflows

- **PDF attachments to text.** Gmail trigger (with attachments) > CompassLab PDF to Text (Source `Binary File`, field `attachment_0`) > AI Agent or a database.
- **Documents for RAG.** Google Drive (download PDF) > CompassLab PDF to Text (format Markdown) > vector store.

## Compatibility

Built with the `n8n-node` CLI (n8n Nodes API version 1). No runtime dependencies. Tested with n8n 2.41.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Other CompassLab nodes: https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab
- Privacy: https://pdf-eryx.onrender.com/privacy
- Terms: https://pdf-eryx.onrender.com/terms

## Version history

- **0.1.3**: the credential test is a request in the credential (n8n's standard).
- **0.1.2**: each package now has its own repository.
- **0.1.1**: node category renamed to n8n's current list.
- **0.1.0**: first release.

## License

[MIT](LICENSE.md)
