import { ethers } from 'ethers';
import { abi } from '@/lib/abi'
import { contractAddress } from '@/lib/env';

export function getSignerContract(signer: ethers.JsonRpcSigner, network?: string) {
  if (!signer) {
    console.error('No signer provided to getSignerContract');
    throw new Error('No signer available');
  }

  const address = contractAddress(network || '');

  if (!address || address === '') {
    throw new Error('Contract address not configured');
  }

  return new ethers.Contract(address, abi, signer);
}