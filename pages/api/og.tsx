import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

function decodeParam(value: string | null, fallback: string): string {
  if (value == null || value === "") return fallback;
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

export default function handler(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const title = decodeParam(searchParams.get("title"), "Alexandrie Blog");
  const author = decodeParam(searchParams.get("author"), "Alexandrie");
  const logoUrl = `${origin}/logo_full.png`;

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, rgb(10,10,10) 0%, rgb(38,38,38) 45%, rgb(82,82,82) 100%)",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
        tw="flex h-full w-full flex-row items-center justify-between px-16 py-12"
      >
        <div tw="flex flex-col justify-center flex-1 pr-12 min-w-0">
          <p tw="text-[52px] font-bold text-white leading-tight">{title}</p>
          <p tw="text-[26px] text-neutral-300 mt-5">par {author}</p>
        </div>
        <img
          src={logoUrl}
          alt=""
          width={400}
          height={100}
          tw="flex-shrink-0 object-contain object-right"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
