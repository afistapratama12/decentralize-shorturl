import { http } from "wagmi";
import { arbitrumSepolia, sepolia, monadTestnet, hardhat } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// const projectId = {{REOWN-PROJECT-ID}};
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
const appName = process.env.NEXT_PUBLIC_APP_NAME as string;

// chain showing [arbitrumSepolia, sepolia, monadTestnet] for production, if dev add hardhat
export const config = function () {
  if (process.env.NODE_ENV === 'development') {
    return getDefaultConfig({
      appName: appName,
      projectId: projectId,
      chains: [arbitrumSepolia, sepolia, monadTestnet, hardhat],
      transports: {
        [arbitrumSepolia.id]: http(),
        [sepolia.id]: http(),
        [monadTestnet.id]: http(),
        [hardhat.id]: http(),
      },
      ssr: true,
    })
  } else {
    return getDefaultConfig({
      appName: appName,
      projectId: projectId,
      chains: [arbitrumSepolia, sepolia, monadTestnet],
      transports: {
        [arbitrumSepolia.id]: http(),
        [sepolia.id]: http(),
        [monadTestnet.id]: http(),
      },
      ssr: true,
    })
  }
}()








