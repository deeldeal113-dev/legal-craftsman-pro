import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site-config";
import { POSTS, CATEGORIES, TAGS } from "@/lib/blog-data";

const STATIC = ["/", "/about", "/services", "/fields", "/blog", "/faq", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          ...STATIC.map((p) => `${SITE.url}${p === "/" ? "" : p}`),
          ...POSTS.map((b) => `${SITE.url}/blog/${b.slug}`),
          ...Object.keys(CATEGORIES).map((c) => `${SITE.url}/blog/category/${c}`),
          ...Object.keys(TAGS).map((t) => `${SITE.url}/blog/tag/${t}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
