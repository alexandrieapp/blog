import Page from "@layouts/Page"
import { SITE_NAME } from "@lib/site"
import { getDatabase } from "@lib/notion"
import { PostProps } from "@lib/types"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { PostList } from "../components/PostList"
import { CATEGORIES } from "../constants"

const categoryLabel = (slug: string) =>
  slug.length > 0 ? slug.charAt(0).toUpperCase() + slug.slice(1) : slug

export interface Props {
  posts: PostProps[]
  category?: string
}

const CategoryPage: NextPage<Props> = ({ posts = [], category }) => {
  const label = category != null ? categoryLabel(category) : null

  return (
    <Page
      seo={{
        title: label != null ? `${label} | ${SITE_NAME}` : SITE_NAME,
        description:
          label != null
            ? `Articles « ${label} » sur le blog Alexandrie.`
            : "Articles et guides de l’équipe Alexandrie.",
        ...(category != null ? { canonicalPath: `/${category}` } : {}),
      }}
    >
      <PostList posts={posts} category={category} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  if (process.env.POSTS_TABLE_ID == null) {
    return {
      notFound: true,
    }
  }

  const category = props.params?.category as string

  // Special case for "Guides"
  const posts = (await getDatabase(process.env.POSTS_TABLE_ID)).filter(
    (p) =>
      p.properties.Category.select?.name?.toLowerCase() ===
      (category === "guides" ? "guide" : category)
  )

  return {
    props: { posts, category },
    revalidate: 900, // 15 minutes
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: CATEGORIES.map((c) => `/${c}`),
    fallback: true,
  }
}

export default CategoryPage
