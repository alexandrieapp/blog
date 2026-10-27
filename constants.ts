/** Catégories d'article : valeur du frontmatter → libellé et chemin de sa page. */
export const CATEGORY_PAGES: Record<string, { label: string; path: string }> = {
  Guide: { label: "Guides", path: "/guides" },
  Article: { label: "Articles", path: "/articles" },
};

export const categoryLabel = (category: string) =>
  CATEGORY_PAGES[category]?.label ?? category;

export const categoryPath = (category: string) =>
  CATEGORY_PAGES[category]?.path ?? `/${category.toLowerCase()}`;

/**
 * Pages de catégorie absentes de l'accueil, de la navigation, du pied de page
 * et du flux RSS. Leurs articles gardent leur page, leur place dans le sitemap
 * et leur référencement : le blog met en avant le métier de libraire, pas le
 * mode d'emploi d'Alexandrie.
 */
export const HIDDEN_CATEGORY_PATHS = ["/guides"];

export const isListedCategory = (category: string | null) =>
  category == null || !HIDDEN_CATEGORY_PATHS.includes(categoryPath(category));
