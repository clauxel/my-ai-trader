# AI-Trader

Conversion-focused SaaS site for `ai-trader.best`, built with Vite, React, Cloudflare Workers, Cloudflare Pages, D1-ready analytics, and Creem hosted checkout.

## What is included

- Interactive first-screen AI trading desk planner for agent mode, market, copy-trading posture, prediction workflow, and risk boundary.
- Useful inner pages for AI trader app, bot, GitHub, review, competition, prediction, free, and ChatGPT search intent.
- Pricing with Operator annual selected by default and annual billing 50% cheaper than monthly.
- Centered Creem popup checkout that leaves the original page visible behind a blurred overlay.
- Cloudflare Worker API for runtime, analytics, sitemap, robots, and checkout.
- Cloudflare Pages compatible static build and Pages Functions API fallback.
- GitHub Actions workflows for automatic Cloudflare Workers and Pages deploys.

## Commands

```bash
npm install
npm run build
npm run cloudflare:deploy
npm run pages:deploy
```

## Payment

The production payment secret is expected as `API_PROD_KEY` in Cloudflare. Do not commit payment keys or account credentials.

