# Redirect matrix

Implemented application redirects use permanent status 308 and preserve query parameters:

| Legacy route | Destination |
| --- | --- |
| `/contact` | `/demo` |
| `/solution/property-management` | `/property-management` |
| `/product/agentic-workflows` | `/features/workflows` |
| `/product/ai-agents` | `/features/assistant` |
| `/product/agent-os` | `/features/assistant` |
| `/legal/privacy-policy` | `/privacy` |
| `/legal/terms-of-service` | `/terms` |
| `/legal/cookie-policy` | `/cookies` |

Convenience aliases `/privacy-policy`, `/terms-of-service`, and `/cookie-policy` normalize to the same legal destinations but were not present in the captured sitemap.

The complete 383-URL planning matrix is `legacy-route-inventory.csv`, with generated counts in `legacy-route-summary.json`. `hold-legacy` and `retire-410` rows are migration decisions, not active application behavior.

Before cutover, owners must review traffic/backlinks, approve every retirement, test for loops/chains, and rehearse the final edge/CDN implementation. Removed URLs must not be blanket-redirected to the homepage.
