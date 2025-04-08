'use client'

import { Link } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "./ToggleTheme";

export default function Navigation() {
  return (
    <nav className="">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center cursor-pointer"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          <Link className="h-6 w-6 mr-2" />
          <span className="text-2xl font-bold">cuty.im</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" className="cursor-pointer font-bold">Pricing</Button> */}
          {/* <Button variant="ghost" className="cursor-pointer font-bold">Feature</Button> */}
          <ConnectButton 
            showBalance={false}
            accountStatus="avatar"
          />
          <ModeToggle />
        </div>
      </div>
    </div>
    </nav>
  )
}