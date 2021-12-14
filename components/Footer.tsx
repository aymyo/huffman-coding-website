/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-primary text-light pt-4">
      <div
        id="about-huffman-site"
        className="h-44 bg-tesselation-3-pattern bg-repeat-x animation-wave"
      ></div>
      <div className="full-container flex flex-col py-8 mb-4 font-light text-justify text-sm items-center">
        <h3 className="font-serif italic text-2xl text-center mb-4">
          About this site
        </h3>
        <section className="max-w-2xl w-80 mb-2">
          <p>
            The objective of this project is to provide an interactive web tool
            to learn about Huffman Coding, along with the information necessary
            to understand the key concepts.
          </p>
          <p className="mt-2">
            This website was developed as part of the Audio Codification Systems
            course of the Engineering Audiovisual System Degree of{" "}
            <i>Universitat Pompeu Fabra</i>, from Barcelona.
          </p>
        </section>
        <section className="max-w-2xl mt-4 leading-tight text-sm">
          <h3 className="font-serif italic mb-2">References</h3>
          <small>
            [1]: Stephens, Tim; Burns, Jim (October 11, 1999).
            <a
              href="https://web.archive.org/web/20110716161810/http://www1.ucsc.edu/currents/99-00/10-11/huffman.html"
              target="_blank"
              className="link mx-1"
              rel="noreferrer"
            >
              "Eminent UCSC computer scientist David Huffman dies at age 74"
            </a>
            . Currents Online. University of California, Santa Cruz. Archived
            from the original on July 16, 2011. Accessed 14 December 2021.
            <br />
          </small>
          <small>
            [2]: (September 1991).
            <a
              href="http://www.huffmancoding.com/my-uncle/scientific-american"
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              "Profile: Information Theorist David A. Huffman"
            </a>
            . Scientific American. Vol. 265 no. 3. Nature Publishing Group. pp.
            54–58. Accessed 14 December 2021. <br />
          </small>
          <small>
            [3]: Barbay, J., 2019.
            <a
              href="https://www.proquest.com/docview/2545919992"
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              Optimal Prefix Free Codes with Partial Sorting. Algorithms
            </a>
            , [online] 13(1), p.12. Accessed 14 December 2021. <br />
          </small>
          <small>
            [4]: Davis, E., Demaine, E., Demaine, M. and Ramseyer, J., 2013.
            <a
              href="https://erikdemaine.org/papers/Huffman_Origami5/paper.pdf"
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              Reconstructing David Huffman's Origami Tessellations
            </a>
            . Journal of Mechanical Design, [online] 135(11). Accessed 4
            December 2021.
            <br />
          </small>
          <small>
            [5]: Rodríguez Herrera, J. and González Ruiz, V., 2016.
            <a
              href="https://w3.ual.es/~vruiz/Docencia/Apuntes/Coding/Text/03-symbol_encoding/04-arithmetic_coding/index.html"
              target="_blank"
              className="link"
              rel="noreferrer"
            >
              Arithmetic coding.
            </a>
            [online] W3.ual.es. Available at: Accessed 14 December 2021.
          </small>
        </section>
      </div>
      <div className="h-10 bg-primary bg-tess-2-light bg-repeat-x bg-center"></div>
      <section className="flex justify-center items-center text-xs pb-6 pt-6 font-serif italic">
        <p>Developed by</p>
        <Link href="https://github.com/aymyo">
          <a target="_blank" className="btn-light text-xs font-base mx-2 mb-1">
            @aymyo
          </a>
        </Link>
        <p>from Barcelona in 2021</p>
      </section>
    </footer>
  );
};
