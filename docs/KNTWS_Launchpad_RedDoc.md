# KaiNova / ClawPump Launchpad — Red Doc v2 (Full Architecture)

**Status:** Research draft v0.2 — deeper round, repo-ready
**Date:** 2026-06-07
**Owner:** Solxhunter X100
**For:** Internal use + pitch deck to clawpump.tech owner

---

## 0. What changed since v0.1

v0.1 said *"yes feasible, 78/100, here are the building blocks."*

v0.2 goes deeper on every block:

- Virtuals Protocol's **exact launch mechanic** (it's literally what we want to clone, just on Solana with CLAW instead of VIRTUAL).
- Meteora DBC's **full createConfigAndPool signature** and curve types.
- ClawPump's **full agent stack**: 94 MCP tools, treasury/self-funded fallback, swap+arbitrage+sniper+social APIs — we don't just integrate with them, we can **eat their entire stack** since you own the platform.
- A **Token-2022 transfer hook design** for the "must hold X CLAW to trade" rule — provably on-chain, not just UI.
- **Full repo file tree**, install commands, env vars, deployment commands. Ready to publish.
- A clean **tokenomics model** with numbers.

---

## 1. The vision in one paragraph (refined)

**ClawPump Launchpad** = the Solana version of Virtuals Protocol's Agent Genesis, but for memecoins (and agents) where the bonding-curve **quote asset is CLAW** instead of VIRTUAL/SOL. Launch a token → bonds against CLAW → graduates to Meteora DAMM (CLAW/NewToken pool) → tradable on Jupiter + every Solana DEX. Three tiers of holder perks (10k / 100k / 1M CLAW) unlock fee discounts, free-swap quota, and APY revshare on launched tokens. AI agents launch via API/MCP; humans launch via web. Optional Virtuals ACP integration so KNTWS agents on Base can buy launch services in KNTWS, settled by KaiNova on Solana.

In plain English: **we are Virtuals, but on Solana, with CLAW as the gas of the casino.**

---

## 2. The deep precedent — Virtuals on Base

This is the exact pattern we're cloning. Don't reinvent — adapt.

| Mechanic | Virtuals (Base) | Our version (Solana) |
|---|---|---|
| Launch cost | 100 VIRTUAL | 10k CLAW (or self-funded path) |
| Quote token | VIRTUAL | **CLAW** |
| Total supply per token | 1B | 1B |
| Bonding curve | Custom Virtuals curve | Meteora DBC |
| Graduation threshold | 42,000 VIRTUAL | ~50,000–100,000 CLAW (configurable) |
| Post-graduation pool | Uniswap V2/V3, locked 10y | Meteora DAMM v1/v2, locked LP |
| Trading fee | 1% | 1% (configurable) |
| Anti-sniping | 99%→1% tax curve | Same (DBC fee scheduler) |
| Buyback/burn | Agent revenue → buy/burn | Platform fees → buy/burn CLAW |

Virtuals took ~12 months to reach a $4B market cap with this exact mechanic. The thesis works. We just port it to Solana, on top of an existing CLAW community.

