import { SITE_URL } from "@lib/site";

export const useOgImage = ({
  title,
  authorName,
}: {
  title: string;
  authorName?: string;
}): string => {
  const encodedTitle = encodeURIComponent(title);
  const encodedAuthorName = encodeURIComponent(authorName ?? "Alexandrie");

  return `${SITE_URL}/api/og?title=${encodedTitle}&author=${encodedAuthorName}`;
};
