import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

import { getListedPosts } from "@lib/posts";
import { getPostLink, SITE_URL } from "@lib/site";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = getListedPosts();

  const fields = [
    {
      loc: SITE_URL,
      lastmod: posts[0] != null ? new Date(posts[0].date).toISOString() : undefined,
    },
    ...posts.map((post) => ({
      loc: SITE_URL + getPostLink(post.slug),
      lastmod: new Date(post.date).toISOString(),
    })),
  ];

  return getServerSideSitemap(ctx, fields);
};

// @ts-ignore: Default export to prevent next.js errors
const SitemapPage = () => {
  // Weird NextJS thing
};
export default SitemapPage;