Refs: [Virtuals whitepaper – Standard Launch](https://whitepaper.virtuals.io/info-hub/builders-hub/more-on-standard-launch), [GAME framework overview](https://docs.game.virtuals.io/game-overview), [DEXTools 2026 guide](https://www.dextools.io/tutorials/what-is-virtuals-protocol-ai-agents-base-guide-2026).

---

## 3. The full technical stack

### 3.1 On-chain layer
- **Meteora DBC program** (`dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN`) — the actual bonding curve. We never fork or rewrite it.
- **Meteora DAMM v1 or v2** — the graduation destination.
- **Optional: Custom Token-2022 transfer hook on launched tokens** — to enforce the "must hold X CLAW to trade" rule at protocol level, not just UI level. [Solana transfer hook docs](https://solana.com/developers/guides/token-extensions/transfer-hook).
- **Platform fee router program (small, ~150 LoC Anchor)** — takes incoming fees in CLAW, splits to creator / platform / KNTWS-buyback wallet.
- **Holder tier registry PDA** — stores tier definitions (10k / 100k / 1M) and current snapshot of who's at what tier. Updated by a cron.

### 3.2 Off-chain backend
- **Vercel Functions** (Fluid Compute, Node 24) for the API.
- **Postgres** (Vercel Marketplace — Neon or Supabase) for token metadata, user profiles, leaderboards, fee snapshots.
- **Helius / Triton RPC** for Solana access.
- **Jupiter Ultra API** for SOL→CLAW onboarding and arbitrary token swaps. [Jupiter Next.js example](https://github.com/jup-ag/jupiter-api-nextjs-example), [Quicknode Ultra guide](https://www.quicknode.com/guides/solana-development/3rd-party-integrations/jupiter-ultra-swap).
- **Bitquery or Birdeye API** for chart/candle data and historical pool state.

### 3.3 Frontend
- **Next.js 15 (App Router) on Vercel**, Tailwind + shadcn/ui.
- **Wallet adapter**: Phantom, Backpack, Solflare, Glow.
- **TradingView Lightweight Charts** for token price.
- **Vercel BotID** for bot protection on launch endpoints.

### 3.4 AI / Agent layer
- **MCP server** exposing 6–10 launchpad tools (createToken, buy, sell, getCurveState, getHolderTier, claimFees, listMyTokens). Cursor / Claude Code users can launch directly from their editor.
- **ClawPump's existing 94 MCP tools** can be re-exposed under our brand since you own clawpump.tech.
- **Virtuals ACP Provider offering** ("LaunchTokenOnSolana") priced in KNTWS on Base, settled cross-chain.
- **Virtuals GAME SDK Worker** wrapping our REST API so any GAME agent can call us.

### 3.5 DevOps
- **Vercel** for web + API. `vercel.ts` config.
- **GitHub Actions** for tests, audit gates, release tagging.
- **Sentry** for error monitoring.
- **PostHog** for product analytics.

---

## 4. The "must hold CLAW" rule — three enforcement levels

You want **users to be required to hold CLAW** before they can launch / trade. There are three levels of enforcement, weakest to strongest:

### Level 1: UI gate (weak, easy)
Frontend checks CLAW balance via RPC, hides the launch/trade button if below tier. Anyone can bypass by hitting the API directly.

### Level 2: API gate (medium, fast)
Backend rejects requests if signer wallet has < X CLAW. Cheap, covers 95% of users. Still bypassable by someone who can call DBC directly.

### Level 3: On-chain gate via Token-2022 transfer hook (strong, slow)
Every launched token uses Token-2022 with a transfer hook. The hook program reads the sender's CLAW balance from an associated token account and aborts the transfer if below threshold. This means **even a direct DBC swap fails** if the user doesn't hold CLAW.

Caveat: pool vault PDAs must be whitelisted in the hook, or every internal pool transfer will fail. This is a known design tax — manageable but requires care.

**Recommended path:** ship Level 2 first (week 4), upgrade to Level 3 as v2 (month 3). Level 3 is the moat — competitors can't replicate it just by forking the UI.

Ref: [Token-2022 transfer hook deep dive](https://chainstack.com/solana-token-2022-fee-transfer-hooks/), [Civic Pass example](https://github.com/civicteam/token-extensions-transfer-hook).

---

## 5. Holder Tier System (the APY/perks engine)

This is your "1M CLAW = APY allocation on their launched token" idea, formalized:

| Tier | Hold | Perks |
|---|---|---|
| **Cub** | 10,000 CLAW | UI access; can launch tokens; standard 1% trade fee |
| **Lion** | 100,000 CLAW | Trade fee discount 50% (0.5%); free-swap quota: 10 swaps/day in CLAW gas-free; priority listing on the launchpad homepage |
| **Apex** | 1,000,000 CLAW | Trade fee 0% on own tokens; **5% APY on launched-token graduation surplus**; co-creator badge on every token they fund; auto-airdrop of 0.1% of every new token launched on the platform that day |

**Where the APY money comes from:** the DBC graduation **surplus** (the last swap creates a quote-token surplus shared between partner and protocol — that's us). We route a slice of platform earnings into a Tier-Apex APY pool, distributed proportionally to active Apex holders weekly.

This is the **flywheel**:
1. CLAW price + utility rises → more people want CLAW
2. More launches happen → more fees
3. More fees → APX pool fills → 1M CLAW holders earn → more demand for CLAW
4. Loop

---

## 6. Tokenomics — concrete numbers

### Per-launch fee model
- Platform launch fee: 10,000 CLAW (paid in CLAW, 100% kept as platform revenue, ~$50–500 at current CLAW price depending on session).
- Self-funded fallback: 0.1 SOL or 5 USDC (auto-swapped to CLAW server-side).
- Bonding curve trade fee: 1% per trade
  - 30% → token creator
  - 50% → platform wallet (CLAW)
  - 20% → KNTWS buyback (Jupiter cross-route: CLAW → SOL → KNTWS-Solana, then bridge to Base via Wormhole, burn or send to KNTWS treasury)
- Graduation surplus: 50/50 platform/creator

### Per-token economics example
- Token raises 100k CLAW to graduate (~$500k at $5 CLAW).
- 1% fee × $10M cumulative trade volume = $100k in fees
  - Creator: $30k
  - Platform: $50k
  - KNTWS buyback: $20k
- LP locked → fees forever from the DAMM pool.

### Platform-level revenue projection
If we hit **20 launches/day × $5k average fee revenue each** = $100k/day = $36M/yr at scale. Same trajectory as pump.fun in its first 12 months but with our token as the gas.

---

## 7. The repo — full file tree

Repo name: **`clawpump-launchpad`** (or **`kainova-launchpad`**)

```
clawpump-launchpad/
├── apps/
│   ├── web/                          # Next.js 15 frontend + API
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx          # landing
│   │   │   │   └── docs/
│   │   │   ├── (app)/
│   │   │   │   ├── launch/page.tsx
│   │   │   │   ├── token/[mint]/page.tsx
│   │   │   │   ├── trade/page.tsx
│   │   │   │   ├── profile/page.tsx
│   │   │   │   ├── leaderboard/page.tsx
│   │   │   │   └── apex/page.tsx     # Apex tier dashboard
│   │   │   └── api/
│   │   │       ├── launch/route.ts
│   │   │       ├── buy/route.ts
│   │   │       ├── sell/route.ts
│   │   │       ├── state/[mint]/route.ts
│   │   │       ├── tier/[wallet]/route.ts
│   │   │       ├── fees/claim/route.ts
│   │   │       ├── jupiter/quote/route.ts
│   │   │       ├── jupiter/swap/route.ts
│   │   │       └── webhook/graduation/route.ts
│   │   ├── components/
│   │   │   ├── wallet/
│   │   │   ├── curve-chart/
│   │   │   ├── trade-panel/
│   │   │   └── tier-badge/
│   │   ├── lib/
│   │   │   ├── solana.ts             # RPC + helpers
│   │   │   ├── dbc-client.ts         # Meteora DBC wrapper
│   │   │   ├── jupiter.ts
│   │   │   ├── tier.ts               # CLAW balance → tier
│   │   │   └── db.ts                 # Postgres client
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── tailwind.config.ts
│   │
│   ├── mcp/                          # MCP server for AI editors
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── tools/
│   │   │   │   ├── createToken.ts
│   │   │   │   ├── buyToken.ts
│   │   │   │   ├── sellToken.ts
│   │   │   │   ├── getCurveState.ts
│   │   │   │   ├── getMyTier.ts
│   │   │   │   ├── claimFees.ts
│   │   │   │   └── listMyTokens.ts
│   │   │   └── server.ts
│   │   └── package.json
│   │
│   ├── worker/                       # Background jobs
│   │   ├── src/
│   │   │   ├── graduation-watcher.ts # listens for DBC graduation events
│   │   │   ├── fee-sweeper.ts        # hourly fee sweep + KNTWS buyback
│   │   │   ├── tier-snapshot.ts      # daily CLAW holder snapshot
│   │   │   ├── apex-distributor.ts   # weekly APY payout
│   │   │   └── leaderboard-sync.ts
│   │   └── package.json
│   │
│   └── acp-bridge/                   # Virtuals ACP cross-chain bridge
│       ├── src/
│       │   ├── provider.ts           # ACP Job offering: LaunchTokenOnSolana
│       │   ├── escrow-listener.ts    # listens for Base escrow
│       │   ├── solana-executor.ts    # signs Solana launch tx
│       │   └── deliverable-signer.ts # signs ACP DeliverableMemo
│       └── package.json
│
├── programs/                         # Anchor / Solana programs
│   ├── platform-fee-router/          # ~150 LoC, splits fees
│   │   ├── src/lib.rs
│   │   ├── Cargo.toml
│   │   └── tests/
│   ├── claw-tier-gate-hook/          # Token-2022 transfer hook (v2)
│   │   ├── src/lib.rs
│   │   ├── Cargo.toml
│   │   └── tests/
│   └── tier-registry/                # PDA storing tier thresholds
│       ├── src/lib.rs
│       └── Cargo.toml
│
├── packages/                         # Shared TS code
│   ├── types/                        # shared types/zod schemas
│   ├── sdk/                          # @clawpump/sdk — public client SDK
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── client.ts
│   │   │   └── tier.ts
│   │   └── README.md
│   └── ui/                           # shared shadcn components
│
├── scripts/
│   ├── deploy-dbc-config.ts          # one-time partner config deploy
│   ├── deploy-tier-registry.ts
│   ├── sim-curve.ts                  # math sim of curve before deploy
│   ├── audit-pool.ts
│   └── kntws-buyback.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # typecheck, lint, anchor test
│       ├── deploy-preview.yml        # Vercel preview per PR
│       └── release.yml
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── TOKENOMICS.md
│   ├── API.md
│   ├── MCP.md
│   ├── DEPLOY.md
│   └── PARTNERSHIP_PROPOSAL.md       # the doc you hand to the CLAW owner
│
├── .env.example
├── pnpm-workspace.yaml               # monorepo
├── package.json
├── tsconfig.base.json
├── vercel.ts                         # Vercel config
├── turbo.json                        # Turborepo
└── README.md
```

### Why a monorepo
Web, MCP, worker, ACP bridge, and SDK all share types and DBC client code. pnpm workspaces + Turborepo keep them in sync. One `git push` → Vercel previews the web app, GitHub Actions tests programs.

---

## 8. Install + bootstrap commands

```bash
# prerequisites
node -v        # need >= 24
pnpm -v        # >= 9
rustc --version  # for Anchor programs
solana --version # 1.18+
anchor --version # 0.30+

# clone
git clone <repo-url> clawpump-launchpad
cd clawpump-launchpad

# install workspaces
pnpm install

# core SDKs (already in package.json, listed here for clarity)
# @meteora-ag/dynamic-bonding-curve-sdk  — the bonding curve
# @solana/web3.js + @solana/spl-token    — base Solana
# @jup-ag/api                             — Jupiter Ultra
# @virtuals-protocol/acp-node             — ACP bridge
# @virtuals-protocol/game                 — GAME framework hooks
# @modelcontextprotocol/sdk               — MCP server

# dev (Vercel CLI)
npm i -g vercel       # required per session hook
vercel link
vercel env pull       # pull env vars into .env.local

# Solana devnet setup
solana config set --url devnet
solana-keygen new --outfile ~/.config/solana/devnet.json
solana airdrop 5

# build Anchor programs
cd programs/platform-fee-router && anchor build
cd ../claw-tier-gate-hook && anchor build

# run web dev
pnpm --filter web dev

# run MCP server locally
pnpm --filter mcp dev

# run worker
pnpm --filter worker dev
```

### Required env vars (`.env.example`)
```
# Solana
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=...
SOLANA_RPC_WS=wss://mainnet.helius-rpc.com/?api-key=...
SOLANA_DEVNET_RPC=https://api.devnet.solana.com
PLATFORM_KEYPAIR_PATH=./.keys/platform.json
FEE_COLLECTOR_WALLET=...
KNTWS_BUYBACK_WALLET=...

# Tokens
CLAW_MINT=739dnZEG4yaBWFsY8L8ZwrfhGG6dhtCSercW8Umspump
KNTWS_BASE_ADDR=...
KNTWS_SOL_WRAPPED_MINT=...

# Meteora DBC
DBC_PROGRAM_ID=dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN
DBC_PARTNER_CONFIG_KEY=...   # set after running deploy-dbc-config.ts

# Jupiter
JUPITER_API_URL=https://lite-api.jup.ag/swap/v1

# Database
DATABASE_URL=postgres://...

# Virtuals ACP
ACP_PROVIDER_KEY=...
ACP_AGENT_ID=019ddb0b...   # KaiNova ID from prior session
KNTWS_TREASURY_BASE=...

# Helius / Birdeye
HELIUS_API_KEY=...
BIRDEYE_API_KEY=...

# Vercel
NEXT_PUBLIC_SITE_URL=https://clawpump.tech
```

---

## 9. Day-1 launch script (key code)

The single tx that creates the launchpad's master partner config — run **once** at deploy:

```ts
// scripts/deploy-dbc-config.ts
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { DynamicBondingCurveClient, BaseFeeMode } from '@meteora-ag/dynamic-bonding-curve-sdk'
import { BN } from 'bn.js'

const conn = new Connection(process.env.SOLANA_RPC_URL!, 'confirmed')
const client = new DynamicBondingCurveClient(conn, 'confirmed')
const platform = Keypair.fromSecretKey(/* load from PLATFORM_KEYPAIR_PATH */)

const tx = await client.pool.createConfigAndPool({
  payer: platform.publicKey,
  config: Keypair.generate(),
  feeClaimer: new PublicKey(process.env.FEE_COLLECTOR_WALLET!),
  leftoverReceiver: new PublicKey(process.env.FEE_COLLECTOR_WALLET!),
  quoteMint: new PublicKey(process.env.CLAW_MINT!),   // THE LINE THAT MATTERS
  poolFees: {
    baseFee: {
      cliffFeeNumerator: new BN('100000000'),   // 1%
      firstFactor: 12,                            // 12 anti-snipe periods
      secondFactor: new BN('60'),                 // each 60s long
      thirdFactor: new BN('500000000'),           // start at 5% then decay
      baseFeeMode: BaseFeeMode.FeeSchedulerLinear,
    },
    dynamicFee: undefined,
  },
  activationType: 0,                              // by slot
  collectFeeMode: 0,                              // fees in CLAW only
  migrationOption: 1,                             // DAMM v2 (better LP UX)
  tokenType: 0,                                   // SPL (upgrade to Token-2022 in v2)
  tokenDecimal: 9,
  migrationQuoteThreshold: new BN(100_000 * 1e9), // 100k CLAW to graduate
  partnerLiquidityPercentage: 25,
  creatorLiquidityPercentage: 25,
  partnerPermanentLockedLiquidityPercentage: 50,  // locked LP forever
  creatorPermanentLockedLiquidityPercentage: 0,
})

// sign + send tx, save the config pubkey → DBC_PARTNER_CONFIG_KEY env var
```

After this runs once, every user launch is just `client.pool.createPool({ config: PARTNER_CONFIG, ...userInputs })` — much smaller per-launch cost.

Ref: [DBC TS SDK](https://github.com/MeteoraAg/dynamic-bonding-curve-sdk), [createConfigAndPool docs](https://github.com/MeteoraAg/dynamic-bonding-curve-sdk/blob/main/packages/dynamic-bonding-curve/docs.md).

---

## 10. The route a user takes (concrete UX walkthrough)

**User Alice wants to launch $PEPE2 on clawpump.tech:**

1. Connects Phantom. App reads her CLAW balance.
2. If CLAW < 10k → "You need 10k CLAW. [Buy CLAW with SOL]" → Jupiter Ultra swap modal embedded. One click, swaps in ~2s.
3. Now Cub tier. She fills `/launch` form: name "PEPE2", symbol "PEPE2", image upload, optional dev-buy (in CLAW).
4. Submit → backend calls `client.pool.createPool` with our `PARTNER_CONFIG` → tx signed by Alice. Pool created, CLAW spent (10k launch + dev-buy).
5. Token page goes live at `/token/<mint>`. Live chart shows curve state, CLAW-denominated price.

**User Bob wants to buy $PEPE2:**

1. Connects Phantom. Has 50k CLAW (Cub).
2. Goes to `/token/PEPE2`, enters "1000 CLAW", clicks Buy.
3. Backend builds DBC swap tx → Bob signs. CLAW leaves wallet, PEPE2 arrives.
4. 1% fee taken: 30% → Alice (creator), 50% → platform, 20% → KNTWS buyback queue.

**User Carol holds 1.2M CLAW (Apex):**

1. Goes to `/apex` dashboard.
2. Sees: APY pool balance, her share, last weekly payout, auto-airdrop history of every token launched this week.
3. Trades are free for tokens she created. Trades on others cost 0% if she's Apex too.

**Carol's AI agent (via MCP):**

1. Carol opens Cursor, asks "launch a meme called BANANA, dev-buy 5k CLAW."
2. Cursor calls our MCP `createToken` tool → backend signs with Carol's session key → tx complete in 10s, no web UI needed.

---

## 11. Updated risk register

| Risk | Severity | New mitigation since v0.1 |
|---|---|---|
| CLAW illiquidity for sellers | High | Built-in Jupiter sell-route: PEPE2 → CLAW → SOL → user wallet, atomic in one tx |
| User onboarding friction | High | Embedded SOL→CLAW Jupiter Ultra swap; 60-sec onboarding |
| Bot snipers at launch | Med | DBC fee scheduler 5%→1% over 12 slots; Vercel BotID on `/api/launch` |
| KNTWS cross-chain settlement (ACP) | Med | Phase 2; ship pure Solana flow first |
| Token-2022 transfer hook integration breaks Jupiter routes | Med | Use SPL in v1; only migrate to Token-2022 hook in v2 after Jupiter compatibility test |
| CLAW owner says no | Med | KNTWS-on-Solana wrap is the fallback. Same architecture, different quote mint |
| Smart contract risk on platform-fee-router | Low | Audit ($10–15k) before mainnet |
| Solana RPC fail / congestion | Low | Helius + Triton redundancy, retry logic in worker |

---

## 12. Money + time

### Costs to mainnet
- Helius Pro RPC: $200/mo
- Vercel Pro: $20/mo (scales)
- Vercel Postgres / Neon: $30/mo
- Birdeye API: $100/mo
- Audit (router + hook programs): $15k one-time
- Seed CLAW/SOL liquidity (in partnership with CLAW team): ~$5k
- Marketing/KOL: variable
- **Total to live mainnet:** ~$25–40k + 6–8 weeks of build

### Revenue projection (conservative)
- Month 1: 50 launches/day, $200 avg fee revenue/launch → $10k/day → $300k/mo
- Month 3: 200 launches/day, $400 avg → $80k/day → $2.4M/mo
- Month 6 (Virtuals trajectory): $200k/day = $6M/mo

---

## 13. Partnership pitch to CLAW owner — the one-pager

**Title:** *"Make every memecoin on Solana a buy-pressure event for CLAW."*

**What we propose:**
- We build a pump.fun-style launchpad on `clawpump.tech` (which you own).
- Quote token = CLAW. Every launch, every buy, every sell drives CLAW volume.
- 20% of every fee gets auto-routed into KNTWS buyback (our side of the deal).
- Tiered holder perks (10k / 100k / 1M CLAW) creates structural demand for CLAW supply.
- We bring the build (8 weeks, $25–40k cost), KaiNova agent integration, ACP cross-chain commerce, marketing.

**What you (CLAW) get:**
- Volume on CLAW pair on Meteora DAMM, where you earn LP fees.
- Demand sink: tier system locks up CLAW at 3 levels.
- Brand: ClawPump becomes "the Solana Virtuals" — bigger story than "agent gas-free pump launcher."
- Optional: revshare on platform fees.

**Ask:**
- Permission to use clawpump.tech (we both own it, so this is internal).
- Co-marketing: joint announce, you tweet, KOLs.
- Initial CLAW/SOL liquidity top-up so sellers can exit easily during ramp.

**Timeline:** PoC in 2 weeks. Closed beta in 6. Public launch in 8.

---

## 14. Updated feasibility — 82 / 100 (up from 78)

| Dimension | v0.1 | v0.2 | Why up |
|---|---|---|---|
| Technical buildability | 95 | 95 | Same |
| Smart contract risk | 80 | 82 | Token-2022 hook is well-precedented (Civic example) |
| UX viability | 60 | 75 | Embedded Jupiter Ultra onboarding solves the cold-CLAW problem |
| Economic / demand viability | 55 | 70 | Virtuals' $4B mcap precedent — pattern is proven |
| Partnership dependency | 70 | 90 | You already own clawpump.tech — no third-party permission needed |
| Time-to-market | 85 | 80 | Repo scope is bigger now (MCP, ACP bridge, hook program) |
| **Composite** | **78** | **82** | |

---

## 15. Open decisions for you to make before week 1

These need your call before code starts:

1. **Token-2022 from day 1, or SPL v1 → upgrade later?** Recommendation: SPL v1 (less risk, Jupiter-compatible immediately). Move to Token-2022 hook in month 3.
2. **DAMM v1 or v2 for graduation?** Recommendation: **v2** (better LP UX, supports dynamic fees post-grad).
3. **Migration threshold in CLAW: 50k / 100k / 250k?** Recommendation: **100k CLAW** (sweet spot — fast enough that tokens graduate, slow enough that the curve gives a real ride).
4. **KNTWS buyback %: 10 / 20 / 30?** Recommendation: **20%** (meaningful for us, palatable for CLAW community).
5. **Tier thresholds: 10k / 100k / 1M, or higher/lower?** Recommendation: keep your numbers — they're intuitive.
6. **ACP cross-chain bridge: phase 1 or phase 2?** Recommendation: **phase 2** (don't block Solana launch on Base bridge complexity).
7. **Repo public or private at launch?** Recommendation: **private until mainnet**, public after, with a "fair source" license (BUSL-style) for 24 months.

---

## 16. Source index (v2, expanded)

**Virtuals Protocol (the precedent)**
- [Virtuals Whitepaper – Standard Launch](https://whitepaper.virtuals.io/info-hub/builders-hub/more-on-standard-launch)
- [GAME framework overview](https://docs.game.virtuals.io/game-overview)
- [GAME Python SDK](https://github.com/game-by-virtuals/game-python)
- [GAME TS SDK](https://github.com/game-by-virtuals/game-node)
- [ACP whitepaper](https://whitepaper.virtuals.io/about-virtuals/agent-commerce-protocol-acp)
- [ACP v2 intro](https://whitepaper.virtuals.io/acp-product-resources/introducing-acp-v2)
- [acp-cli](https://github.com/Virtual-Protocol/acp-cli)
- [acp-node SDK](https://www.npmjs.com/package/@virtuals-protocol/acp-node)
- [DEXTools VIRTUAL 2026 guide](https://www.dextools.io/tutorials/what-is-virtuals-protocol-ai-agents-base-guide-2026)

**Meteora DBC (the engine)**
- [Meteora DBC program](https://github.com/MeteoraAg/dynamic-bonding-curve)
- [Meteora DBC TS SDK](https://github.com/MeteoraAg/dynamic-bonding-curve-sdk)
- [DBC SDK docs.md](https://github.com/MeteoraAg/dynamic-bonding-curve-sdk/blob/main/packages/dynamic-bonding-curve/docs.md)
- [Bonding curve formulas](https://docs.meteora.ag/overview/products/dbc/bonding-curve-formulas)

**Pump.fun (the UX inspiration)**
- [Flashift bonding curve guide](https://flashift.app/blog/bonding-curves-pump-fun-meme-coin-launches/)
- [Bhavya Batra math](https://medium.com/@buildwithbhavya/the-math-behind-pump-fun-b58fdb30ed77)
- [Bitquery pump→pumpswap migration](https://docs.bitquery.io/docs/blockchain/Solana/Pumpfun/pump-fun-to-pump-swap/)

**ClawPump (the platform we already own)**
- [clawpump.tech](https://clawpump.tech/)
- [Pine Analytics ClawPump explainer](https://x.com/PineAnalytics/status/2058551089243287613)
- [TradingView MCP server launch](https://www.tradingview.com/news/coinmarketcal:b0d7bdc43094b:0-clawpump-tech-claw-mcp-server-launch-31-march-2026/)

**Jupiter (the routing)**
- [Jupiter Next.js example](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Quicknode Ultra swap guide](https://www.quicknode.com/guides/solana-development/3rd-party-integrations/jupiter-ultra-swap)
- [Quicknode trading bot guide](https://www.quicknode.com/guides/solana-development/3rd-party-integrations/jupiter-api-trading-bot)

**Token-2022 transfer hook (the gate)**
- [Solana transfer hook guide](https://solana.com/developers/guides/token-extensions/transfer-hook)
- [Chainstack token-2022 deep dive](https://chainstack.com/solana-token-2022-fee-transfer-hooks/)
- [Civic Pass transfer hook example](https://github.com/civicteam/token-extensions-transfer-hook)

**Solana ecosystem context**
- [Solana Foundation awesome-solana-ai](https://github.com/solana-foundation/awesome-solana-ai)
- [Solana-trade multi-DEX router](https://github.com/FlorianMgs/solana-trade)
