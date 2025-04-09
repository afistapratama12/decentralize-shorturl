import { http } from "wagmi";
import { arbitrumSepolia, sepolia, hardhat } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

// const projectId = {{REOWN-PROJECT-ID}};
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
const appName = process.env.NEXT_PUBLIC_APP_NAME as string;

// change monadTestnet icon
const monadTestNet = {
  id: 10_143,
  name: 'Monad Testnet',
  iconUrl: 'https://storage.googleapis.com/influencer-272204.appspot.com/public/internal-tools/1732175511490/54777.png',
  // iconBackground: '#fff',
  nativeCurrency: { 
    name: 'Testnet MON Token', 
    symbol: 'MON', 
    decimals: 18 
  },
  rpcUrls: {
    default: { 
      http: ['https://testnet-rpc.monad.xyz'] 
    },
  },
  blockExplorers: {
    default: { 
      name: 'Monad Testnet explorer', 
      url: 'https://testnet.monadexplorer.com' 
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 251449,
    },
  },
  testnet: true
} as const satisfies Chain;

// chain showing [arbitrumSepolia, sepolia, monadTestnet] for production, if dev add hardhat
export const config = function () {
  if (process.env.NODE_ENV === 'development') {
    return getDefaultConfig({
      appName: appName,
      projectId: projectId,
      chains: [arbitrumSepolia, sepolia, monadTestNet, hardhat],
      transports: {
        [arbitrumSepolia.id]: http(),
        [sepolia.id]: http(),
        [monadTestNet.id]: http(),
        [hardhat.id]: http(),
      },
      ssr: true,
    })
  } else {
    return getDefaultConfig({
      appName: appName,
      projectId: projectId,
      chains: [arbitrumSepolia, sepolia, monadTestNet],
      transports: {
        [arbitrumSepolia.id]: http(),
        [sepolia.id]: http(),
        [monadTestNet.id]: http(),
      },
      ssr: true,
    })
  }
}()








