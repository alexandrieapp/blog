import { Feed } from "feed"
import { writeFileSync } from "fs"

import { getPostLink, SITE_NAME, SITE_URL } from "@lib/site"
import { Post } from "@lib/types"

export const generateRssFeed = (posts: Post[]) => {
  const feed = new Feed({
    title: SITE_NAME,
    description: "Articles et guides de l’équipe Alexandrie.",
    id: SITE_URL,
    link: SITE_URL,
    language: "fr",
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
    },
    copyright: `© ${new Date().getFullYear()} Alexandrie`,
  })

  posts.forEach((post) => {
    const url = SITE_URL + getPostLink(post.slug)
    feed.addItem({
      title: post.title,
      description: post.description,
      id: url,
      link: url,
      date: new Date(post.date),
    })
  })

  writeFileSync(`public/rss.xml`, feed.rss2())
}
