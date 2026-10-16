import Page from "@layouts/Page";
import { ALEXANDRIE_URL, SITE_NAME, SITE_URL } from "@lib/site";
import { getListedPosts } from "@lib/posts";
import { generateRssFeed } from "@lib/rss";
import { Post } from "@lib/types";
import { GetStaticProps, NextPage } from "next";
import { OrganizationJsonLd } from "next-seo";
import { PostList } from "../components/PostList";

export interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts = [] }) => {
  return (
    <Page>
      <OrganizationJsonLd
        name="Alexandrie"
        url={ALEXANDRIE_URL}
        logo={`${SITE_URL}/logo_full.png`}
        sameAs={[
          SITE_URL,
          "https://www.instagram.com/alexandrieapp/",
          "https://www.linkedin.com/company/alexandrie-app",
        ]}
      />
      <PostList
        posts={posts}
        heading={`${SITE_NAME} : guides et conseils pour les libraires`}
      />
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getListedPosts();

  generateRssFeed(posts);

  return {
    props: { posts },
  };
};

export default Home;
