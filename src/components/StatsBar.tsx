"use client";

import { FC } from "react";

const stats = [
  { label: "Total Raised", value: "2.4M CLAW", icon: "💰" },
  { label: "Tokens Launched", value: "142", icon: "🪙" },
  { label: "Active Traders", value: "3,821", icon: "👥" },
  { label: "Volume (24h)", value: "890K CLAW", icon: "📊" },
];

const StatsBar: FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-claw-dark rounded-xl border border-gray-800 p-4 text-center"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-white font-bold text-lg mt-2">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
