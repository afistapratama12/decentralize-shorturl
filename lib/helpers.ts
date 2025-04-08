import { 
  ARBITRUM_SEPOLIA_CHAIN_ID, 
  HARDHAT_CHAIN_ID, 
  MONAD_TESTNET_CHAIN_ID, 
  NETWORK_ARB_SEPOLIA, 
  NETWORK_HARDHAT, 
  NETWORK_MONAD_TESTNET, 
  NETWORK_SEPOLIA, 
  SEPOLIA_CHAIN_ID 
} from "@/lib/const"

export const unAllowChainID = (chainID: number): boolean => {
  return (SEPOLIA_CHAIN_ID !== chainID && 
    ARBITRUM_SEPOLIA_CHAIN_ID !== chainID && 
    MONAD_TESTNET_CHAIN_ID !== chainID &&
    HARDHAT_CHAIN_ID !== chainID)
}

export const getNetworks = (chainID: number): string => {
  switch (chainID) {
    case SEPOLIA_CHAIN_ID:
      return NETWORK_SEPOLIA
    case ARBITRUM_SEPOLIA_CHAIN_ID:
      return NETWORK_ARB_SEPOLIA
    case MONAD_TESTNET_CHAIN_ID:
      return NETWORK_MONAD_TESTNET
    case HARDHAT_CHAIN_ID:
      return NETWORK_HARDHAT
    default:
      return ""
  }
}

export function randomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function checkURL(url: string): boolean {
  try {
    if (!url) throw new Error('URL is required');

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('Invalid URL');
    }

    new URL(url);
    
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('error checkURL:', error.message);
    }

    return false;
  }
}

export function urlPath(baseUrl: string, chainId: number) : string {
  switch (chainId) {
    case SEPOLIA_CHAIN_ID:
      return baseUrl
    case ARBITRUM_SEPOLIA_CHAIN_ID:
      return baseUrl + "/a/"
    case MONAD_TESTNET_CHAIN_ID:
      return baseUrl + "/m/"
    case HARDHAT_CHAIN_ID:
      return baseUrl + "/h/"
    default:
      return ""
  }
}

export function getNewLink(baseUrl: string, shortCode: string, chainId: number): string {
  const url = urlPath(baseUrl, chainId)
  return url + shortCode
}