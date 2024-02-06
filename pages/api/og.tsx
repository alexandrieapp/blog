import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import Logo from "@components/Logo";

export const config = {
  runtime: "edge",
};

const handler = (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get("title");
  const author = searchParams.get("author");

  return new ImageResponse(
    (
      <div
        style={{
          background: "rgb(10,10,10)",
        }}
        tw="flex h-full w-full flex-row px-10 py-10 items-center"
      >
        <div
          tw="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, rgba(10,10,10,1) 0%, rgba(82,82,82,1) 75%, rgba(163,163,163,1) 100%)",
          }}
        />
        <div tw="flex flex-grow flex-col text-left text-neutral-50">
          <p tw=" font-bold text-4xl">{title ?? "Blog"}</p>
          <p tw="text-lg text-neutral-100">par {author ?? "Alexandrie"}</p>
        </div>
        <div tw="ml-10 mr-10 flex">
          <Logo />
        </div>
      </div>
    ),
    {
      width: 1000,
      height: 400,
    }
  );
};

export default handler;
