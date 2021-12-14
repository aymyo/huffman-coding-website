import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/inria-sans"; // Defaults to weight 400 with normal variant.
import "@fontsource/inria-sans/300.css"; // 400-italic
import "@fontsource/inria-serif"; // Defaults to weight 400 with normal variant.
import "@fontsource/inria-serif/700-italic.css"; // 700-italic
import "@fontsource/inria-serif/400-italic.css"; // 400-italic

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
