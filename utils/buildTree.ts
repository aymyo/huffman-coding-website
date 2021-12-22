import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { AnalyzedSymbol } from "../components/HuffmanEncoder";

/* Adapted from https://github.com/kelreel/huffman-javascript */
export function getTree(symbolAndFrequencyArray: Array<AnalyzedSymbol>): RawNodeDatum {
    let arr: RawNodeDatum[] = symbolAndFrequencyArray.map((elem) => ({
        name: elem.char,
        attributes: {
            /* TO FIX: make truncation only to visualize, not to calculate */
            weight: elem.probability //.toFixed(3)
        },
        children: [],
    }));

    let min1;
    let min2;
    let node: RawNodeDatum;
    
    // Until there's only two nodes
    while (arr.length > 2) {
        // Find the smallest nodes and remove them from the array
        min1 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min1), 1);
        min2 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min2), 1);
        
        // Create and add the joint node
        node = createNode(min1, min2);
        arr.push(node);
    }

    return createNode(arr[0], arr[1]);
}

/** Creates a tree node from two nodes. */
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

/** Searches for the node with the smallest weight in the tree */
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

/** Gets the code word for a symbol, using the tree */
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

/** Encodes the text using the code alphabet generated from the tree */
export function huffmanEncode(inputText: string, codeAlphabet: Array<{char: string, code:string | undefined}>): Array<string> {
    const result: Array<string> = [];
    for (let i = 0; i < inputText.length; i++) {
        result.push(codeAlphabet.find((entry) => entry?.char === inputText[i])?.code as string);
    }
    return result;
}
