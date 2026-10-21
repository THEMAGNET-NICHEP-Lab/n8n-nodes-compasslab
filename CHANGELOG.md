# Changelog

## 0.3.1 (2026-10-21)
- Node codex: `node` is now the full identifier `n8n-nodes-compasslab.compassLab`, as n8n's verification review asked. No change to the node's behaviour.

## 0.3.0 (2026-10-13)
- Optional settings moved into an **Options** collection, as n8n's verification review asked: Check DNS (Email), Default Country (Phone Number), Include Handles (Social Link) and Check DNS (Tech Stack). When an option is not added, nothing is sent and the API's own default applies, which is the same value as before.
- **Breaking for existing workflows** that changed one of these settings: set it again under Options.

## 0.2.1 (2026-10-06)
- Republished for the n8n Creator Portal checks (no code change).

## 0.2.0 (2026-10-06)
- One node with the ten APIs as resources and one credential per marketplace (api.market, RapidAPI). Replaces the ten `n8n-nodes-compasslab-<api>` packages, now deprecated.
