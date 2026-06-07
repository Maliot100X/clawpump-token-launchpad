# ClawPump Token Launch Platform — SKILL.md

## Overview
Launch tokens on Solana using CLAW as the quote currency via the ClawPump API. Agents can read this skill to understand the full launch process.

## How to Launch a Token

### Prerequisites
- Solana wallet with SOL for gas
- CLAW tokens for trading
- Connected wallet (Phantom, Solflare, etc.)

### Launch Steps
1. Connect wallet to the platform
2. Enter token details (name, symbol, description)
3. Upload token image
4. Pay launch fee in CLAW tokens
5. Token is created on Solana with CLAW as quote currency
6. Trading begins on the bonding curve
7. Graduation to Raydium DEX when threshold reached

### API Endpoints
- `POST /api/launch` — Launch token
- `GET /api/launches` — List all launches
- `GET /api/treasury` — Treasury status
- `GET /api/health` — System health

### Configuration
- Network: Solana Mainnet
- CLAW Token Mint: `DMvsGEm3VZLfJCyQUnTnhLdH7vyFP9oQSFcrcrgBCLAW`
- Meteora DBC Program: `dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN`
- Official ClawPump Token: `739dnZEG4yaBWFsY8L8ZwrfhGG6dhtCSercW8Umspump`

## Trading

### Buy Tokens
- Use CLAW tokens on the bonding curve
- Price increases as more tokens are bought
- Slippage protection available

### Sell Tokens
- Sell back to the bonding curve
- Receive CLAW tokens
- Graduated tokens trade on Raydium

## Bonding Curve Mechanics

### How It Works
- Linear bonding curve
- CLAW as quote currency
- Price starts low, increases with buys
- Graduation threshold: configurable

### Graduation
- When threshold reached → auto-migration to Raydium
- LP tokens locked for 10 years
- Trading continues on Raydium AMM

## Revenue Model

### For Token Launchers
- 65-80% of trading fees
- Fees collected in CLAW
- Permissionless collect/distribute

### For Platform
- 20-35% of trading fees
- Treasury management
- Infrastructure costs

## Security Notes

- Never share private keys
- Use dedicated trading wallet
- Start with small amounts
- Verify contract addresses
- Check treasury status before launch

## Current Status (June 2026)

- Gasless treasury: **DEPLETED** (0 SOL available)
- Self-funded endpoint: **NOT DEPLOYED** (404)
- Total launches: 3,770+
- Active agents: 2,751+

## Agent Integration

Agents can:
1. Read this SKILL.md
2. Call the API to launch tokens
3. Monitor bonding curve
4. Collect trading fees
5. Graduate tokens to DEX

### Example Agent Flow
```
1. Agent reads SKILL.md
2. Connects to ClawPump API
3. Launches token with CLAW as quote
4. Monitors bonding curve
5. Collects fees when users trade
6. Token graduates to Raydium
```
