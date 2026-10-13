import Page from "@layouts/Page";
import { getListedPosts } from "@lib/posts";
import { generateRssFeed } from "@lib/rss";
import { Post } from "@lib/types";
import { GetStaticProps, NextPage } from "next";
import { PostList } from "../components/PostList";

export interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts = [] }) => {
  return (
    <Page>
      <PostList posts={posts} />
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
