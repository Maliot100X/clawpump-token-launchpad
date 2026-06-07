// ClawPump Solana configuration - REAL VALUES
export const NETWORK = "mainnet-beta";

// Real CLAW token mint from research
export const CLAW_TOKEN_MINT = 
  process.env.NEXT_PUBLIC_CLAW_MINT || 
  "DMvsGEm3VZLfJCyQUnTnhLdH7vyFP9oQSFcrcrgBCLAW";

// Meteora DBC program for custom bonding curves
export const METEORA_DBC_PROGRAM_ID = 
  "dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN";

// ClawPump API endpoints
export const CLAWPUMP_API = "https://clawpump.vercel.app";
export const CLAWPUMP_DOCS = "https://clawpump.tech/docs";

// Official ClawPump token
export const OFFICIAL_CLAW_TOKEN = "739dnZEG4yaBWFsY8L8ZwrfhGG6dhtCSercW8Umspump";

export const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_RPC_URL || 
  "https://api.mainnet-beta.solana.com";

export const COMMITMENT = "confirmed" as const;
