const fs = require('fs');
const path = require('path');

// Base site URL - update if needed
const siteUrl = process.env.SITE_URL || 'https://sudarshankakde.live';

const staticRoutes = ['/', '/about', '/blog', '/contact', '/project', '/resume', '/experience'];

async function fetchBlogSlugs() {
  // Optional: fetch blog slugs from the API if API_URL env var is set
  const api = process.env.API_URL;
  if (!api) return [];
  try {
    const res = await fetch(api + 'api/blogs');
    const json = await res.json();
    return (json.data || []).map((b) => '/blog/' + b.slug);
  } catch (err) {
    console.error('Failed to fetch blog slugs:', err.message || err);
    return [];
  }
}

(async () => {
  const extra = await fetchBlogSlugs();
  const routes = [...staticRoutes, ...extra];
  const urls = routes.map((r) => {
    return `  <url>\n    <loc>${siteUrl}${r}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  const outDir = path.join(__dirname, '..', 'build');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'sitemap.xml');
  fs.writeFileSync(outPath, sitemap, 'utf8');
  console.log('Sitemap written to', outPath);
})();
