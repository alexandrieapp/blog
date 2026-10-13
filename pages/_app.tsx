import "@styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import "@components/Amplitude";
import { transformThemeToCustomProperties } from "theme-custom-properties";
import { colorThemes, defaultColorMode } from "../styles/theme";
import { DM_Sans } from "@next/font/google";

const dmSans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

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
