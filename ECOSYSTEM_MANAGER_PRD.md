# ECOSYSTEM MANAGER PRD
## CoachAI Camp / Goldbackbond / CAMP Synthetic Stablecoin & Marketplace
### Multi-Token Treasury & IDL Management System

**Version**: MVP 1.0  
**Architecture**: Moltworker (Cloudflare Workers) + LayerZero Omnichain  
**Planning LLM**: Claude Opus 4.5  
**Execution LLM**: Kimi K2.5  
**Development Method**: Ralph/BMAD (Continuous Autonomous Agents)  
**Last Updated**: February 1, 2026

---

## EXECUTIVE SUMMARY

The Ecosystem Manager is a secure, autonomous agent system managing three interconnected token economies:

1. **Goldbackbond (GBB)**: Stablecoin backed by tokenized real assets
2. **CAMP Synthetic Stablecoin**: Ecosystem-native stable asset for CoachAI Camp operations
3. **Camp Marketplace**: Bondcurve launchpad for tokenized projects (new token issuance)

The system operates on Base as the core chain, leveraging LayerZero for omnichain interoperability, enabling access to liquidity and contracts across all supported chains (Solana, Arbitrum, Ethereum, etc.).

---

## SYSTEM ARCHITECTURE

### Core Runtime: Moltworker (Cloudflare Workers)

Replace legacy Eliza infrastructure with Moltworker for:
- **Security**: Docker sandbox per task, Zero Trust auth, no VPS key exposure
- **Cost**: $5/month Workers Paid + R2 storage (10GB free)
- **Scalability**: Edge-deployed, auto-scaling with load
- **Context**: Instant access to moltbot-skills repository (forked)

### Chain Infrastructure

| Component | Technology | Purpose |
|-----------|------------|---------|
| Core Chain | Base | Primary contract deployment, GBB & CAMP tokens |
| Omnichain | LayerZero OFT/OAPP | Cross-chain token transfers, unified liquidity |
| Contract Notation | Eth-Inscriptions | Token allocation contracts, sales agreements |
| Monitoring | Custom LayerZero Relayers | Cross-chain message verification |

---

## TOKEN SYSTEMS BREAKDOWN

### 1. Goldbackbond (GBB) Stablecoin

**Purpose**: Asset-backed stablecoin representing tokenized real-world assets (real estate, gold, etc.)

**MVP Scope**:
- Read-only: Monitor token supply, collateral ratio, redemption queue
- Track: Bond issuance, maturity dates, yield accrual
- Smart Contracts: LayerZero OFT (Omnichain Fungible Token) for cross-chain GBB

**Data Tracked**:
- Total Supply (all chains)
- Per-chain supply (via LayerZero)
- Collateral backing (off-chain oracle + on-chain verification)
- Redemption requests (queue status)
- Bond maturity calendar

### 2. CAMP Synthetic Stablecoin

**Purpose**: Ecosystem-native stable asset for CoachAI Camp internal operations, rewards, and marketplace transactions

**MVP Scope**:
- Monitor: Mint/burn events, peg status, collateralization
- Track: Treasury reserves, synthetic asset backing
- Smart Contracts: LayerZero OFT with custom minting logic (governor-controlled)

**Data Tracked**:
- Total Supply (CAMP)
- Synthetic backing (collateral assets)
- Peg deviation (vs USD)
- Mint/Burn events (24h, 7d, 30d)
- Treasury reserve allocation

### 3. Camp Marketplace (Bondcurve Launchpad)

**Purpose**: Token launchpad using bonding curve mechanics for fair token distribution

**MVP Scope**:
- Monitor: Active launches, bondcurve progress, token supplies
- Track: Launch parameters (start price, curve slope, max supply)
- Smart Contracts: Bondcurve factory with Eth-inscription metadata

**Data Tracked**:
- Active launches (count, progress %)
- Historical launches (completed, failed)
- Bondcurve parameters (start price, slope, liquidity)
- Trading volume (24h, 7d)
- Fee collection (CAMP denominated)

---

## GOVERNANCE & OVERSIGHT

### The Governor

An overarching governance agent with veto and emergency shutdown capabilities:

**Responsibilities**:
- Approve treasury movements above threshold ($X value)
- Validate cross-chain bridge operations
- Emergency pause functionality for all three systems
- Set risk parameters (collateral ratios, slippage limits)

**MVP Implementation**:
- Read-only governor monitoring
- Alert-based approval workflow (human-in-the-loop for execution)
- Emergency pause via multisig simulation

### Agent Hierarchy (Ralph/BMAD Method)

**Chief Agent** (Overseer):
- Task assignment to worker agents
- Strategic decision approval
- 4-hour operational reports review
- Daily brief consumption

**Worker Agents** (Moltworker Instances):

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **GBB Agent** | Treasury Monitor | Goldbackbond supply tracking, collateral monitoring, bond maturity alerts |
| **CAMP Agent** | Stablecoin Manager | CAMP synthetic tracking, peg monitoring, treasury reserve analysis |
| **Marketplace Agent** | Launchpad Monitor | Active bondcurve tracking, launch validation, fee monitoring |
| **Governor Agent** | Risk & Security | Cross-chain message verification, risk parameter enforcement, emergency response |
| **Moltbook Observer** | Intelligence | Read-only monitoring of Moltbook for relevant skills, exploits, market intelligence |
| **Moltbook Promoter** | Marketing (ISOLATED) | Limited agent for CAMP IDL promotion, high security, manual approval for posts |

