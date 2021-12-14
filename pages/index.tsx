import type { NextPage } from "next";
import Head from "next/head";
import { Dispatch, FC, SetStateAction, useState } from "react";
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

interface AllCalculations {
  N: number;
  uniqueN: number;
  naiveBits: number;
  huffmanBits: number;
  L: number;
  H: number;
  codeEfficiency: number;
  codeRedundancy: number;
  residualEfficiency: number;
  compressionRatio: number;
}

const HuffmanEncoder: FC = () => {
  const defaultInput = "| Write here the text to encode, or this as a test.";
  const [inputText, setInputText] = useState<string>(defaultInput);
  const [frequencyTable, setFrequencyTable] = useState<AnalyzedSymbol[]>();
  const [huffmanTree, setHuffmanTree] = useState<RawNodeDatum>();
  const [codeAlphabet, setCodeAlphabet] = useState<CodeDefinition[]>();
  const [outputText, setOutputText] = useState<string>("");
  const [allCalculations, setAllCalculations] = useState<AllCalculations>();

  const startEncoding = () => {
    //setting Input
    console.log("Text to Encode:", inputText);

    let textToEncode;
    if (!inputText || inputText.length < 2) {
      textToEncode = defaultInput;
      setInputText(defaultInput);
    } else textToEncode = inputText;

    /* Analyze input
      - Count the number of symbols ✓
      - Get every unique symbol ✓
      - Count the frequency of each one ✓
      - Calculate the probability ✓
      - Build the analysis table ✓
    */
    let inputSymbolsArray = textToEncode.split("");
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

    let outputText = huffmanEncode(textToEncode, codeAlphabet).join("");
    setOutputText(outputText);

    /* Make Calculations
        - N ✓ 
        - uniqueN ✓ 
        - initial bytes  ✓
        - average length L ✓
        - Entropy H
        - Code efficiency
        - Code Redundancy
        - Residual Efficiency
        - Compression Ratio */

    let uniqueN = frequencyTable.length;
    let naiveBits = N * 8;
    let huffmanBits = outputText.length;
    let L = codeAlphabet.reduce(
      (acc, currDefinition, index) =>
        /* L = SUM(li * pi) for all i, where i are the symbols */
        acc +
        (currDefinition.code as string)?.length *
          frequencyTable[index].probability,
      0
    );
    let H = frequencyTable.reduce((acc, currDefinition, index) => {
      /* H = SUM(-pi * log2(pi)) for all i, where i are the symbols */
      let p = currDefinition.probability;
      return acc - p * Math.log2(p);
    }, 0);

    let codeEfficiency = H / L;
    let residualEfficiency = H - L;
    let codeRedundancy = 1 - codeEfficiency;
    let compressionRatio = (huffmanBits / naiveBits) * 100;

    setAllCalculations({
      N,
      uniqueN,
      naiveBits,
      huffmanBits,
      L,
      H,
      codeEfficiency,
      codeRedundancy,
      residualEfficiency,
      compressionRatio,
    });
  };

  return (
    <>
      <InputOutput
        defaultInput={defaultInput}
        inputText={inputText}
        outputText={outputText}
        setInputText={setInputText}
        startEncoding={startEncoding}
      />
      <DecorativeBackground>
        <SymbolFrequencyTable frequencyTable={frequencyTable} />
        <HuffmanTreeWrapper huffmanTree={huffmanTree} />
        <Conclusions calc={allCalculations} />
        <CodeAlphabetTable codeAlphabet={codeAlphabet} />
      </DecorativeBackground>
    </>
  );
};

interface InputOutputProps {
  defaultInput: string;
  inputText: string;
  outputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  startEncoding: () => void;
}

