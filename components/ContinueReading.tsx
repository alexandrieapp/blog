import dayjs from "dayjs";
import React, { useMemo } from "react";
import { getPostLink } from "../lib/site";
import { Post } from "../lib/types";
import { cn } from "../utils";
import { Divider } from "./Divider";
import Link from "./Link";
import { AuthorAvatar } from "./AuthorAvatar";
import { PostCategory } from "./PostCategory";

export const ContinueReading: React.FC<{
  posts: Post[];
  category: string;
}> = ({ posts, category }) => {
  category = category === "Guide" ? "Guides" : category;

  return (
    <div>
      <header className={cn("flex items-center justify-between mb-8")}>
        <h3 className="text-gray-600 font-semibold text-lg">
          Continuer à lire...
        </h3>
        <Link
          className={cn("text-pink-500", "hover:underline")}
          href={`/${category.toLowerCase()}`}
        >
          Voir tout {category} →
        </Link>
      </header>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8")}>
        {posts.map((post) => (
          <RelatedPostItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

const RelatedPostItem: React.FC<{ post: Post }> = ({ post }) => {
  const formattedDate = useMemo(
    () => dayjs(post.date).format("DD/MM/YYYY"),
    [post.date]
  );

  const { author, category } = post;

  return (
    <Link
      href={getPostLink(post.slug)}
      className="flex flex-col bg-secondaryBg p-6 rounded-lg hover:bg-gray-100 group"
    >
      {category != null && <PostCategory category={category} />}

      <div className="flex-grow">
        <header className="font-bold text-lg mt-2 mb-1">{post.title}</header>

        <p className="text-base text-gray-800 line-clamp-2">
          {post.description}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6">
        {author != null && (
          <>
            <AuthorAvatar author={author} />
            <span className="font-medium text-sm text-gray-600">
              {author.name}
            </span>
            <Divider />
          </>
        )}
        <span className="font-medium text-sm text-gray-600">
          {formattedDate}
        </span>
      </div>
    </Link>
  );
};
