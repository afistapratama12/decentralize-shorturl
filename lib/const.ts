export const ARBITRUM_SEPOLIA_CHAIN_ID = 421614;
export const ARBITRUM_SEPOLIA_CHAIN_NAME = 'Arbitrum Sepolia';
export const ARBITRUM_SEPOLIA_CHAIN_ID_HEX = '0xA4B1';
export const ARBITRUM_SEPOLIA_CHAIN_ID_HEX_0x = '0xA4B1';

export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_CHAIN_NAME = 'Sepolia';
export const SEPOLIA_CHAIN_ID_HEX = '0xAA36A7';
export const SEPOLIA_CHAIN_ID_HEX_0x = '0xAA36A7';

export const MONAD_TESTNET_CHAIN_ID = 10143;
export const MONAD_TESTNET_CHAIN_NAME = 'Monad Testnet';
export const MONAD_TESTNET_CHAIN_ID_HEX = '0xA4B2';
export const MONAD_TESTNET_CHAIN_ID_HEX_0x = '0xA4B2';

export const HARDHAT_CHAIN_ID = 31337;
export const HARDHAT_CHAIN_NAME = 'Hardhat';
export const HARDHAT_CHAIN_ID_HEX = '0x7A69';
export const HARDHAT_CHAIN_ID_HEX_0x = '0x7A69';

export const NETWORK_SEPOLIA = "sepolia"
export const NETWORK_ARB_SEPOLIA = "arbitrumSepolia"
export const NETWORK_MONAD_TESTNET = "monadTestnet"
export const NETWORK_HARDHAT = "hardhat"


export type FaucetLink = {
  id: string;
  name: string;
  link: string;
}

export const listFaucetLink: FaucetLink[] = [
  {
    id: "arbitrumSepolia",
    name: "Arbitrum Sepolia",
    link: "https://www.alchemy.com/faucets/arbitrum-sepolia"
  },
  {
    id: "sepolia",
    name: "Ethereum Sepolia",
    link: "https://www.alchemy.com/faucets/ethereum-sepolia"
  },
  {
    id: "monadTestnet",
    name: "Monad Testnet",
    link: "https://testnet.monad.xyz/#getting-started"
  },
  {
    id: "sepoliaPoW",
    name: "ETH Sepolia PoW",
    link: "https://sepolia-faucet.pk910.de/"
  }
]