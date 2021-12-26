## Huffman Coding Online

|  The aim of this project is to provide an interactive web tool to learn about Huffman Coding, along with the information necessary to understand the key concepts.   |
|---|

The project is live and hosted at: https://huffman-coding-online.vercel.app/ 

### How does it work?

In order to encode a text using the Huffman algorhitm, follow these steps:

1. Type the text to encode on the left input
2. Click 'Encode'
3. The text will be analized and the frequency table of the symbols will be generated.
4. The Huffman tree is created from the frequency table
5. The code alphabet is generated from the tree (to learn how, go to the _theory_ section of the website).
6. The input text gets encoded using the alphabet, showing the result in the right text area.
7. Aditional calculations and statistics are computed.

###  Technology

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It is deployed with the [Vercel Platform](https://vercel.com/)

### Run it localy

Download the repository, and install the dependencies ``npm install``. Afterwards, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the prooject.

##### References

This website was developed as part of the Audio Codification Systems course of the Engineering Audiovisual System Degree of Universitat Pompeu Fabra, from Barcelona.
