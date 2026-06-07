"use client";

import { FC } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar: FC = () => {
  const { connected } = useWallet();

  return (
    <nav className="bg-claw-darker border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-claw-primary">
              🐾 ClawPump
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/launch"
                className="text-gray-300 hover:text-white transition"
              >
                Launch
              </Link>
              <Link
                href="/trade"
                className="text-gray-300 hover:text-white transition"
              >
                Trade
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-300 hover:text-white transition"
              >
                Portfolio
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {connected && (
              <span className="text-sm text-green-400">● Connected</span>
            )}
            <WalletMultiButton className="!bg-claw-primary hover:!bg-claw-primary/80 !rounded-lg !h-10 !px-4 !text-sm" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
