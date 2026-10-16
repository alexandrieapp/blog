import Image from "next/image";
import { Author } from "@lib/types";

// Le nom de l'auteur est toujours affiché à côté : l'image est décorative.
export const AuthorAvatar: React.FC<{ author: Author }> = ({ author }) =>
  author.avatar != null ? (
    <Image
      src={author.avatar}
      alt=""
      width={24}
      height={24}
      className="w-6 h-6 rounded-full object-cover"
    />
  ) : null;
