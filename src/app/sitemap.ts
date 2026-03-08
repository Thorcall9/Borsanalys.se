import type { MetadataRoute } from "next";
import { analyses } from "@/lib/analyses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://borsanalys.se";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/analyser`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/om-oss`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/verktyg/rantakalkylator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/verktyg/malsparandekalkylator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/anvandarvillkor`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const analysisPages: MetadataRoute.Sitemap = analyses.map((a) => ({
    url: `${baseUrl}/analyser/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...analysisPages];
}
