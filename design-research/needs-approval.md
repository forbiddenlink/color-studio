# Needs approval

Changes that were considered and NOT made, because they are destructive, risky, or cost money. Each needs an explicit yes before anyone builds it.

| # | Change | Why it needs approval | Recommendation |
|---|---|---|---|
| A1 | AI palette generation (prompt-to-palette) | Needs a paid model API key and a server route; the app is currently backend-free | Skip unless a free tier or local model is acceptable |
| A2 | Saved palette library synced across devices | Needs accounts and a database | Skip; a local-only "saved palettes" list could be built without approval if wanted |
| A3 | Remove PostHog analytics | Removing a feature | Keep; it is already env-gated |
| A4 | Fix CSP `connect-src 'self'` to allow the PostHog host (`vercel.json`) | Production security header change; PostHog calls are probably blocked today when a key is set | Approve if analytics are wanted; add only the exact PostHog host |
| A5 | Merge `design/upgrade` into `main` / deploy | Production change | Review `report.md` first |
