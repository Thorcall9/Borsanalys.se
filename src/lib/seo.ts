import type { Metadata } from "next";

const SITE_NAME = "Börsanalys.se";
const SITE_URL = "https://borsanalys.se";
const SITE_DESCRIPTION =
  "AI-driven aktieanalys för smartare investeringar. Detaljerade analyser, värderingsmodeller och finansiella verktyg.";

export function createMetadata(options: {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}): Metadata {
  const title = options.title
    ? `${options.title} — ${SITE_NAME}`
    : SITE_NAME;
  const description = options.description || SITE_DESCRIPTION;
  const url = options.path ? `${SITE_URL}${options.path}` : SITE_URL;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "sv_SE",
      type: options.type || "website",
      ...(options.publishedTime && {
        publishedTime: options.publishedTime,
      }),
      ...(options.modifiedTime && {
        modifiedTime: options.modifiedTime,
      }),
      ...(options.author && {
        authors: [options.author],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI-driven aktieanalys`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