---

## SECURITY ARCHITECTURE

### Core Principle: Ecosystem Isolation

The Ecosystem Manager operates in a **fortress architecture** where:
- Internal treasury agents CANNOT be reached from external networks
- All external data flows through **buffer zones**
- No secrets stored in accessible locations (Cloudflare R2 encrypted)

### Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│  EXTERNAL NETWORK (Untrusted)                               │
│  ├─ Moltbook API (read-only)                               │
│  ├─ n8n / GHL / TweetPilot (export only)                   │
│  └─ Goldbackbond Agency (token allocation contracts)       │
├─────────────────────────────────────────────────────────────┤
│  BUFFER ZONE (Cloudflare Workers - Validation)             │
│  ├─ Input Sanitization                                     │
│  ├─ Schema Validation (Zod/Pydantic)                       │
│  ├─ Rate Limiting                                          │
│  └─ Audit Logging (immutable R2 logs)                      │
├─────────────────────────────────────────────────────────────┤
│  CORE ECOSYSTEM (Moltworker - Trusted)                     │
│  ├─ GBB Agent                                              │
│  ├─ CAMP Agent                                             │
│  ├─ Marketplace Agent                                      │
│  ├─ Governor Agent                                         │
│  └─ Moltbook Observer (read-only)                          │
├─────────────────────────────────────────────────────────────┤
│  ISOLATED PROMOTER (Separate Moltworker Instance)          │
│  ├─ Moltbook Promoter Agent (write access, heavily guarded)│
│  └─ Manual approval workflow for all posts                 │
└─────────────────────────────────────────────────────────────┘
```

### Key Management

- **MVP**: Read-only monitoring (no private keys needed)
- **Execution Phase**: Hardware Security Module (HSM) or AWS KMS for signing
- **Governor**: Multisig (Gnosis Safe) with 2-of-3 signatures required for high-value

---

## SKILLS REPOSITORY

### Structure

```
moltbot-skills/
├── protocols/
│   ├── layerzero-oapp.md      # LayerZero integration patterns
│   ├── base-treasury.md       # Base network treasury ops
│   └── bondcurve-math.md      # Bondcurve calculations
├── monitoring/
│   ├── supply-tracker.md      # Token supply monitoring
│   ├── risk-alerts.md         # Risk parameter monitoring
│   └── cross-chain-verify.md  # LayerZero message verification
├── execution/
│   ├── swap-execution.md      # DEX swap execution (post-MVP)
│   ├── rebalance-strategy.md  # Treasury rebalancing (post-MVP)
│   └── emergency-pause.md     # Emergency shutdown procedures
└── intelligence/
    ├── moltbook-parser.md     # Moltbook data extraction
    └── exploit-detector.md    # Security vulnerability detection
```

### Compounding Loop

1. Agent executes task using skill
2. Outcome logged (success/failure, metrics)
3. Claude Opus 4.5 (Planning) analyzes logs, proposes skill improvement
4. Kimi K2.5 (Execution) validates and implements skill update
5. PR opened to `moltbot-skills` fork
6. Chief reviews and merges
7. All agents reload skills (git pull + restart)

---

## MVP ROADMAP

### Phase 1: Foundation (Week 1-2)

**Setup**:
- [ ] Moltworker deployment (Cloudflare Workers)
- [ ] `moltbot-skills` fork configuration
- [ ] LayerZero endpoint integration (Base)
- [ ] Monitoring setup for GBB, CAMP, Marketplace contracts

**Agents** (Read-Only):
- [ ] GBB Agent: Supply monitoring
- [ ] CAMP Agent: Supply + peg monitoring
- [ ] Marketplace Agent: Launch tracking
- [ ] Governor Agent: Basic risk monitoring

**Infrastructure**:
- [ ] Zero Trust auth (email + TOTP)
- [ ] R2 storage for logs
- [ ] Buffer layer for data imports
- [ ] Plugin dashboard for exports

### Phase 2: Intelligence (Week 3-4)

**Moltbook Integration**:
- [ ] Observer Agent (read-only monitoring)
- [ ] Skills extraction and PR workflow
- [ ] Promoter Agent setup (isolated instance)

**Reporting**:
- [ ] 4-hour operational report automation
- [ ] Daily brief generation
- [ ] Alert system (Discord/Telegram via n8n)

### Phase 3: Execution (Post-MVP)

**Smart Contract Completion**:
- [ ] GBB OFT deployment (LayerZero)
- [ ] CAMP OFT deployment with minting logic
- [ ] Camp Marketplace factory
- [ ] Governor contract (multisig)

**Execution Capabilities**:
- [ ] Treasury rebalancing (automated)
- [ ] Cross-chain arbitrage
- [ ] Bondcurve management
- [ ] Emergency pause automation

---

## OPERATIONAL CADENCE

**4-Hour Operational Report**:
- Supply metrics for all tokens
- Collateral ratio status
- Active launches progress
- Risk status (GREEN/YELLOW/RED)
- Cross-chain message verification count
- Security alerts from Moltbook Observer

**Daily Brief**:
- 24h supply changes
- Launch summary
- Risk parameter status
- Intelligence highlights
- Prioritized tasks

> Clarifications handled within operational reviews and daily reports.
