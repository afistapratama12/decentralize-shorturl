import {
  NETWORK_SEPOLIA,
  NETWORK_ARB_SEPOLIA,
  NETWORK_MONAD_TESTNET,
  NETWORK_HARDHAT,
} from '@/lib/const'

export const rpcUrl = (network: string): string | undefined => {
  switch (network) {
    case NETWORK_SEPOLIA:
      return process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA
    case NETWORK_ARB_SEPOLIA:
      return process.env.NEXT_PUBLIC_RPC_URL_ARB_SEPOLIA
    case NETWORK_MONAD_TESTNET:
      return process.env.NEXT_PUBLIC_RPC_URL_MONAD_TESTNET
    case NETWORK_HARDHAT:
      return process.env.NEXT_PUBLIC_RPC_URL_HARDHAT
    default:
      return undefined
  }
}

export const contractAddress = (network: string): string | undefined => {
  switch (network) {
    case NETWORK_SEPOLIA:
      return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA
    case NETWORK_ARB_SEPOLIA:
      return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ARB_SEPOLIA
    case NETWORK_MONAD_TESTNET:
      return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MONAD_TESTNET
    case NETWORK_HARDHAT:
      return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_HARDHAT
    default:
      return undefined
  }
}

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
export const appName = process.env.NEXT_PUBLIC_APP_NAME as string

export const getEnvCheck = (network: string): {[key: string]: string | undefined} => {
  return {
    rpcUrl: rpcUrl(network),
    contractAddress: contractAddress(network),
  }
}