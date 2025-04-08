import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ethers } from 'ethers';
import urlShortenerJson from '@/lib/abi/urlShortener.json';
import { getEnvCheck } from './lib/env';
import { 
  NETWORK_ARB_SEPOLIA, 
  NETWORK_HARDHAT, 
  NETWORK_MONAD_TESTNET, 
  NETWORK_SEPOLIA 
} from './lib/const';

// sepolia -> root /[shortCode]
// arbitrumSepolia = /a/[shortCode]
// monadTestnet = /m/[shortCode]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.endsWith(".svg") || pathname.endsWith(".ico")) {
    return NextResponse.next(); // Ignore Next.js internal routes
  }

  let shortCode: string;
  let netwoks = NETWORK_SEPOLIA;

  if (pathname.includes('/a/')) {
    shortCode = pathname.split('/')[2]; // get the short code after "/s"
    netwoks = NETWORK_ARB_SEPOLIA;
  } else if (pathname.includes('/m/')) {
    shortCode = pathname.split('/')[2]; // get the short code after "/m"
    netwoks = NETWORK_MONAD_TESTNET
  } else if (pathname.includes('/h/')){
    shortCode = pathname.split('/')[2]; // get the short code after "/"
    netwoks = NETWORK_HARDHAT
  } else {
    shortCode = pathname.split('/')[1]; // get the short code after "/"
  }

  // Only handle dynamic short URLs like "/abc123" , or in other network for "/s/abc123" or "/m/abc123"
  if (!shortCode || shortCode === '' || pathname === '/') {
    return NextResponse.next(); // No short code found, continue to the next middleware
  }
  
  const envCheck = getEnvCheck(netwoks)

  try {
    if (!envCheck.rpcUrl || !envCheck.contractAddress) {
      return NextResponse.next(); // let page handle the error
    }

    const provider = new ethers.JsonRpcProvider(envCheck.rpcUrl);
    const contract = new ethers.Contract(
      envCheck.contractAddress,
      urlShortenerJson.abi,
      provider,
    );

    const longUrl = await contract.getURL(shortCode);

    if (longUrl && longUrl.length > 1 && longUrl[1] !== '') {
      const fullUrl = longUrl[1].startsWith('http') ? longUrl[1] : `https://${longUrl[1]}`;
      return NextResponse.redirect(fullUrl, 307); // External redirect
    }

    // Continue to the normal page render if not found
    return NextResponse.next();
  } catch (e) {
    console.error('[middleware error]', e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // middleware only run in path /[shortCode]
    // '/:shortCode',
    // '/s/:shortCode',
    // '/m/:shortCode',
    '/((?!_next|api|favicon.ico|next.svg|file.svg|vercel.svg|globe.svg|window.svg).*)',

  ],
};