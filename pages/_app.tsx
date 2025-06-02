import "@styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { transformThemeToCustomProperties } from "theme-custom-properties";
import { colorThemes, defaultColorMode } from "../styles/theme";
import { Inter } from "@next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const RailwayBlog = ({ Component, pageProps }: AppProps) => {
  const { bodyCSS } = useMemo(
    () =>
      transformThemeToCustomProperties(colorThemes, {
        defaultTheme: defaultColorMode,
        attribute: "class",
      }),
    []
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange={true}
      enableSystem
    >
      <Head>
        <style>{bodyCSS}</style>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
      </Head>

      <Component {...pageProps} />
      <GoogleAnalytics gaId={gaId} />
    </ThemeProvider>
  );
};

export default RailwayBlog;
