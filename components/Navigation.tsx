'use client'

import { Link } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "./ToggleTheme";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { listFaucetLink } from "@/lib/const";
import { BlueButton } from "./home/GeneratedLink";
import useIsLargeScreen from "@/hooks/screen.hooks";

export default function Navigation() {
  const { isLargeScreen } = useIsLargeScreen()

  return (
    <nav className="">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center cursor-pointer"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          <Link className="h-6 w-6 mr-2" />
          <span className="text-2xl font-bold">cuty.im</span>
        </div>
        <div className="flex items-center space-x-0 md:space-x-2">
          <DialogFaucet />
          <ConnectButton
            label={isLargeScreen ? "Connect Wallet" : "Connect"}
            showBalance={false}
            accountStatus="avatar"
            chainStatus={isLargeScreen? "full": "icon"}
          />
          <ModeToggle />
        </div>
      </div>
    </div>
    </nav>
  )
}

export function DialogFaucet() {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer font-semibold md:font-bold">Faucet</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[365px] rounded-lg"
      >
        <DialogHeader>
          <DialogTitle>Faucet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 justify-center">
          {
            listFaucetLink.map((faucet) => {
              return (
                <>
                  <BlueButton
                    key={faucet.id}
                    onClick={() => {
                      window.open(faucet.link, "_blank")
                    }}
                  >
                    {faucet.name}
                  </BlueButton>
                </>
              )
            })
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}