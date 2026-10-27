import { useRouter } from "next/router";
import { CATEGORY_PAGES, HIDDEN_CATEGORY_PATHS } from "../constants";
import Link from "./Link";

const navCategories = Object.values(CATEGORY_PAGES)
  .map((c) => ({ item: c.label, slug: c.path }))
  .filter((c) => !HIDDEN_CATEGORY_PATHS.includes(c.slug));

export const Categories: React.FC = () => {
  // Avec une seule catégorie visible, « Tout » et cette catégorie listent les
  // mêmes articles : la barre n'apporte rien.
  if (navCategories.length < 2) return null;

  return (
    <ul className="flex flex-wrap gap-4 md:gap-8 mt-4 mb-8">
      <CategoryItem item="Tout" slug="/" className="hidden md:block" />

      {navCategories.map((c) => (
        <CategoryItem key={c.slug} item={c.item} slug={c.slug} />
      ))}
    </ul>
  );
};

const CategoryItem: React.FC<{
  item: string;
  slug: string;
  className?: string;
}> = ({ item, slug, className }) => {
  const { asPath } = useRouter();
  const isActive = asPath === slug;

  return (
    <li className={className}>
      <Link
        className={`text-base font-medium ${
          isActive ? "text-foreground" : "text-gray-600"
        } hover:text-foreground`}
        href={`${slug}`}
      >
        {item}
      </Link>
    </li>
  );
};
