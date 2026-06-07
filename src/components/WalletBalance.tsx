"use client";

import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const WalletBalance: FC = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey || !connected) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error("Failed to fetch balance:", err);
      }
    };

    fetchBalance();
    const id = setInterval(fetchBalance, 10000);
    return () => clearInterval(id);
  }, [publicKey, connected, connection]);

  if (!connected || balance === null) return null;

  return (
    <div className="bg-claw-dark rounded-lg p-4 border border-gray-700">
      <p className="text-gray-400 text-sm">SOL Balance</p>
      <p className="text-white text-xl font-semibold">
        {balance.toFixed(4)} SOL
      </p>
    </div>
  );
};

export default WalletBalance;
