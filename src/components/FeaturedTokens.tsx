"use client";

import { FC } from "react";
import TokenCard from "./TokenCard";

const mockTokens = [
  {
    name: "ClawMeme",
    symbol: "CLAWME",
    description: "The official meme token of the Claw ecosystem",
    raiseAmount: "500,000",
    progress: 72,
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  },
  {
    name: "SolClaw",
    symbol: "SCLAW",
    description: "Solana-native CLAW wrapper with staking rewards",
    raiseAmount: "1,000,000",
    progress: 45,
    mintAddress: "So11111111111111111111111111111111111111112",
  },
  {
    name: "PawSwap",
    symbol: "PAWS",
    description: "Decentralized exchange token for ClawPump ecosystem",
    raiseAmount: "250,000",
    progress: 91,
    mintAddress: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  },
];

const FeaturedTokens: FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">🔥 Featured Launches</h2>
        <a href="/trade" className="text-claw-primary hover:underline text-sm">
          View All →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTokens.map((token) => (
          <TokenCard key={token.symbol} {...token} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedTokens;
