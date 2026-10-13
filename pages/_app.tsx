import "@styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import "@components/Amplitude";
import { transformThemeToCustomProperties } from "theme-custom-properties";
import { colorThemes, defaultColorMode } from "../styles/theme";
import localFont from "@next/font/local";

// Fichiers variables (graisses 100 à 1000) : @next/font/google ne propose que 400, 500 et 700 pour DM Sans.
const dmSans = localFont({
  src: [
    {
      path: "../styles/fonts/DMSans-latin.woff2",
      weight: "100 1000",
      style: "normal",
    },
    {
      path: "../styles/fonts/DMSans-Italic-latin.woff2",
      weight: "100 1000",
      style: "italic",
    },
  ],
  display: "swap",
});

const AlexandrieBlog = ({ Component, pageProps }: AppProps) => {
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
            font-family: ${dmSans.style.fontFamily};
          }
        `}</style>
      </Head>

      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default AlexandrieBlog;
