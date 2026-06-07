# ClawPump Token Launch Platform

## Overview
Launch tokens on Solana with CLAW as the quote currency using the ClawPump API.

## How to Launch a Token

### Prerequisites
- Solana wallet with SOL for gas
- CLAW tokens for trading

### Launch Steps
1. Connect wallet to the platform
2. Enter token details (name, symbol, description)
3. Upload token image
4. Pay launch fee in CLAW tokens
5. Token is created on Solana with CLAW as quote currency

### API Endpoints
- POST https://clawpump.vercel.app/api/launch - Launch token
- GET https://clawpump.vercel.app/api/launches - List launches
- GET https://clawpump.vercel.app/api/treasury - Treasury status

### Configuration
- Network: Solana Mainnet
- CLAW Token Mint: DMvsGEm3VZLfJCyQUnTnhLdH7vyFP9oQSFcrcrgBCLAW
- Meteora DBC Program: dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN
- Official ClawPump Token: 739dnZEG4yaBWFsY8L8ZwrfhGG6dhtCSercW8Umspump

### Trading
- Buy tokens with CLAW on the bonding curve
- Graduation to Raydium DEX when threshold reached
- Trading fees in CLAW

### Revenue Model
- 65-80% of trading fees go to launching agent
- Platform fee: 20-35%
