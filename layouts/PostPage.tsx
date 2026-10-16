import Page from "@layouts/Page";
import { SITE_NAME, SITE_URL } from "@lib/site";
import { ArticleJsonLd, BreadcrumbJsonLd } from "next-seo";
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
  const formattedUpdated = useMemo(
    () =>
      post.updated != null && post.updated !== post.date
        ? dayjs(post.updated).format("DD/MM/YYYY")
        : null,
    [post.updated, post.date]
  );

  const { author, category, description, slug, title } = post;

  const ogImage = useOgImage({
    title,
    authorName: author?.name,
  });

  const url = `${SITE_URL}/p/${slug}`;
  const categoryPath =
    category != null
      ? `/${(category === "Guide" ? "Guides" : category).toLowerCase()}`
      : null;

  return (
    <Page
      seo={{
        title: `${title} | Alexandrie`,
        description,
        image: ogImage,
        canonicalPath: `/p/${slug}`,
        noindex: post.status !== "published",
        openGraph: {
          type: "article",
          article: {
            publishedTime: post.date,
            ...(post.updated != null ? { modifiedTime: post.updated } : {}),
            ...(author != null ? { authors: [author.name] } : {}),
            ...(category != null ? { section: category } : {}),
          },
        },
      }}
    >
      <ArticleJsonLd
        type="BlogPosting"
        url={url}
        title={title}
        description={description}
        images={[ogImage]}
        datePublished={post.date}
        dateModified={post.updated ?? post.date}
        authorName={author?.name ?? "Alexandrie"}
        publisherName="Alexandrie"
        publisherLogo={`${SITE_URL}/logo_full.png`}
        isAccessibleForFree
      />
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: SITE_NAME, item: SITE_URL },
          ...(category != null && categoryPath != null
            ? [
                {
                  position: 2,
                  name: category === "Guide" ? "Guides" : category,
                  item: `${SITE_URL}${categoryPath}`,
                },
              ]
            : []),
          { position: categoryPath != null ? 3 : 2, name: title, item: url },
        ]}
      />

      {post.status === "draft" && (
        <div className="sticky top-0 z-50 bg-yellow-100 text-yellow-900 text-center text-sm font-medium py-2">
          Brouillon : cet article n’est pas publié en production.
        </div>
      )}

      <div className="mt-10 mb-5 px-5 md:px-8 mx-auto">
        <article
          className={cn(
            "max-w-6xl mx-auto mt-6 mb-12",
            relatedPosts.length >= 2
              ? "border-b border-gray-100 pb-32"
              : "pb-12"
          )}
        >
          <header className="max-w-[736px] mx-auto mb-16">
            <h1 className="text-[clamp(36px,4.5vw,48px)] leading-[1.15] tracking-[-0.02em] font-bold text-balance">
              {title}
            </h1>

            <div className="flex items-center mt-5 text-gray-600 space-x-3">
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
              {formattedUpdated != null && post.updated != null && (
                <>
                  <Divider />
                  <span>
                    Mis à jour le{" "}
                    <time dateTime={post.updated}>{formattedUpdated}</time>
                  </span>
                </>
              )}
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
