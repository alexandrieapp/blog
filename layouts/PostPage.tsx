import Page from "@layouts/Page";
import { SITE_NAME } from "@lib/site";
import { Post } from "@lib/types";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { BottomCTA } from "../components/BottomCTA";
import { ContinueReading } from "../components/ContinueReading";
import { Divider } from "../components/Divider";
import { useOgImage } from "../hooks/useOGImage";
import { cn } from "../utils";

export interface Props {
  post: Post;
  relatedPosts: Post[];
  children?: React.ReactNode;
}

export const PostPage: React.FC<Props> = ({ post, relatedPosts, children }) => {
  const formattedDate = useMemo(
    () => dayjs(post.date).format("DD/MM/YYYY"),
    [post.date]
  );

  const { author, category, description, slug, title } = post;

  const ogImage = useOgImage({
    title,
    authorName: author?.name,
  });

  return (
    <Page
      seo={{
        title: `${title} | ${SITE_NAME}`,
        description,
        image: ogImage,
        canonicalPath: `/p/${slug}`,
        noindex: post.status !== "published",
        openGraph: {
          type: "article",
          article: {
            publishedTime: post.date,
            ...(author != null ? { authors: [author.name] } : {}),
            ...(category != null ? { section: category } : {}),
          },
        },
      }}
    >
      {post.status === "draft" && (
        <div className="sticky top-0 z-50 bg-yellow-100 text-yellow-900 text-center text-sm font-medium py-2">
          Brouillon : cet article n’est pas publié en production.
        </div>
      )}

      <div className="mt-10 mb-5 px-5 md:px-8 mx-auto">
        <article
          className={cn(
            "max-w-6xl mx-auto mt-24 mb-12",
            relatedPosts.length >= 2
              ? "border-b border-gray-100 pb-32"
              : "pb-12"
          )}
        >
          <header className="max-w-[736px] mx-auto mb-16">
            <h1 className="text-[clamp(36px,4.5vw,48px)] leading-[1.15] tracking-[-0.02em] font-bold text-balance">
              {title}
            </h1>

            <div className="flex items-center mt-5 text-gray-500 space-x-3">
              {author != null && (
                <>
                  <div className="flex items-center space-x-3">
                    <AuthorAvatar author={author} />
                    <span>{author.name}</span>
                  </div>
                  <Divider />
                </>
              )}
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
          </header>

          <section className="max-w-[736px] mx-auto font-content text-base sm:text-lg leading-8">
            {children}
          </section>
        </article>

        <div className="max-w-6xl mx-auto">
          {category != null && relatedPosts.length >= 2 && (
            <ContinueReading category={category} posts={relatedPosts} />
          )}

          <BottomCTA />
        </div>
      </div>
    </Page>
  );
};
