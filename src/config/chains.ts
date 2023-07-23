export const chains = [
  {
    name: "bsc-testnet",
    description: "BSC Testnet",
    chainId: 4,
    rpc: "https://bsc-testnet.public.blastapi.io",
    legacyGasModel: true,
  },
  {
    name: "mumbai",
    description: "Mumbai",
    chainId: 5,
    rpc: "https://matic-mumbai.chainstacklabs.com",
  },
  {
    name: "avalanche-fuji",
    description: "Avalanche testnet fuji",
    chainId: 6,
    rpc: "https://api.avax-test.network/ext/bc/C/rpc",
  },
  {
    name: "celo-alfajores",
    description: "Celo Testnet",
    chainId: 14,
    rpc: "https://alfajores-forno.celo-testnet.org",
  },
  {
    name: "moonbase-alpha",
    description: "Moonbase Alpha",
    chainId: 16,
    rpc: "https://rpc.testnet.moonbeam.network",
  },
  {
    name: "optimism-goerli",
    description: "Optimism Goerli",
    chainId: 24,
    rpc: "https://ethereum-goerli.publicnode.com",
  },
];

export type ChainInfo = {
  name: string;
  description: string;
  chainId: number;
  rpc: string;
  legacyGasModel?: boolean;
};

export function getChainByName(chainName: string) {
  console.debug("using chain name:", chainName);
  const chain = chains.find((chain: ChainInfo) => chain.name === chainName);
  if (!chain) {
    throw new Error(`Invalid chain name: ${chainName}`);
  }
  return chain;
}
