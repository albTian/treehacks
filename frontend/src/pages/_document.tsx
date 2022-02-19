import NextDocument, { Html, Main, Head, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

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
            content="a web3 playground for my personal projects from buildspace."
          />
          <link rel="shortcut icon" href="/static/meta/favicon.png" />

          {/* <!-- Facebook Meta Tags --/> */}
          <meta property="og:url" content="https://web3-albtian.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="web3 playground" />
          <meta
            property="og:description"
            content="a web3 playground for my personal projects from buildspace."
          />
          <meta
            property="og:image"
            content="https://web3-albtian.vercel.app/static/meta/ogImage.png"
          />

          {/* <!-- Twitter Meta Tags --/> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="web3-albtian.vercel.app" />
          <meta
            property="twitter:url"
            content="https://web3-albtian.vercel.app/"
          />
          <meta name="twitter:title" content="web3 playground" />
          <meta
            name="twitter:description"
            content="a web3 playground for my personal projects from buildspace."
          />
          <meta
            name="twitter:image"
            content="https://web3-albtian.vercel.app/static/meta/ogImage.png"
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
