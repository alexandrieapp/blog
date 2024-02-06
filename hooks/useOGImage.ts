import { useTheme } from "next-themes";

export const useOgImage = ({
  title,
  authorName,
  image,
}: {
  title: string;
  authorName: string;
  image?: string;
}): string => {
  // const { theme } = useTheme();

  const encodedTitle = encodeURIComponent(title);
  const encodedAuthorName = encodeURIComponent(authorName);

  return (
    image ??
    `https://blog.alexandrie.app/api/og?title=${encodedTitle}&author=${encodedAuthorName}`
  );
};
