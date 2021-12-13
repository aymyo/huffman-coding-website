import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HuffmanEncoder />
      <Footer />
    </>
  );
};

export default Home;

const HuffmanEncoder: FC = () => {
  return (
    <main className="font-serif text-light">
      <div className="bg-primary">Tool</div>
      <div className="bg-light text-primary">Calculations</div>
      <div className="bg-primary">Theory</div>
    </main>
  );
};

const Footer: FC = () => {
  return (
    <footer className="bg-primary text-light pt-4">
      <div className="h-44 bg-tesselation-3-pattern bg-repeat-x animation-wave"></div>
      <div className="flex justify-center items-center text-xs pb-6 pt-5 font-serif italic">
        <p>Developed by</p>
        <Link href="https://github.com/aymyo">
          <a target="_blank" className="btn-light text-xs font-base ml-1 mb-1">
            @aymyo
          </a>
        </Link>
      </div>
    </footer>
  );
};

const Header: FC = () => {
  const [visible, setVisibility] = useState(true);
  return (
    <header className="font-serif bg-primary text-light flex flex-col items-center">
      <nav className="flex items-center p-2">
        <button
          className="hover:animate-pulse hover:rotate-45 transition-transform ease-in-out"
          onClick={() => setVisibility(true)}
        >
          <Image
            src="/img/inflated-vertex.svg"
            width="32px"
            height="32px"
            alt="Menu icon"
          />
        </button>
        <nav className="flex items-center justify-between w-40 ml-4 mb-2">
          <a href="#encoding-tool" className="link">
            tool
          </a>
          <a href="#huffman-theory" className="link">
            theory
          </a>
          <a href="#about-huffman-site" className="link">
            about
          </a>
        </nav>
      </nav>
      <h1 className="italic font-bold text-7xl pt-8">Huffman</h1>
      <hgroup className="flex items-center ml-6 pb-8 pt-1">
        <button className="btn mr-2">online</button>
        <h2 className="text-5xl italic font-bold -mt-2">Coding</h2>
      </hgroup>
    </header>
  );
};
