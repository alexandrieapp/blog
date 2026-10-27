import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";

import { Author, Post, PostStatus } from "@lib/types";
import { isListedCategory } from "../constants";

export const CONTENT_DIR = path.join(process.cwd(), "content");
export const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const AUTHORS_FILE = path.join(CONTENT_DIR, "authors.yml");

const STATUSES: PostStatus[] = ["draft", "unlisted", "published"];

// Les brouillons ne sont générés qu'en local, pour pouvoir les relire.
const includeDrafts = process.env.NODE_ENV !== "production";

/** URL publique d'un fichier placé à côté de l'article (`./image.png`). */
export const postAssetUrl = (dir: string, src: string) =>
  src.startsWith("./") ? `/posts/${dir}/${src.slice(2)}` : src;

const readAuthors = (): Record<string, Author> => {
  const raw = (loadYaml(fs.readFileSync(AUTHORS_FILE, "utf8")) ?? {}) as Record<
    string,
    { name: string; avatar?: string }
  >;

  return Object.fromEntries(
    Object.entries(raw).map(([key, a]) => [
      key,
      {
        name: a.name,
        avatar: a.avatar?.startsWith("./")
          ? `/${a.avatar.slice(2)}`
          : a.avatar ?? null,
      },
    ])
  );
};

const required = (file: string, data: Record<string, unknown>, key: string) => {
  const value = data[key];
  if (value == null || value === "") {
    throw new Error(`${file} : le champ « ${key} » est obligatoire`);
  }
  return value;
};

interface PostFile {
  post: Post;
  body: string;
  dir: string;
}

const readPostFile = (
  dir: string,
  authors: Record<string, Author>
): PostFile => {
  const file = path.join("content/posts", dir, "index.md");
  const { data, content } = matter(
    fs.readFileSync(path.join(process.cwd(), file), "utf8")
  );

  const status = required(file, data, "status") as PostStatus;
  if (!STATUSES.includes(status)) {
    throw new Error(
      `${file} : status « ${status} » invalide (${STATUSES.join(" | ")})`
    );
  }

  const authorKey = data.author as string | undefined;
  if (authorKey != null && authors[authorKey] == null) {
    throw new Error(
      `${file} : auteur « ${authorKey} » absent de content/authors.yml`
    );
  }

  // gray-matter convertit les dates YAML en objets Date
  const toIsoDate = (value: unknown) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
  const isoDate = toIsoDate(required(file, data, "date"));
  const updated = data.updated != null ? toIsoDate(data.updated) : null;

  return {
    dir,
    body: content,
    post: {
      slug: (data.slug as string | undefined) ?? dir,
      title: required(file, data, "title") as string,
      seoTitle: (data.seoTitle as string | undefined) ?? null,
      date: isoDate,
      updated,
      description: required(file, data, "description") as string,
      category: (data.category as string | undefined) ?? null,
      author: authorKey != null ? authors[authorKey] : null,
      status,
      featured: data.featured === true,
      featuredImage:
        data.featuredImage != null
          ? postAssetUrl(dir, data.featuredImage as string)
          : null,
    },
  };
};

const readAllPostFiles = (): PostFile[] => {
  const authors = readAuthors();

  const files = fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        fs.existsSync(path.join(POSTS_DIR, d.name, "index.md"))
    )
    .map((d) => readPostFile(d.name, authors))
    .filter((f) => includeDrafts || f.post.status !== "draft")
    .sort((a, b) => b.post.date.localeCompare(a.post.date));

  const seen = new Set<string>();
  for (const { post } of files) {
    if (seen.has(post.slug)) throw new Error(`Slug en double : ${post.slug}`);
    seen.add(post.slug);
  }

  return files;
};

/** Articles qui ont une page : publiés, non listés, et brouillons en local. */
export const getAllPosts = (): Post[] => readAllPostFiles().map((f) => f.post);

/** Articles affichés dans les listes, le RSS et le sitemap. */
export const getListedPosts = (): Post[] =>
  getAllPosts().filter((p) => p.status === "published");

/** Articles de l'accueil et du flux RSS : les catégories masquées en sont absentes. */
export const getFrontPagePosts = (): Post[] =>
  getListedPosts().filter((p) => isListedCategory(p.category));

export const getPostSource = (slug: string): PostFile | null =>
  readAllPostFiles().find((f) => f.post.slug === slug) ?? null;
