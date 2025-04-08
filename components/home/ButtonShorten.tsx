import { JsonRpcSigner } from "ethers";
import { Button } from "@/components/ui/button";

import { getSignerContract } from "@/lib/contract";
import { checkURL, getNetworks, getNewLink, unAllowChainID } from "@/lib/helpers";

export type ButtonShortenProps = {
  chainId: number;
  isConnected: boolean;
  signer: JsonRpcSigner | null,
  shortCode: string,
  longUrl: string,
  status: string,
  setStatus: (status: string) => void;
  setGeneratedLink: (link: string) => void;
}

export default function ButtonShorten({
  chainId,
  isConnected,
  signer,
  shortCode,
  longUrl,
  status,
  setStatus,
  setGeneratedLink
}: ButtonShortenProps) {
  
  async function shortenURL() {
    console.log('Starting shortenURL function...');
    setStatus('');

    if (!isConnected) {
      alert('Please connect your wallet first.');
      return;
    }

    if (unAllowChainID(chainId)) {
      alert('Please switch to the ETH sepolia or Arbitrum Sepolia testnet in your wallet.');
      return;
    }

    if (!shortCode || !longUrl) {
      alert('Please enter both a short code and a long URL.');
      return;
    }

    if (shortCode.length < 4) {
      alert('Short code must be at least 4 characters long.');
      return;
    }

    if (!checkURL(longUrl)) {
      alert('Please enter a valid URL.');
      return;
    }

    if (!signer) {
      console.error('No signer available');
      alert('No signer available. Please ensure your wallet is connected.');
      return;
    }

    try {
      setStatus('Transaction pending...');
      console.log('Getting contract instance...');
      const contract = getSignerContract(signer, getNetworks(chainId));

      const tx = await contract.setURL(shortCode, longUrl);
      console.log('Transaction sent. Hash:', tx.hash);
      setStatus(`Transaction sent. Hash: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      setGeneratedLink(getNewLink(window.location.origin, shortCode, chainId));
      setStatus('Transaction successful!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Detailed error in shortenURL:', error);

        if (error.message.includes('already exists')) {
          alert('Short code already exists. Please choose a different code or network.');
          setStatus('already exists');
        } else {
          setStatus(`Error occurred: ${error.message || 'Unknown error'}`);
        }
      }
    }
  }

  return <>
    <Button
      onClick={shortenURL}
      // className={`rounded-md text-sm flex w-full justify-center border border-transparent px-4 py-2 font-medium ${
      //   isConnected && !status.includes('Transaction pending')
      //     ? 'bg-blue-600 text-white hover:bg-yellow-dark-10 focus:outline-none focus:ring-2 focus:ring-yellow-dark-9 focus:ring-offset-2'
      //     : 'bg-blue-900 cursor-not-allowed text-gray-dark-1'
      // }`}

      className={
        `w-full font-bold rounded-lg text-white shadow-md cursor-pointer ` +
        `h-12 text-md ${status.includes('Transaction pending') ? 
          `bg-blue-600`
          : `hover:bg-blue-600 bg-blue-500`
        }`
      }
      disabled={!isConnected || status.includes('Transaction pending')}
    >
      {
        !isConnected ? "Please Connect Wallet" :
          status.includes('Transaction pending')
            ? 'Processing...'
            : 'Shorten URL'}
    </Button>
  </>

}