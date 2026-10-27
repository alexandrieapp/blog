import Page from "@layouts/Page";
import { SITE_NAME } from "@lib/site";
import { getListedPosts } from "@lib/posts";
import { Post } from "@lib/types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PostList } from "../components/PostList";
import { CATEGORY_PAGES, categoryPath } from "../constants";

const categoryLabel = (slug: string) =>
  slug.length > 0 ? slug.charAt(0).toUpperCase() + slug.slice(1) : slug;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  guides:
    "Guides pas à pas pour gérer votre librairie avec Alexandrie : commandes, réceptions, réassort, import de catalogue et vente en ligne.",
  articles:
    "Articles sur le métier de libraire : choisir un logiciel de gestion de librairie, changer d’outil, vendre en ligne.",
};

export interface Props {
  posts: Post[];
  category?: string;
}

const CategoryPage: NextPage<Props> = ({ posts = [], category }) => {
  const label = category != null ? categoryLabel(category) : null;

  return (
    <Page
      seo={{
        title: label != null ? `${label} | ${SITE_NAME}` : SITE_NAME,
        description:
          category != null ? CATEGORY_DESCRIPTIONS[category] : undefined,
        ...(category != null ? { canonicalPath: `/${category}` } : {}),
      }}
    >
      <PostList
        posts={posts}
        heading={label ?? SITE_NAME}
        category={category}
      />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (props) => {
  const category = props.params?.category as string;

  const posts = getListedPosts().filter(
    (p) => p.category != null && categoryPath(p.category) === `/${category}`
  );

  return {
    props: { posts, category },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.values(CATEGORY_PAGES).map((c) => c.path),
    fallback: false,
  };
};

export default CategoryPage;
