import { Author } from "@lib/types";

export const AuthorAvatar: React.FC<{ author: Author }> = ({ author }) =>
  author.avatar != null ? (
    <img
      src={author.avatar}
      alt={`Avatar of ${author.name}`}
      className="w-6 h-6 rounded-full overflow-hidden"
    />
  ) : null;
