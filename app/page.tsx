'use client'

import useHomeHooks from "@/hooks/home.hooks";
import { ARBITRUM_SEPOLIA_CHAIN_ID, MONAD_TESTNET_CHAIN_ID } from "@/libs/const";
import { getSignerContract } from "@/libs/contract";
import { getNetworks, randomString, unAllowChainID } from "@/libs/helpers";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from "react";

export default function URLShortenerApp() {
  const {
    address,
    isConnected,
    signer,
    chainId,
    status,
    setStatus,
  } = useHomeHooks();

  const [shortCode, setShortCode] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

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

    // checking if the longUrl is a valid URL
    try {
      new URL(longUrl);
    } catch (error) {
      alert('Please enter a valid long URL.');
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

      let newLink: string;
      if (chainId === ARBITRUM_SEPOLIA_CHAIN_ID) {
        newLink = `${window.location.origin}/a/${shortCode}`;
      } else if (chainId === MONAD_TESTNET_CHAIN_ID) {
        newLink = `${window.location.origin}/m/${shortCode}`;
      } else {
        newLink = `${window.location.origin}/${shortCode}`;
      }

      setGeneratedLink(newLink);
      setStatus('Transaction successful!');
    } catch (error: any) {
      console.error('Detailed error in shortenURL:', error);
      setStatus(`Error occurred: ${error.message || 'Unknown error'}`);
    }
  }

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-dark-1">
    <div className="rounded-xl w-full max-w-xl space-y-8 border border-gray-dark-4 bg-gray-dark-2 p-10 shadow-2xl">
      <h1 className="werey text-3xl text-center font-extrabold text-yellow-dark-9">
        Web3 URL Shortener
      </h1>
      <div className="flex items-center justify-center gap-4 sm:flex-row">
        <ConnectButton />
      </div>
      <div className="mt-8 space-y-6">
        {isConnected && (
          <p className="text-sm text-center text-gray-dark-11">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        )}
        <div className="space-y-4">
          <div className='relative flex'>
            <button 
              className="!absolute right-1 top-1 z-10 select-none rounded bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={() => setShortCode(randomString(5))}
            >
              Random
            </button>
            <label htmlFor="shortCode" className="sr-only">
              Short code
            </label>
            <input
              id="shortCode"
              type="text"
              placeholder="Short code (e.g. abc123)"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="rounded-md w-full border border-gray-dark-6 bg-gray-dark-3 px-3 py-2 text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-dark-9"
            />
          </div>
          <div>
            <label htmlFor="longUrl" className="sr-only">
              Long URL
            </label>
            <input
              id="longUrl"
              type="text"
              placeholder="Long URL (e.g. https://example.com)"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="rounded-md w-full border border-gray-dark-6 bg-gray-dark-3 px-3 py-2 text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-dark-9"
            />
          </div>
        </div>
        <div>
          <button
            onClick={shortenURL}
            className={`rounded-md text-sm flex w-full justify-center border border-transparent px-4 py-2 font-medium ${
              isConnected && !status.includes('Transaction pending')
                ? 'bg-blue-600 text-white hover:bg-yellow-dark-10 focus:outline-none focus:ring-2 focus:ring-yellow-dark-9 focus:ring-offset-2'
                : 'bg-blue-900 cursor-not-allowed text-gray-dark-1'
            }`}
            disabled={!isConnected || status.includes('Transaction pending')}
          >
            {status.includes('Transaction pending')
              ? 'Processing...'
              : 'Shorten'}
          </button>
        </div>
      </div>
      {status && (
        <div className="mt-4 text-center">
          <p
            className={`break-words font-medium ${
              status.includes('Error')
                ? 'text-red-dark-11'
                : 'text-yellow-dark-11'
            }`}
          >
            {status}
          </p>
        </div>
      )}
      {generatedLink && (
        <div className="mt-4 text-center">
          <p className="font-medium text-yellow-dark-9">
            Shortened URL:{' '}
            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {generatedLink}
            </a>
            <button
              onClick={copyToClipboard}
              className="text-sm text-yellow-400 rounded ml-2 hover:text-yellow-dark-10 focus:outline-none focus:ring-2 focus:ring-yellow-dark-9 focus:ring-offset-2"
            >
              Copy
            </button>
          </p>
          {copySuccess && (
            <p className="mt-2 text-yellow-dark-11">{copySuccess}</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
}