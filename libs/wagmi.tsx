import { http } from "wagmi";
import { arbitrumSepolia, sepolia, monadTestnet } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// const projectId = {{REOWN-PROJECT-ID}};
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
const appName = process.env.NEXT_PUBLIC_APP_NAME as string;

export const config = getDefaultConfig({
  appName: appName,
  projectId: projectId,
  chains: [arbitrumSepolia, sepolia, monadTestnet],
  transports: {
    [arbitrumSepolia.id]: http(),
    [sepolia.id]: http(),
    [monadTestnet.id]: http(),
  },
  ssr: true,
});
