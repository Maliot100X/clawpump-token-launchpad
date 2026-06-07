// ClawPump Solana configuration
export const NETWORK = "devnet";

export const CLAW_TOKEN_MINT =
  process.env.NEXT_PUBLIC_CLAW_TOKEN_MINT ||
  "CLAW1111111111111111111111111111111111111111";

export const METEORA_DBC_PROGRAM_ID =
  "dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN";

export const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_RPC_URL ||
  `https://api.mainnet-beta.solana.com`;

export const COMMITMENT: "confirmed" = "confirmed";
