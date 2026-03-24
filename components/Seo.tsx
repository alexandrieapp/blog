import { NextSeo, NextSeoProps } from "next-seo";
import { SITE_NAME, SITE_URL } from "@lib/site";

const defaultDescription =
  "Articles et guides de l’équipe Alexandrie.";

const defaultOgImage = `${SITE_URL}/api/og?title=${encodeURIComponent(
  SITE_NAME
)}&author=${encodeURIComponent("Alexandrie")}`;

export interface Props extends NextSeoProps {
  title?: string;
  description?: string;
  image?: string;
  /** Path only, e.g. `/p/my-post` or `/Guides` */
  canonicalPath?: string;
}

const SEO: React.FC<Props> = ({
  title = SITE_NAME,
  description: descriptionProp,
  image,
  canonicalPath,
  openGraph: openGraphProp,
  ...rest
}) => {
  const description = descriptionProp ?? defaultDescription;
  const canonical = canonicalPath
    ? `${SITE_URL}${
        canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`
      }`
    : SITE_URL;
  const ogImageUrl = image ?? defaultOgImage;
  const ogType = openGraphProp?.type ?? "website";

  const articleOg =
    ogType === "article" && openGraphProp?.article != null
      ? { article: openGraphProp.article }
      : {};

  return (
    <NextSeo
      {...rest}
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        url: canonical,
        siteName: SITE_NAME,
        type: ogType,
        title,
        description,
        locale: openGraphProp?.locale ?? "fr_FR",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        ...articleOg,
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
};

export default SEO;