const InputOutput: FC<InputOutputProps> = ({
  defaultInput,
  inputText,
  outputText,
  setInputText,
  startEncoding,
}) => {
  return (
    <div className="full-container bg-primary h-40 flex items-center justify-center text-light font-serif">
      <div className="grow">
        <label htmlFor="inputText" className="text-xs italic">
          Text to encode
        </label>
        <textarea
          id="inputText"
          className="textarea w-full"
          value={inputText === defaultInput ? "" : inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={defaultInput}
        ></textarea>
      </div>
      <button
        className="btn-light text-xl px-8 mx-8"
        onClick={() => startEncoding()}
      >
        Encode
      </button>
      <div className="grow">
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
  );
};

const DecorativeBackground: FC = ({ children }) => {
  return (
    <div className="bg-light text-primary">
      <div className="h-10 bg-primary bg-tess-1-light bg-repeat-x bg-center"></div>
      <div className="h-10 bg-tess-2-primary bg-repeat-x bg-center"></div>
      <div className="full-container py-4 flex gap-4 flex-wrap">{children}</div>
      <div className="h-10 bg-tess-1-primary bg-repeat-x bg-center"></div>
      <div
        id="huffman-theory"
        className="h-10 bg-primary bg-tess-2-light bg-repeat-x bg-center"
      ></div>
    </div>
  );
};

const SymbolFrequencyTable: FC<{ frequencyTable?: AnalyzedSymbol[] }> = ({
  frequencyTable,
}) => {
  if (!frequencyTable) return <></>;
  return (
    <section className="w-40 grow-0">
      <h3 className="font-serif italic font-bold text-xl mb-2">Frequency</h3>
      <table className="table w-full text-xs">
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
  );
};

const HuffmanTreeWrapper: FC<{ huffmanTree?: RawNodeDatum }> = ({
  huffmanTree,
}) => {
  if (!huffmanTree) return <></>;
  return (
    <section className="w-96 h-96 grow shrink-0 basis-2/3">
      <h3 className="font-serif italic font-bold text-xl mb-2">Huffman Tree</h3>
      <div
        id="treeWrapper"
        className="border h-80 border-primary rounded-xl border-dotted font-serif italic font-light"
      >
        <Tree
          data={huffmanTree}
          separation={{ nonSiblings: 2, siblings: 1 }}
          pathClassFunc={() => "link__custom"}
          orientation="vertical"
          pathFunc="diagonal"
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
        />
      </div>
    </section>
  );
};

interface CodeDefinition {
  char: string;
  code: string | undefined;
}
interface CodeAlphabetProps {
  codeAlphabet?: CodeDefinition[];
}
const CodeAlphabetTable: FC<CodeAlphabetProps> = ({ codeAlphabet }) => {
  if (!codeAlphabet) return <></>;
  return (
    <section className="grow-0">
      <h3 className="font-serif italic font-bold text-xl mb-2">
        Code Alphabet
      </h3>
      <table className="table w-full text-xs">
        <thead>
          <tr>
            <th>char</th>
            <th>code</th>
          </tr>
        </thead>
        <tbody>
          {codeAlphabet.map((item) => {
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
  );
};

const Conclusions: FC<{ calc?: AllCalculations }> = ({ calc }) => {
  if (!calc) return <></>;
  return (
    <section className="w-96 grow calculations">
      <h3 className="font-serif italic font-bold text-xl mb-2">Calculations</h3>
      <div className="w-full border border-primary rounded-xl border-dotted px-2 py-1 text-dark">
        <p>
          The input text has
          <b>N={calc.N} symbols</b>
          of which
          <b>{calc.uniqueN} are unique.</b>
          After computing the probability of each and building the tree, we can
          use it to fill the alphabet table with every encoded symbol. Then, we
          just have to swap each symbol for its binary result, and we get our
          encoded string.
          <br />
          With the obtained table we can compute the average length of the code
          words,
        </p>
        <li>Average Length, L = {calc.L.toFixed(3)} bits</li>
        <p>
          Which is very close to the minimum, defined by the Shannon Entropy,
        </p>
        <li>Entropy, H = {calc.H.toFixed(3)} bits/symbol.</li>
        <p>Other conclusions we can obtain are:</p>
        <li>Code Efficiency: η = H/L = {calc.codeEfficiency.toFixed(3)}</li>
        <li>
          Residual Efficiency: τ = H - L = {calc.residualEfficiency.toFixed(3)}
        </li>
        <li>Code Redundancy: r = 1 - η = {calc.codeRedundancy.toFixed(3)}</li>
        <p>
          If we would have encoded the text naively, it would have weighted{" "}
          <b>{calc.naiveBits} bits</b>. On the other hand, with Huffman is{" "}
          <b>{calc.huffmanBits} bits.</b> Therefore, we can calculate its
          compression ratio:
        </p>
        <li>
          Compression Ratio: 182/408 bits = {calc.compressionRatio.toFixed(3)}%
        </li>
        <p className="text-xs mt-4">
          <b>Note:</b> Values are truncated to 3 decimals for visualization
          purposes.
        </p>
      </div>
    </section>
  );
};
