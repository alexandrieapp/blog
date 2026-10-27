import type { Root } from "hast";

/**
 * - `draft` : jamais généré en production, consultable en `yarn dev`
 * - `unlisted` : page générée mais absente des listes, du RSS et du sitemap
 * - `published` : visible partout
 */
export type PostStatus = "draft" | "unlisted" | "published";

export interface Author {
  name: string;
  avatar: string | null;
}

export interface Post {
  slug: string;
  title: string;
  /** Titre de la balise <title> et d'Open Graph quand il diffère du titre affiché. */
  seoTitle: string | null;
  date: string;
  /** Date de dernière mise à jour éditoriale, si différente de `date`. */
  updated: string | null;
  description: string;
  category: string | null;
  author: Author | null;
  status: PostStatus;
  featured: boolean;
  featuredImage: string | null;
}

export interface PostWithContent extends Post {
  content: Root;
}
