<div align="center">
<img alt="Title: Huffman Online Coding" src="https://user-images.githubusercontent.com/40371955/147412701-0737c7c4-7c0e-4285-9d0a-42a20f4332c3.png">
</div>

| This project aims to provide an interactive web tool to learn about Huffman Coding, along with the information necessary to understand the key concepts. |
|---|

The project is live and hosted at: https://huffman-coding-online.vercel.app/ 

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

---

##### References

This website was developed as part of the Audio Codification Systems course of the Engineering Audiovisual System Degree of Universitat Pompeu Fabra, from Barcelona.

**License:** MIT
