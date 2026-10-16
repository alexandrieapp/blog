import Link from "@components/Link";
import { getPostLink } from "@lib/site";
import { Post } from "@lib/types";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Divider } from "./Divider";
import { AuthorAvatar } from "./AuthorAvatar";
import { PostCategory } from "./PostCategory";

export interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const formattedDate = useMemo(
    () => dayjs(post.date).format("DD/MM/YYYY"),
    [post.date]
  );

  const { author, category } = post;

  return (
    <Link
      href={getPostLink(post.slug)}
      className="flex flex-col border-b border-gray-100 group"
    >
      {category != null && <PostCategory category={category} />}

      <div className="flex-grow">
        <h4 className="font-bold text-lg mt-2 mb-1 group-hover:opacity-60 tracking-tight">
          {post.title}
        </h4>

        <p className="text-base text-gray-800 line-clamp-2">
          {post.description}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6 mb-10">
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

export default PostItem;
