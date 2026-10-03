# CompassLab nodes for n8n

[n8n](https://n8n.io/) community nodes for the CompassLab APIs, one package per API. Every node works with a key from **api.market** or **RapidAPI** (each API has a free plan), can be used as a **tool by the n8n AI Agent**, and has no runtime dependencies.

| Package | Node | What it does |
|---|---|---|
| [n8n-nodes-compasslab-email-validator](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-email-validator) | CompassLab Email Validator | Syntax, MX records, disposable, role and free-provider flags, typo suggestions |
| [n8n-nodes-compasslab-phone-validator](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-phone-validator) | CompassLab Phone Validator | Validate and format phone numbers: E.164, type, country, region, time zone |
| [n8n-nodes-compasslab-holidays](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-holidays) | CompassLab Holidays | Public holidays for 250 countries and regions, business-day math |
| [n8n-nodes-compasslab-article-extractor](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-article-extractor) | CompassLab Article Extractor | Any web page or PDF link to clean Markdown and text |
| [n8n-nodes-compasslab-link-preview](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-link-preview) | CompassLab Link Preview | Title, description, image, favicon and site name of any URL |
| [n8n-nodes-compasslab-contact-extractor](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-contact-extractor) | CompassLab Contact Extractor | A company's published business emails, phones, address and VAT ID |
| [n8n-nodes-compasslab-social-links](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-social-links) | CompassLab Social Links | A company's official social media profiles from its domain |
| [n8n-nodes-compasslab-tech-stack](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-tech-stack) | CompassLab Tech Stack | The CMS, shop, analytics, CDN, hosting and payments behind a website |
| [n8n-nodes-compasslab-qr-barcode](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-qr-barcode) | CompassLab QR and Barcode | Generate QR codes and barcodes (PNG/SVG files), read them from images |
| [n8n-nodes-compasslab-pdf-to-text](https://github.com/THEMAGNET-NICHEP-Lab/n8n-nodes-compasslab-pdf-to-text) | CompassLab PDF to Text | PDF (URL or file) to text, Markdown or pages |

Install any of them in n8n: **Settings > Community Nodes > Install**, then enter the package name. Each package README explains its credentials and has example workflows.

## Development

The packages are generated: shared code is in `src/shared`, each API's operations in `src/products/<id>.ts`, and names, marketplace slugs, hosts and README text in `generate.mjs`.

```bash
npm install          # one toolchain for all packages (npm workspaces)
npm run generate     # rewrite packages/ from src/ and generate.mjs
npm run build        # build every package
npm run lint         # n8n's linter on every package
```

Releases: bump `VERSION` in `generate.mjs` and run `npm run generate`. Each package is mirrored to its own repository (linked above), because n8n vets a node against its own repo; pushing there runs that repo's **Publish** workflow, which publishes the new version with npm provenance.

## License

[MIT](LICENSE.md)
