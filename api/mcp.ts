// CAK3Dmonitor deployment stand-in for the MCP route.
//
// The upstream route (re-exporting ./mcp/handler) bundles to ~1.02 MB, over the
// Vercel Hobby plan's 1 MB edge-function limit, which fails the whole deploy.
// Moving it to the Node runtime isn't safe (see the notes in api/mcp-proxy.ts),
// and the file has to exist for scripts/build-sitemap.mjs. So this deployment
// serves a small 503 instead of the AI-agent connector. The dashboard doesn't
// use it, and the ./mcp/ helpers stay because other functions import them.
// To bring the connector back on a paid plan, restore the upstream version of
// this file.

export const config = { runtime: 'edge' };

export default function handler(): Response {
  return new Response(
    JSON.stringify({ error: 'The MCP connector is not available on this deployment.' }),
    { status: 503, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } },
  );
}
