import Link from "@components/Link";
import { getPostLink } from "@lib/site";
import { Post } from "@lib/types";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Divider } from "./Divider";
import { AuthorAvatar } from "./AuthorAvatar";
import { PostCategory } from "./PostCategory";
import Image from "next/image";

export const FeaturedPostItem: React.FC<{ post: Post }> = ({ post }) => {
  const formattedDate = useMemo(
    () => dayjs(post.date).format("DD/MM/YYYY"),
    [post.date]
  );

  const { author, category, featuredImage } = post;

  return (
    <Link href={getPostLink(post.slug)} className="group">
      {featuredImage != null ? (
        <div className="w-full aspect-[2.25/1] relative border border-black border-opacity-10 rounded-xl overflow-hidden">
          <Image
            src={featuredImage}
            fill
            priority
            alt={post.title}
            className="object-cover transition-transform group-hover:scale-[1.05]"
          />
        </div>
      ) : (
        <div className="w-full aspect-[2/1] bg-gray-100 rounded-xl" />
      )}

      <div className="mt-6">
        {category != null && <PostCategory category={category} />}

        <h3 className="font-bold text-2xl my-4 group-hover:opacity-60 tracking-tight">
          {post.title}
        </h3>

        <p className="text-lg text-gray-800 line-clamp-2">{post.description}</p>

        <div className="flex items-center gap-3 mt-6">
          {author != null && (
            <>
              <AuthorAvatar author={author} />
              <span className="font-medium text-sm text-gray-500">
                {author.name}
              </span>
              <Divider />
            </>
          )}
          <span className="font-medium text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
};
