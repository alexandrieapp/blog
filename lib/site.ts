const raw = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL =
  typeof raw === "string" && raw.length > 0
    ? raw.replace(/\/$/, "")
    : "https://blog.alexandrie.app";

export const SITE_NAME = "Alexandrie Blog";
