/* https://github.com/kelreel/huffman-javascript */

import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { AnalyzedSymbol } from "../pages";

export function getTree(symbolAndFrequencyArray: Array<AnalyzedSymbol>): RawNodeDatum {
    let arr: RawNodeDatum[] = symbolAndFrequencyArray.map((elem) => ({
        name: elem.char,
        attributes: {
            /* TO FIX: make truncation only to visualize, not to calculate */
            weight: elem.probability.toFixed(3)
        },
        children: [],
    }));

    let min1;
    let min2;
    let node: RawNodeDatum;

    while (arr.length > 2) {
        min1 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min1), 1);
        min2 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min2), 1);

        node = createNode(min1, min2);
        arr.push(node);
    }

    return createNode(arr[0], arr[1]);
}

/** CREATE TREE NODE FROM TWO NODES */
function createNode(node1: RawNodeDatum, node2: RawNodeDatum): RawNodeDatum {
    if(!node1.attributes?.weight || !node2.attributes?.weight) {
       throw new Error('Error Encoding'); 
    }

    const weight: number = +node1.attributes?.weight + +node2.attributes?.weight;
    const name: string = node1.name.concat(node2.name);
    const children: Array<RawNodeDatum> = [node1, node2];
    return {
        name,
        attributes: {
            weight: weight
        },
        children,
    };
}

/** SEARCH NODE WITH MINIMAL WEIGHT IN TREE */
function searchMinWeightNode(arr: Array<RawNodeDatum>, minNumber = -1): RawNodeDatum {
    let min = 1;
    let result: RawNodeDatum = {name: '',
        attributes: {
            weight: 0
        },
        children: []
    };
    let currentWeight;

    for (let i = 0; i < arr.length; i++) {
        currentWeight = arr[i].attributes?.weight as number;
        
        if (currentWeight <= min && currentWeight >= minNumber) {
            min = currentWeight;
            result = arr[i];
        }
    }
    return result;
}


export function getSymbolCode(tree: RawNodeDatum, symbol: string, code = ''): string | undefined {
    let arr: RawNodeDatum[];
    if (typeof tree.children === undefined) {
        return code;
    } else {
        arr = tree.children as RawNodeDatum[];
    }

    if (arr[0].name.length === 1 && arr[0].name[0] === symbol) return code + 0;

    if (arr[0].name.length === 1 && arr[0].name[0] !== symbol) {
        if (arr[1].name.length === 1 && arr[1].name[0] === symbol) return code + 1;
        if (arr[1].name.includes(symbol) === true)
            return getSymbolCode(arr[1], symbol, code + 1);
    }

    if (arr[1].name.length === 1 && arr[1].name[0] === symbol) return code + 1;
    if (arr[1].name.length === 1 && arr[1].name[0] !== symbol) {
        if (arr[0].name.length === 1 && arr[0].name[0] === symbol) return code + 0;
        if (arr[0].name.includes(symbol) === true)
            return getSymbolCode(arr[0], symbol, code + 0);
    }

    if (arr[0].name.length >= 2 && arr[0].name.includes(symbol))
        return getSymbolCode(arr[0], symbol, code + 0);
    if (arr[1].name.length >= 2 && arr[1].name.includes(symbol))
        return getSymbolCode(arr[1], symbol, code + 1);
}

/** GET name FREQUENCY FROM TEXT */
export function getFrequency(text: string): [string, number][] {
    const freq: Map<string, number> = new Map();

    for (let i = 0; i < text.length; i++) {
        let counter = 0;
        for (let j = 0; j < text.length; j++) {
            if (!freq.has(text[i])) {
                if (text[i] === text[j] && i !== j) {
                    counter++;
                }
            }
        }
        if (!freq.has(text[i])) {
            freq.set(text[i], counter + 1);
        }
    }

    return Array.from(freq).sort((a, b) => b[1] - a[1]); //Descending sort
}

/** ENCODE TEXT */
export function huffmanEncode(inputText: string, codeAlphabet: Array<{char: string, code:string | undefined}>): Array<string> {
    const result: Array<string> = [];
    for (let i = 0; i < inputText.length; i++) {
        result.push(codeAlphabet.find((entry) => entry?.char === inputText[i])?.code as string);
    }
    return result;
}
