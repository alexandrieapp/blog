const raw = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL =
  typeof raw === "string" && raw.length > 0
    ? raw.replace(/\/$/, "")
    : "https://blog.alexandrie.app";

export const SITE_NAME = "Alexandrie Blog";

export const SITE_DESCRIPTION =
  "Guides et conseils pour les libraires indépendants : logiciel de gestion de librairie, commandes, réassort, caisse et vente en ligne.";

export const ALEXANDRIE_URL = "https://alexandrie.app";

export const getPostLink = (slug: string) => `/p/${slug}`;
