import type { Root } from "hast";
import { toJsxRuntime, Components, Options } from "hast-util-to-jsx-runtime";
import NextImage from "next/image";
import React from "react";
import * as jsxRuntime from "react/jsx-runtime";

import { Code } from "@components/Code";
import Link from "@components/Link";

// @types/react 18.0 ne type pas encore les exports de react/jsx-runtime.
const { Fragment, jsx, jsxs } = jsxRuntime as unknown as Pick<
  Options,
  "Fragment" | "jsx" | "jsxs"
>;

const PostImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="flex flex-col my-8">
    <div className="imageContainer w-full">
      <NextImage
        src={src}
        alt={alt}
        fill
        className="nextImage p-0 rounded overflow-hidden"
        unoptimized={process.env.NODE_ENV !== "production"}
      />
    </div>
    {alt && <p className="text-gray-600 mt-3 text-sm">{alt}</p>}
  </div>
);

const PostVideo: React.FC<{ src: string; caption?: string }> = ({
  src,
  caption,
}) => (
  <div className="flex flex-col my-8 space-y-2">
    <video
      src={src}
      controls
      autoPlay
      loop
      muted
      playsInline
      className="rounded-lg"
    />
    {caption && <p className="text-gray-500 text-sm">{caption}</p>}
  </div>
);

const PostYoutube: React.FC<{ videoId: string }> = ({ videoId }) => (
  <div className="flex flex-col my-8 space-y-2">
    <iframe
      className="rounded-lg"
      src={`https://youtube.com/embed/${videoId}`}
      height={550}
      allowFullScreen
    />
  </div>
);

const Heading: React.FC<{
  as: "h1" | "h2" | "h3" | "h4";
  id?: string;
  className: string;
  children?: React.ReactNode;
}> = ({ as: Tag, id, className, children }) => (
  <Link href={`#${id}`} className="relative">
    {/* Ancre placée légèrement au-dessus du titre pour lui laisser de l'air */}
    <span
      id={id}
      aria-hidden="true"
      className="absolute inline-block w-px top-[-2rem]"
    />
    <Tag className={className}>{children}</Tag>
  </Link>
);

const components = {
  "post-image": PostImage,
  "post-video": PostVideo,
  "post-youtube": PostYoutube,
  h1: ({ id, children }) => (
    <Heading
      as="h1"
      id={id}
      className="text-4xl font-bold leading-snug mt-16 mb-8"
    >
      {children}
    </Heading>
  ),
  h2: ({ id, children }) => (
    <Heading as="h2" id={id} className="text-h2 font-bold mt-10 mb-5">
      {children}
    </Heading>
  ),
  h3: ({ id, children }) => (
    <Heading as="h3" id={id} className="text-xl font-bold mt-6 mb-4">
      {children}
    </Heading>
  ),
  h4: ({ id, children }) => (
    <Heading as="h4" id={id} className="text-lg font-bold mt-6 mb-4">
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <p className="leading-8 mb-6 text-gray-800">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link href={href} className="underline hover:text-pink-600">
      {children}
    </Link>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="flex flex-col my-8 border-l-4 pl-4 border-gray-100 text-gray-700 italic [&>p]:mb-0 space-y-4">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => <ul className="list-disc pl-6 mb-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-6">{children}</ol>,
  li: ({ children }) => (
    <li className="mb-2 [&>ul]:my-4 [&>ol]:my-4 [&>p]:mb-2">{children}</li>
  ),
  hr: () => <hr className="my-8" />,
  code: ({ className, children }) => (
    <code
      className={className ?? "text-pink-600 whitespace-normal break-words"}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => {
    const code = React.Children.only(children) as React.ReactElement<{
      className?: string;
      children: string;
    }>;
    const language = code.props.className?.replace(/^language-/, "");
    return (
      <Code language={language}>
        {String(code.props.children).replace(/\n$/, "")}
      </Code>
    );
  },
  table: ({ children }) => (
    <div className="my-8 rounded-lg border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  ),
  th: ({ children }) => (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {children}
    </td>
  ),
} as Partial<Components>;

export const PostContent: React.FC<{ content: Root }> = ({ content }) =>
  toJsxRuntime(content, { Fragment, jsx, jsxs, components });
