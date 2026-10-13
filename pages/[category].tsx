import Page from "@layouts/Page"
import { SITE_NAME } from "@lib/site"
import { getListedPosts } from "@lib/posts"
import { Post } from "@lib/types"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { PostList } from "../components/PostList"
import { CATEGORIES } from "../constants"

const categoryLabel = (slug: string) =>
  slug.length > 0 ? slug.charAt(0).toUpperCase() + slug.slice(1) : slug

export interface Props {
  posts: Post[]
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

export const getStaticProps: GetStaticProps<Props> = async (props) => {
  const category = props.params?.category as string

  // Special case for "Guides"
  const posts = getListedPosts().filter(
    (p) =>
      p.category?.toLowerCase() === (category === "guides" ? "guide" : category)
  )

  return {
    props: { posts, category },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: CATEGORIES.map((c) => `/${c.toLowerCase()}`),
    fallback: false,
  }
}

export default CategoryPage
