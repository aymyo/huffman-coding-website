import Image from "next/image";
import { FC, useEffect, useState } from "react";

export const Header: FC = () => {
  const [visible, setVisibility] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);

  const checkDisplayMode = () => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any)?.standalone ||
      document.referrer.includes("android-app://");

    setIsStandalone(isStandalone);
    console.log(isStandalone, "STANDALONE?");
  };

  useEffect(() => {
    // Client-side-only code
    checkDisplayMode();
  }, []);

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
        {isStandalone ? (
          <button className="btn mr-2" disabled>
            Local
          </button>
        ) : (
          <button
            className="btn mr-2"
            onClick={() => {
              checkDisplayMode();
              if (!isStandalone) {
                alert(
                  "Hey! If you are using this site often, you can install it as a progressive web app to make it more efficient. Check the information in you browser navigation bar!"
                );
              }
            }}
          >
            online
          </button>
        )}

        <h2 className="text-5xl italic font-bold -mt-2">Coding</h2>
      </hgroup>
    </header>
  );
};
