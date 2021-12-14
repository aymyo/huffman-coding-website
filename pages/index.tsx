import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Theory } from "../components/Theory";
import { HuffmanEncoder } from "../components/HuffmanEncoder";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Huffman Coding Online</title>
      </Head>
      <Header />
      <HuffmanEncoder />
      <Theory />
      <Footer />
    </>
  );
};
export default Home;
