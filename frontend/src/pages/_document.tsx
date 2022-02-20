import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="author" content="Albert Tian" />
          <meta
            name="description"
            content="Treehacks 2022 - SaveAs project"
          />
          <link rel="shortcut icon" href="/static/meta/favicon.png" />

          {/* <!-- Facebook Meta Tags --/> */}
          <meta property="og:url" content="https://treehacks.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Treehacks 2022 - SaveAs project" />
          <meta
            property="og:description"
            content="Treehacks 2022 - SaveAs project"
          />
          <meta
            property="og:image"
            content="https://treehacks.vercel.app/static/meta/ogImage.png"
          />

          {/* <!-- Twitter Meta Tags --/> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="treehacks.vercel.app" />
          <meta
            property="twitter:url"
            content="https://treehacks.vercel.app/"
          />
          <meta name="twitter:title" content="Treehacks 2022 - SaveAs project" />
          <meta
            name="twitter:description"
            content="Treehacks 2022 - SaveAs project"
          />
          <meta
            name="twitter:image"
            content="https://treehacks.vercel.app/static/meta/ogImage.png"
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
