export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/healthz") {
      return new Response(JSON.stringify({ ok: true, ts: new Date().toISOString() }), {
        headers: { "content-type": "application/json" }
      });
    }
    if (url.pathname === "/verify" && req.method === "POST") {
      return new Response(JSON.stringify({
        valid: false, reasons: ["not_implemented"], permalink: null, summary: null
      }), { status: 501, headers: { "content-type": "application/json" }});
    }
    if (url.pathname.startsWith("/r/")) {
      const id = url.pathname.split("/").pop()!;
      return new Response(`<!doctype html><h1>RunSeal Receipt</h1><p>id: ${id}</p>`, {
        headers: { "content-type": "text/html" }
      });
    }
    return new Response("Not Found", { status: 404 });
  }
}
