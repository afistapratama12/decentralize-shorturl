import { 
  ARBITRUM_SEPOLIA_CHAIN_ID, 
  MONAD_TESTNET_CHAIN_ID, 
  NETWORK_ARB_SEPOLIA, 
  NETWORK_MONAD_TESTNET, 
  NETWORK_SEPOLIA, 
  SEPOLIA_CHAIN_ID 
} from "./const"

export const unAllowChainID = (chainID: number): boolean => {
  return (SEPOLIA_CHAIN_ID !== chainID && 
    ARBITRUM_SEPOLIA_CHAIN_ID !== chainID && 
    MONAD_TESTNET_CHAIN_ID !== chainID)
}

export const getNetworks = (chainID: number): string => {
  switch (chainID) {
    case SEPOLIA_CHAIN_ID:
      return NETWORK_SEPOLIA
    case ARBITRUM_SEPOLIA_CHAIN_ID:
      return NETWORK_ARB_SEPOLIA
    case MONAD_TESTNET_CHAIN_ID:
      return NETWORK_MONAD_TESTNET
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