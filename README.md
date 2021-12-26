<div align="center">
<img alt="Title: Huffman Online Coding" src="https://user-images.githubusercontent.com/40371955/147412701-0737c7c4-7c0e-4285-9d0a-42a20f4332c3.png">
</div>

| This project consists of an interactive web tool to learn about Huffman Coding, backed with theory to understand its key concepts. |
|---|

The website is live and hosted at: https://huffman-coding-online.vercel.app/ 

## How does it work?

To encode a text using the Huffman algorithm, follow these steps:

1. Type the text to encode on the left input
2. Click 'Encode'
3. The text will be analyzed and the frequency table of the symbols will be generated.
4. The Huffman tree is created from the frequency table
5. The code alphabet is generated from the tree (to learn how go to the _theory_ section of the website).
6. The input text gets encoded using the alphabet, showing the result in the right text area.
7. Aditional calculations and statistics are computed.

##  Technology

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It is deployed with the [Vercel Platform](https://vercel.com/). The following libraries have been used:

- [TailwindCSS](https://tailwindcss.com/)
- [react-d3-tree](https://github.com/bkrem/react-d3-tree)
- [next-pwa](https://github.com/shadowwalker/next-pwa)

### Run it locally

Download the repository, and install the dependencies ``npm install``. Afterward, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

## Design

You can find a hi-fi mockup design using Figma [here](https://www.figma.com/proto/TaNiNA46d7FmgJKxMaQCfi/Web---Huffman?node-id=542%3A427&scaling=scale-down-width&page-id=317%3A215&starting-point-node-id=542%3A427&hide-ui=1). 

As a curiosity, David A. Huffman, the author of the algorithm with his name, was also a pioneer in mathematical origami.The decorations of this page are inspired by the [diagrams of his models](https://erikdemaine.org/papers/Huffman_Origami5/paper.pdf).


<div align="center">
<img width="420" alt="Huffman origami diagrams" src="https://user-images.githubusercontent.com/40371955/147413381-b7cd59be-cf0c-4cac-b68c-1f913db4639c.png">
</div>

---

#### References
Tipography: [Inria Sans & Inria Serif](https://github.com/BlackFoundryCom/InriaFonts)

This website was developed as part of the Audio Codification Systems course of the Audiovisual Systems Engineering Degree at Universitat Pompeu Fabra, Barcelona.

**License:** MIT
