"use client";

import { FC } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";

interface TokenCardProps {
  name: string;
  symbol: string;
  description: string;
  raiseAmount: string;
  progress: number;
  mintAddress: string;
}

const TokenCard: FC<TokenCardProps> = ({
  name,
  symbol,
  description,
  raiseAmount,
  progress,
  mintAddress,
}) => {
  const { connected } = useWallet();

  return (
    <div className="bg-claw-dark rounded-xl border border-gray-700 p-6 hover:border-claw-primary/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <span className="text-claw-secondary text-sm font-mono">
            ${symbol}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-claw-primary/20 flex items-center justify-center">
          <span className="text-lg">🪙</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="text-white">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-claw-primary to-claw-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">
          Raise: <span className="text-white">{raiseAmount} CLAW</span>
        </span>
        <Link
          href={`/trade?token=${mintAddress}`}
          className="bg-claw-primary hover:bg-claw-primary/80 text-white px-4 py-2 rounded-lg text-sm transition font-medium"
        >
          Trade
        </Link>
      </div>
    </div>
  );
};

export default TokenCard;
