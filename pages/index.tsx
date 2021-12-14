import type { NextPage } from "next";
import Head from "next/head";
import { FC, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Theory } from "../components/Theory";
import { getSymbolCode, getTree, huffmanEncode } from "../utils/buildTree";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";

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

export interface AnalyzedSymbol {
  char: string;
  quantity: number;
  probability: number;
}

const HuffmanEncoder: FC = () => {
  const defaultInput = "| Write here the text to encode, or this as a test.";
  const [inputText, setInputText] = useState<string>(defaultInput);
  const [frequencyTable, setFrequencyTable] = useState<AnalyzedSymbol[]>([]);
  const [huffmanTree, setHuffmanTree] = useState<RawNodeDatum>();
  const [codeAlphabet, setCodeAlphabet] = useState<
    {
      char: string;
      code: string | undefined;
    }[]
  >();
  const [outputText, setOutputText] = useState<string>("");

  const HuffmanEncoding = () => {
    //setting Input
    if (!inputText) setInputText(defaultInput);
    console.log("Text to Encode:", inputText);

    /* Analyze input
      - Count the number of symbols ✓
      - Get every unique symbol ✓
      - Count the frequency of each one ✓
      - Calculate the probability ✓
      - Build the analysis table ✓
    */

    const inputSymbolsArray = inputText.split("");
    console.log("arrayOfSymbols: ", inputSymbolsArray);

    const N: number = inputSymbolsArray.length;

    const countedUniqueArray = inputSymbolsArray.reduce(
      (accumulated: Array<[string, number]>, currentChar) => {
        let currentCharIndex = accumulated.findIndex((element) => {
          return element[0] === currentChar;
        });
        let isCharAlreadyFound = currentCharIndex !== -1;

        if (isCharAlreadyFound) {
          accumulated[currentCharIndex][1] += 1;
          return accumulated;
        } else {
          return accumulated.concat([[currentChar, 1]]);
        }
      },
      []
    );

    //console.log("analyzedArray:", countedUniqueArray); // [['h',11],['a',3],...]

    const frequencyTable = countedUniqueArray
      .map((symbol) => {
        return {
          char: symbol[0],
          quantity: symbol[1],
          probability: symbol[1] / N,
        };
      })
      .sort((a, b) => b.quantity - a.quantity);

    //console.table(frequencyTable);

    setFrequencyTable(frequencyTable);

    /* Build tree
       - Iterate and join the lowest probability nodes ✓
       - Represent tree ✓
    */
    let huffmanTree = getTree(frequencyTable);
    setHuffmanTree(huffmanTree);

    console.log(huffmanTree);

    /* Encode symbols  
       - Follow tree to get all code words ✓
    */

    let codeAlphabet = frequencyTable.map((symbol) => {
      return {
        char: symbol.char,
        code: getSymbolCode(huffmanTree, symbol.char),
      };
    });

    setCodeAlphabet(codeAlphabet);

    /* Encode text  ✓*/

    let outputText = huffmanEncode(inputText, codeAlphabet).join("");
    setOutputText(outputText);

    /* Make Calculations  */
  };

  return (
    <>
      <div className="px-2 bg-primary h-40 flex items-center justify-center text-light font-serif">
        <div>
          <label htmlFor="inputText" className="text-xs italic">
            Text to encode
          </label>
          <textarea
            id="inputText"
            className="textarea w-full"
            onChange={(e) => setInputText(e.target.value)}
            placeholder={defaultInput}
          ></textarea>
        </div>
        <button
          className="btn-light text-xl px-8 mx-8"
          onClick={() => HuffmanEncoding()}
        >
          Encode
        </button>
        <div>
          <label htmlFor="outputText" className="text-xs italic">
            Encoded text
          </label>
          <textarea
            id="outputText"
            disabled
            value={outputText}
            className="textarea w-full border-dotted"
          ></textarea>
        </div>
      </div>
      <div className="bg-light text-primary">
        <div className="h-10 bg-primary bg-tess-1-light bg-repeat-x bg-center"></div>
        <div className="h-10 bg-tess-2-primary bg-repeat-x bg-center"></div>
        <div className="py-8 px-2 flex gap-4 flex-wrap">
          <section className="w-56">
            <h3 className="font-serif italic font-bold text-2xl mb-4">
              Symbol frequency
            </h3>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>char</th>
                  <th>quant</th>
                  <th>p</th>
                </tr>
              </thead>
              <tbody>
                {frequencyTable.map((item) => {
                  return (
                    <tr key={item.char}>
                      <td>{item.char}</td>
                      <td>{item.quantity}</td>
                      <td>{item.probability.toFixed(3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <section className="w-auto">
            <h3 className="font-serif italic font-bold text-2xl mb-4">
              Huffman Tree
            </h3>
            <div
              id="treeWrapper"
              className="w-full h-full border border-primary rounded-xl border-dotted"
            >
              {huffmanTree ? (
                <Tree
                  data={huffmanTree}
                  rootNodeClassName="node__root"
                  branchNodeClassName="node__branch"
                  leafNodeClassName="node__leaf"
                />
              ) : (
                ""
              )}
            </div>
          </section>
          <section>
            <h3 className="font-serif italic font-bold text-2xl mb-4">
              Code Alphabet
            </h3>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>char</th>
                  <th>code</th>
                </tr>
              </thead>
              <tbody>
                {codeAlphabet?.map((item) => {
                  return (
                    <tr key={item.char}>
                      <td>{item.char}</td>
                      <td>{item.code}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <section className="w-96">
            <h3 className="font-serif italic font-bold text-2xl mb-4">
              Calculations
            </h3>
            <div className="w-full border border-primary rounded-xl border-dotted px-2 py-1 text-dark">
              <p>
                The input text has
                <b className="font-serif italic font-bold mx-1">
                  N={inputText.length} symbols
                </b>
                of which
                <b className="font-serif italic font-bold mx-1">
                  {frequencyTable.length} are unique.
                </b>
                After computing the probability of each and building the tree ,
                we can read it to fill the alphabet table with every encoded
                symbol. Then, we just have to swap each symbol for its binary
                result, and we get our encoded string.
                <br />
                With this table we can compute the average length,
              </p>
              <li className="font-serif italic font-bold mx-1">
                Average Length, L = {/*averageLength*/} bits
              </li>
              <p>
                Which is very close to the minimum, defined by the Shannon
                Entropy,
              </p>
              <li className="font-serif italic font-bold mx-1">
                Entropy, H = [formula] = {/* shannonEntropy */} bits/symbol.
              </li>
              <p>Other conclusions we can obtain are:</p>
              <li className="font-serif italic font-bold mx-1">
                Code Efficiency: /eta = H/L = {/* codeEfficiency */}
              </li>
              <li className="font-serif italic font-bold mx-1">
                Residual Efficiency: /tau = H - L = {/* residualEfficiency */}
              </li>
              <li className="font-serif italic font-bold mx-1">
                Code Redundancy: r = 1 - /tau = {/* codeRedundancy */}
              </li>
              <li className="font-serif italic font-bold mx-1">
                Compression Ratio: 182/408 bits = {/* compressionRatio */}%
              </li>
            </div>
          </section>
        </div>
        <div className="h-10 bg-tess-1-primary bg-repeat-x bg-center"></div>
        <div className="h-10 bg-primary bg-tess-2-light bg-repeat-x bg-center"></div>
      </div>
    </>
  );
};
