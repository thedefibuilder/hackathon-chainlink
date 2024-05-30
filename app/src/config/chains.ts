import {
  type Chain,
  arbitrumSepolia,
  bscTestnet,
  gnosisChiado,
  lineaTestnet,
  polygonMumbai,
  sepolia,
} from "viem/chains";

export type TChain = {
  name: string;
  logo: string;
  network: Chain;
};

export const chainsConfig: TChain[] = [
  {
    name: "Arbitrum Sepolia",
    logo: "https://pbs.twimg.com/profile_images/1653532864309239810/ZjT_zBAS_400x400.png",
    network: arbitrumSepolia,
  },
  {
    name: "BNB Chain Testnet",
    logo: "https://pbs.twimg.com/profile_images/1565354861616832513/ovh5FyDN_400x400.png",
    network: bscTestnet,
  },
  {
    name: "Ethereum Sepolia",
    logo: "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png",
    network: sepolia,
  },
  {
    name: "Gnosis Chiado",
    logo: "https://pbs.twimg.com/profile_images/1603829076346667022/6J-QZXPB_400x400.jpg",
    network: gnosisChiado,
  },
  {
    name: "Linea Goerli",
    logo: "https://pbs.twimg.com/profile_images/1639402103486521344/erDLnbwE_400x400.jpg",
    network: lineaTestnet,
  },
  {
    name: "Polygon Mumbai",
    logo: "https://pbs.twimg.com/profile_images/1781425963265327104/TB5fMI9O_400x400.jpg",
    network: polygonMumbai,
  },
];

export const wagmiChains = chainsConfig.map((chain) => chain.network) as [
  Chain,
  ...Chain[],
];
