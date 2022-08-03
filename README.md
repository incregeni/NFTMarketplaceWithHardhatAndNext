<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/elPoeta/nft-marketplace">
    <img src="images/logo.png" alt="Logo" width="300" height="300" style="border-radius:5px">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#metamask">Metamask configuration</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center">

##### Web3 Dapp. Buy, sell, and showcase NFTs, over Polygon ethereum network.

[![Product Name Screen Shot][product-screenshot]](https://poether-nft.vercel.app/)

</div>

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [![Node][node.js]][node-url]
- [![Typescript][typescript.ts]][typescript-url]
- [![Next][next.js]][next-url]
- [![Tailwind][tailwind.css]][tailwind-url]
- [![Solidity][solidity]][solidity-url]
- [![Hardhat][hardhat]][hardhat-url]

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- ###### Enviroment
  - node
    <a href="https://nodejs.org/en/download/" target="_blank">https://nodejs.org/en/download/</a>
- ###### Pacakage manager

  - npm
    <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank">https://docs.npmjs.com/downloading-and-installing-node-js-and-npm</a>
    ###### or
  - yarn
    <a href="https://yarnpkg.com/cli/install" target="_blank">https://yarnpkg.com/cli/install</a>

- ###### Browser
  - Metamask extension
    <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>

### Installation

_Use yarn or npm to install dependencies_

1. Clone the repo

   ```sh
   git clone https://github.com/elPoeta/nft-marketplace.git
   ```

2. Install NPM packages
   ```sh
     yarn install
   ```
   or
   ```sh
     npm install
   ```
3. Clean
   ```sh
   yarn hardhat clean
   ```
   or
   ```sh
   npx hardhat clean
   ```
4. Compile
   ```sh
   yarn hardhat compile
   ```
   or
   ```sh
   npx hardhat compile
   ```
5. Start local ethereum network
   ```sh
   yarn hardhat node
   ```
   or
   ```sh
   npx hardhat node
   ```
6. Deploy contract locally
   ```sh
   hardhat run --network localhost scripts/deploy.ts
   ```
7. Tests
   ```sh
   yarn hardhat test
   ```
   or
   ```sh
   npx hardhat test
   ```
8. Client
   ```sh
   cd client
   ```
9. Install NPM packages

   ```sh
   yarn install
   ```

   or

   ```sh
   npm install
   ```

10. Run
    ```sh
    yarn dev
    ```
    or
    ```sh
    npm run dev
    ```
11. Visit http://localhost:3000 to view your application.

<p align="right">(<a href="#top">back to top</a>)</p>

### Metamask

_Metamask hardhat network configuartion_

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Leonardo Tosetto - leonardo.a.tosetto@gmail.com

Project Link: [https://github.com/elPoeta/nft-marketplace](https://github.com/elPoeta/nft-marketplace)

Demo: [https://poether-nft.vercel.app/](https://poether-nft.vercel.app/)

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/elPoeta/nft-marketplace.svg?style=for-the-badge
[contributors-url]: https://github.com/elPoeta/nft-marketplace/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/elPoeta/nft-marketplace.svg?style=for-the-badge
[forks-url]: https://github.com/elPoeta/nft-marketplace/network/members
[stars-shield]: https://img.shields.io/github/stars/elPoeta/nft-marketplace.svg?style=for-the-badge
[stars-url]: https://github.com/elPoeta/nft-marketplace/stargazers
[issues-shield]: https://img.shields.io/github/issues/elPoeta/nft-marketplace.svg?style=for-the-badge
[issues-url]: https://github.com/elPoeta/nft-marketplace/issues
[license-shield]: https://img.shields.io/github/license/elPoeta/nft-marketplace.svg?style=for-the-badge
[license-url]: https://github.com/elPoeta/nft-marketplace/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/leonardo-tosetto
[product-screenshot]: images/screenshot.gif
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/
[typescript.ts]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=whitehttps://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[solidity]: https://img.shields.io/badge/solidity-%3E%3D%200.8.7-lightgrey
[solidity-url]: https://soliditylang.org/
[hardhat]: https://img.shields.io/badge/hardhat-2.9.9-yellow
[hardhat-url]: https://hardhat.org/
