'use client'
import { useEffect, useState } from "react";
import { useAccount, useWalletClient, useChainId } from 'wagmi';
import { ethers } from 'ethers';
import { unAllowChainID } from "@/libs/helpers";

export default function useHomeHooks() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const chainId = useChainId();
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.ethereum &&
      isConnected &&
      walletClient
    ) {
      console.log('Setting up ethers provider...');
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      ethersProvider
        .getSigner()
        .then((newSigner) => {
          // console.log('Signer obtained:', newSigner);
          setSigner(newSigner);
        })
        .catch((error) => {
          console.error('Error getting signer:', error);
          setSigner(null);
        });
    } else {
      console.log('Conditions not met for signer setup:', {
        windowExists: typeof window !== 'undefined',
        ethereumExists: !!window?.ethereum,
        isConnected,
        hasWalletClient: !!walletClient,
      });
      setSigner(null);
    }
  }, [isConnected, walletClient]);

  useEffect(() => {
    if (isConnected && unAllowChainID(chainId)) {
      setStatus(
        'Please switch to the Arbitrum Sepolia, Sepolia or Monad Tesnet in your wallet.',
      );
      console.log('Wrong chain ID:', chainId);
    } else {
      setStatus('');
    }
  }, [isConnected, chainId]);


  console.log('Current status:', status);

  return {
    address,
    isConnected,
    signer,
    chainId,
    status,
    setStatus,
    setSigner,
  }
}