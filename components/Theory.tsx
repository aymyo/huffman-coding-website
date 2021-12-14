/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";

export const Theory: FC = () => {
  return (
    <div className="bg-primary text-light py-12 px-2 flex flex-col items-center">
      <section className="font-light max-w-2xl text-justify text-sm pb-8">
        <h3
          id="huffman-theory"
          className="font-serif italic text-2xl text-center mb-4"
        >
          What is Huffman Coding?
        </h3>
        <p className="mb-2">
          Before we get started, let's quickly discuss what exactly Huffman
          coding is. When we transmit information, we generally need to convert
          some sort of data (text, pictures, etc.) into binary. To do this, we
          assign codes to help us distinguish between different pieces of data.
        </p>
        <p className="mb-2">
          For example, if we had the string "abca", we might assign codes like:
          = 00, = 01, = 10. This would make it so that our binary encoding of
          "abca" is "00 01 10 00". Huffman coding is a lossless data compression
          algorithm that assigns variable-length codes based on the frequencies
          of our input characters. In order to determine what code to assign to
          each character, we will first build a binary tree that will organize
          our characters based on frequency.
        </p>
        <p className="mb-2">
          Huffman coding is a lossless data compression algorithm that assigns
          variable-length codes based on the frequencies of our input
          characters. In order to determine what code to assign to each
          character, we will first build a binary tree that will organize our
          characters based on frequency.
        </p>
      </section>
      <div className="flex gap-16">
        <section className="font-light max-w-2xl text-justify text-sm ">
          <h3 className="font-serif italic text-2xl text-center mb-4">
            A bit of history
          </h3>
          <p className="mb-2">
            Before we get started, let's quickly discuss what exactly Huffman
            coding is. When we transmit information, we generally need to
            convert some sort of data (text, pictures, etc.) into binary. To do
            this, we assign codes to help us distinguish between different
            pieces of data.
          </p>
        </section>
        <section className="font-light max-w-2xl text-justify text-sm ">
          <h3 className="font-serif italic text-2xl text-center mb-4">
            A bit of history
          </h3>
          <p className="mb-2">
            Before we get started, let's quickly discuss what exactly Huffman
            coding is. When we transmit information, we generally need to
            convert some sort of data (text, pictures, etc.) into binary. To do
            this, we assign codes to help us distinguish between different
            pieces of data.
          </p>
        </section>
      </div>
    </div>
  );
};
