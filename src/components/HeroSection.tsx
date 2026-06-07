"use client";

import { FC } from "react";
import Link from "next/link";

const HeroSection: FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-claw-primary/20 via-transparent to-claw-secondary/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Launch Tokens with</span>{" "}
            <span className="bg-gradient-to-r from-claw-primary to-claw-secondary bg-clip-text text-transparent">
              CLAW
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            The first token launchpad on Solana using Meteora Dynamic Bonding
            Curve with CLAW as the quote currency. Fair launches, real prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/launch"
              className="bg-claw-primary hover:bg-claw-primary/80 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-claw-primary/25"
            >
              🚀 Launch Token
            </Link>
            <Link
              href="/trade"
              className="bg-claw-dark hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold border border-gray-700 transition-all duration-200"
            >
              📈 Trade Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
