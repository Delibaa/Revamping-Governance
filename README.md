# Veil — Governance Prototype

A front-end prototype for a privacy-preserving DAO governance UI: proposal listing, voting (with sealed/private ballots), discussion threads, and results/execution tracking.

## Running it

This is a static React + Babel (in-browser JSX) app — no build step required.

- **Editable source**: open [index.html](index.html) in a browser (or serve the directory with any static file server). It loads the `src/*.jsx` files directly via `<script type="text/babel">`.
- **Standalone bundle**: [`DAO Governance (standalone).html`](<DAO Governance (standalone).html>) is a single self-contained file with everything inlined — open it directly with no server needed.

## Structure

- `index.html` — entry point, layout, and CSS
- `src/router.jsx` — routes between the proposal list and a proposal's detail view
- `src/proposals-index.jsx` — proposal list page
- `src/app-detail.jsx` — proposal detail shell (tabs: overview, vote, discussion)
- `src/voting-panel.jsx` — voting flow: cast vs. challenge a vote, broker selection, and the repeat-challenge verification animation
- `src/discussion-panel.jsx` — threaded discussion (public and anonymous comments)
- `src/overview-card.jsx` — proposal overview/summary card
- `src/shared-ui.jsx` — shared components (icons, avatars, badges, etc.)
- `src/data-proposal.js`, `src/data-proposals-list.js` — mock proposal data
- `lib/` — vendored React, ReactDOM, and Babel standalone builds

## Keeping the standalone bundle in sync

`DAO Governance (standalone).html` embeds a gzip+base64-encoded copy of each `src/*.jsx` file plus the page CSS/template in its own manifest. Whenever you edit a `src/*.jsx` file or `index.html`'s styles, the corresponding entry in the standalone bundle must be re-encoded to match — otherwise the two versions will drift apart.
