import { analyses } from "@/lib/analyses";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  if (format !== "rss") {
    return new Response("Not found", { status: 404 });
  }

  const baseUrl = "https://www.borsanalys.se";

  const items = analyses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((analysis) => {
      const url = `${baseUrl}/analyser/${analysis.slug}`;
      const imageUrl = analysis.heroImage ? `${baseUrl}${analysis.heroImage}` : null;

      const description = imageUrl
        ? `<description><![CDATA[<img src="${imageUrl}" />\n${analysis.excerpt}]]></description>`
        : `<description>${analysis.excerpt}</description>`;

      const mediaContent = imageUrl
        ? `\n      <media:content url="${imageUrl}" medium="image" />`
        : "";

      return `
    <item>
      <title>${analysis.title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(analysis.date).toUTCString()}</pubDate>
      ${description}${mediaContent}
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Börsanalys.se — Aktieanalyser</title>
    <link>${baseUrl}</link>
    <description>Djupgående aktieanalyser med Bull, Base och Bear-scenarier</description>
    <language>sv</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600",
    },
  });
}
