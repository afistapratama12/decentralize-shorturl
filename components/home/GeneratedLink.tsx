'use client'

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button"
import { useQRCode } from 'next-qrcode';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { CircleArrowRight, Facebook, Send } from "lucide-react";
import useIsLargeScreen from "@/hooks/screen.hooks";
import { getExplorerUrl } from "@/lib/helpers";

export default function GeneratedLink({
  generatedLink,
  txHash,
  longUrl,
  chainId
}: {
  generatedLink: string
  txHash: string
  longUrl: string
  chainId: number
}) {
  const { isLargeScreen } = useIsLargeScreen();

  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const linkExplorerUrl = useMemo(() => getExplorerUrl(chainId, txHash), [chainId, txHash]);

  return (<>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
    <p className="text-xl text-dark-foreground mb-12">Copy Your Link and Share It!</p>
  </div>
  <div className="flex justify-center mx-4 lg:mx-0 mb-6">
    <div className="rounded-xl w-full max-w-3xl space-y-8 border border-gray-dark-4 bg-gray-dark-2 px-8 lg:px-10 py-8 shadow-xl lg:shadow-2xl dark:shadow-lg dark:shadow-blue-500/30">
      <div className="space-y-4">
        <div className="flex justify-between gap-4">
          <p className="font-bold mb-2">Transaction Hash</p>
          {
            isLargeScreen && txHash ? (
              <a href={linkExplorerUrl} target="_blank" rel="noopener noreferrer" className="font-semibold cursor-pointer hover:text-slate-600 dark:hover:text-gray-300">
                {txHash.slice(0, 16) + "..." + txHash.slice(txHash.length - 10)}
              </a>
            ) : (
              <a href={linkExplorerUrl} target="_blank" rel="noopener noreferrer" className="font-semibold cursor-pointer hover:text-slate-600 dark:hover:text-gray-300">
                {txHash.slice(0, 6) + "..." + txHash.slice(txHash.length - 4)}
              </a>
            )
          }
        </div>
        
        <div>
          <p className="font-bold mb-2">Your long URL</p>
          <input
            id="longUrl"
            type="text"
            value={longUrl}
            disabled
            className={
              "py-2 rounded-md w-full border border-gray-dark-6 bg-gray-dark-3 px-3 py-2 "+
              "text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent dark:text-white"
            }
          />
        </div>
        <div>
          <p className="font-bold mb-2">Your Shorten URL</p>
          <div className='relative flex gap-3'>
            <input
              id="shortCode"
              type="text"
              value={generatedLink}
              disabled
              className="rounded-md w-full border border-gray-dark-6 bg-gray-dark-3 px-3 py-2 text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent dark:text-white"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-left gap-2">
        {/* semua pakai modal, untuk hp bisa bagus */}
        <Button
          className="cursor-pointer bg-blue-500 text-sm lg:text-md dark:text-white hover:bg-blue-600"
          onClick={() => {
            window.open(generatedLink, '_blank');
          }}
        >
            <CircleArrowRight />
            Visit
        </Button>
        <QRCode 
         isLargeScreen={isLargeScreen}
          generatedLink={generatedLink}
        />
        <ShareSocial 
          generatedLink={generatedLink}
        />
        <Button 
          className="cursor-pointer bg-blue-500 text-md hover:bg-blue-600 w-20 lg:w-24 text-sm lg:text-md dark:text-white"
          onClick={copyToClipboard}
        >
          {copySuccess ? copySuccess : 'Copy Link'}
        </Button>
      </div>
      <div id='button-back' className="flex justify-center">
        <Button
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-md shadow-md w-3xs lg:w-xs h-12 dark:text-white"
          onClick={() => {
            window.location.href = '/'
          }}
        >Shorten another</Button>
        {/* <Button>My Urls</Button>, get di 3 chains */}
      </div>
    </div>
  </div>
  </>)
}

export function QRCode({isLargeScreen, generatedLink}: {isLargeScreen: boolean, generatedLink: string}) {
  const { Canvas } = useQRCode()

  function downloadQRCode(format: string) {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL(`image/${format}`);
      link.download = `qrcode.${format}`;
      link.click();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-sm lg:text-md">{isLargeScreen ? "QR Code" : "QR"}</Button>
      </DialogTrigger>
      <DialogContent 
        // className="sm:max-w-[425px]"
        className="sm:max-w-[365px] rounded-lg"
      >
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-2 md:gap-4">
          <Canvas 
            text={generatedLink}
            options={{
              errorCorrectionLevel: 'M',
              margin: 2,
              scale: 4,
              width: 200,
            }}
          />
          <div className="flex flex-col gap-2 mt-4">
            <Button 
              className="cursor-pointer text-md bg-blue-500 hover:bg-blue-700 dark:text-white"
              onClick={() => downloadQRCode('svg')} 
            >SVG</Button>
            <Button 
              className="cursor-pointer text-md bg-blue-500 hover:bg-blue-700 dark:text-white"
              onClick={() => downloadQRCode('png')}
              >PNG</Button>
            <Button className="cursor-pointer text-md bg-blue-500 hover:bg-blue-700 dark:text-white"
              onClick={() => downloadQRCode('jpg')}
            >JPG</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export function ShareSocial({generatedLink}: {generatedLink: string}) {
  const shareUrl = (platform: string) => {
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}`;
        break;
      case 'X':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(generatedLink)}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(generatedLink)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(generatedLink)}`;
        break;
    }
    window.open(shareLink, '_blank');
  };

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="cursor-pointer text-sm lg:text-md">Share</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Share Link</DialogTitle>
      </DialogHeader>
        <div className="flex flex-col gap-3 justify-center">
          <BlueButton onClick={() => shareUrl('whatsapp')}>
            <div className="h-5 w-5">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            Whatsapp</BlueButton>
          <BlueButton
          onClick={() => shareUrl('X')}>
            <div className="h-5 w-5">
                <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white"/>
                </svg>
            </div>
            X / Twitter</BlueButton>
          <BlueButton onClick={() => shareUrl('telegram')}>
            <Send className="mr-2" />
            Telegram</BlueButton>
          <BlueButton onClick={() => shareUrl('facebook')}>
            <Facebook className="mr-2" />
            Facebook</BlueButton>
        </div>
    </DialogContent>
  </Dialog>
  )
}

export function BlueButton({children, onClick}: {children: React.ReactNode, onClick: () => void}) {
  return (
    <Button
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-md shadow-md"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}