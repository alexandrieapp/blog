import type { Root as HastRoot } from "hast";
import type { Root as MdastRoot } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { postAssetUrl } from "@lib/posts";

/** Ancre d'un titre, identique à celle des URLs `#…` déjà partagées. */
export const headingId = (text: string) =>
  text.toLowerCase().replace(/\s/g, "-").replace(/[?!:]/g, "");

/**
 * Directives reconnues :
 *   ::video{src="./demo.mp4" caption="…"}
 *   ::youtube{id="dQw4w9WgXcQ"}
 *   :::table{highlight="Alexandrie"}   ← met en valeur la colonne nommée
 *   | … tableau markdown … |
 *   :::
 *
 * Elles sont rendues par les composants de `components/PostContent.tsx`
 * via les balises `post-video` et `post-youtube`.
 */
const remarkPostElements = (dir: string) => (tree: MdastRoot, file) => {
  visit(tree, (node, index, parent) => {
    if (node.type === "textDirective" && parent != null && index != null) {
      // `:mot` dans la prose n'est pas une directive : on le rend tel quel.
      parent.children.splice(
        index,
        1,
        { type: "text", value: `:${node.name}` },
        ...node.children
      );
      return index;
    }

    if (node.type === "leafDirective" || node.type === "containerDirective") {
      const attrs = node.attributes ?? {};
      if (node.name === "video" && attrs.src) {
        node.data = {
          hName: "post-video",
          hProperties: {
            src: postAssetUrl(dir, attrs.src),
            caption: attrs.caption ?? "",
          },
        };
        node.children = [];
        return;
      }
      if (node.name === "youtube" && attrs.id) {
        node.data = {
          hName: "post-youtube",
          hProperties: { videoId: attrs.id },
        };
        node.children = [];
        return;
      }
      if (
        node.type === "containerDirective" &&
        node.name === "table" &&
        attrs.highlight &&
        parent != null &&
        index != null
      ) {
        const table = node.children.find((c) => c.type === "table");
        const column =
          table?.type === "table"
            ? table.children[0].children.findIndex(
                (cell) => toString(cell).trim() === attrs.highlight
              )
            : -1;
        if (table?.type !== "table" || column < 0) {
          file.fail(
            `:::table : colonne « ${attrs.highlight} » introuvable`,
            node
          );
          return;
        }
        for (const row of table.children) {
          const cell = row.children[column];
          if (cell == null) continue;
          cell.data = {
            ...cell.data,
            hProperties: { ...cell.data?.hProperties, dataHighlight: "true" },
          };
        }
        parent.children.splice(index, 1, ...node.children);
        return index;
      }
      file.fail(`Directive inconnue ou incomplète : ::${node.name}`, node);
    }

    // La première colonne porte l'intitulé de chaque ligne.
    if (node.type === "table") {
      for (const row of node.children.slice(1)) {
        const cell = row.children[0];
        if (cell == null) continue;
        cell.data = {
          ...cell.data,
          hName: "th",
          hProperties: { ...cell.data?.hProperties, scope: "row" },
        };
      }
    }

    if (node.type === "heading") {
      node.data = { hProperties: { id: headingId(toString(node)) } };
    }

    if (node.type === "image" || node.type === "link") {
      node.url = postAssetUrl(dir, node.url);
    }

    // Une image seule dans son paragraphe devient une figure avec légende.
    if (
      node.type === "paragraph" &&
      node.children.length === 1 &&
      node.children[0].type === "image"
    ) {
      const image = node.children[0];
      node.data = {
        hName: "post-image",
        hProperties: {
          src: postAssetUrl(dir, image.url),
          alt: image.alt ?? "",
        },
      };
      node.children = [];
    }
  });
};

const stripPositions = (tree: HastRoot) => {
  visit(tree, (node) => {
    delete node.position;
  });
  return tree;
};

/** Convertit le markdown d'un article en arbre hast sérialisable (props Next). */
export const renderMarkdown = async (
  markdown: string,
  dir: string
): Promise<HastRoot> => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(() => remarkPostElements(dir))
    .use(remarkRehype);

  const tree = await processor.run(processor.parse(markdown), {
    path: `content/posts/${dir}/index.md`,
  });
  return stripPositions(tree as HastRoot);
};
