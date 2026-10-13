import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PostPage } from "@layouts/PostPage";
import { renderMarkdown } from "@lib/markdown";
import { getAllPosts, getPostSource } from "@lib/posts";
import { Post, PostWithContent } from "@lib/types";

import { PostContent } from "@components/PostContent";

export interface Props {
  post: PostWithContent;
  relatedPosts: Post[];
}

const PostRoute: NextPage<Props> = ({ post, relatedPosts }) => (
  <PostPage post={post} relatedPosts={relatedPosts}>
    <PostContent content={post.content} />
  </PostPage>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPosts().map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const source = getPostSource(params?.slug as string);
  if (source == null) {
    return { notFound: true };
  }

  const { post, body, dir } = source;
  const relatedPosts =
    post.category != null
      ? getAllPosts()
          .filter(
            (p) =>
              p.slug !== post.slug &&
              p.category === post.category &&
              p.status === "published"
          )
          .slice(0, 2)
      : [];

  return {
    props: {
      post: { ...post, content: await renderMarkdown(body, dir) },
      relatedPosts,
    },
  };
};

export default PostRoute;
