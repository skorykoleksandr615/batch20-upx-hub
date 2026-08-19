const TYPES = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  webmanifest: "application/manifest+json",
  ico: "image/x-icon",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  woff2: "font/woff2"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    let path = url.pathname;
    if (path === "/") path = "/index.html";
    const asset = await env.ASSETS.fetch(new URL(path, url.origin));
    if (asset.status === 404 && !path.includes(".")) {
      const html = await env.ASSETS.fetch(new URL(path.replace(/\/?$/, ".html"), url.origin));
      if (html.ok) return withType(html, path);
    }
    return withType(asset, path);
  }
};

function withType(res, path) {
  const ext = path.split(".").pop();
  const type = TYPES[ext];
  if (!type || !res.ok) return res;
  const headers = new Headers(res.headers);
  headers.set("content-type", type);
  return new Response(res.body, { status: res.status, headers });
}
