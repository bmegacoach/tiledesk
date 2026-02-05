<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## CLEAN CHIEFSOS DEPLOY PLAN (Anti-Gravity Executable)

**Locked Config**:

- **Primary API**: Kimi K2.5 (instant/thinking/swarm)
- **Dev**: Claude Code plugin **in Antigravity** (Gemini base)
- **Hosting**: Cloudflare Moltworker (primary) + Mac Mini Tailscale (fallback)
- **Agents**: 5 C-suite + 11 employees (file:55) → MEMORY.md
- **Patterns**: Mani agency (SOPs/business brain), Greg/Nate (personal/business personas/dashboard)
- **Prompting**: Proactive employee + reverse ("Goal → Questions?")

**Drop this into Antigravity** → `@claude Execute full plan`.

***

## PHASE 1: CLOUDFLARE MOLTWORKER (PRIMARY — 20 MIN)

```bash
# Local terminal
npm install -g wrangler
wrangler login

git clone https://github.com/cloudflare/moltworker.git && cd moltworker
npm install

# wrangler.toml (Kimi only + R2)
```

```toml
name = "chiefos-moltworker"
compatibility_date = "2026-01-31"

[[env.production.vars]]
KIMI_BASE_URL = "https://platform.moonshot.ai/v1"
MODELS = "kimi-k2.5-instant,kimi-k2.5-thinking,kimi-k2.5-swarm"

[[r2_buckets]] binding = "CHIEFSOS_LTM" bucket_name = "chiefos-memory"
```

```bash
wrangler secret put KIMI_API_KEY  # Your Moonshot key
echo $(openssl rand -hex 32) | wrangler secret put GATEWAY_TOKEN
wrangler deploy
```

**UI**: `https://chiefos-moltworker.your-subdomain.workers.dev` → Enable Access Policy (email auth).

***

## PHASE 2: MAC MINI TAILSCALE FALLBACK (OPTIONAL — 15 MIN)

```bash
# Fresh Mac Mini
# Tailscale: https://tailscale.com/download → Install → tailscale up --authkey=yourkey
curl -fsSL https://molt.bot/install.sh | bash
moltbot onboard  # Kimi config, Tailscale IP only
```


***

## PHASE 3: ANTI-GRAVITY + CLAUDE CODE SETUP (15 MIN)

**Local Antigravity** (primary dev):

```bash
# In Antigravity (VSCode fork)
# Install Claude Code extension
code --install-extension anthropic.claude-code

# Terminal: CLI mode
npm install -g @anthropic-ai/claude-code
claude login  # Claude Max key (for frontend reasoning)

# Workspace: ~/chiefos/ (git init + remote)
```

**Use**: `claude "Design GBB dashboard"` → Code in Antigravity (Supabase LTM access).[^1][^2]

**VPS Antigravity**: Mirror workspace via git.

***

## PHASE 4: CORE CONFIG + PATTERNS (20 MIN — Moltworker UI)

### 4.1 SYSTEM.md (Chief Prompt — Proactive + Patterns)

```
# ChiefOS v2.0 (Proactive Employee)
API: Kimi K2.5 only (instant/quick, thinking/reason, swarm/parallel)

MINDSET: New hire. Self-unblock. Reverse: "Goal: GBB launch → Questions?"
PATTERNS:
- MANI AGENCY: SOP injection, business brain (MEMORY.md)
- GREG PERSONAL/BUSINESS: Discord personas (#personal-coach, #business-ceo)
- NATE DASHBOARD: Kanban + heartbeat (To-do/In Progress/Done)

AGENTS: 5 C-suite + 11 employees (below)
SECURITY: Classifier + Tailscale + sandbox
ROUTING: Cost-controller (instant=status, swarm=complex)
```

`moltbot load-context SYSTEM.md`

### 4.2 MEMORY.md (Agency Brain + All 16 Agents)

```
# Business Brain (Mani‑style)
COMPANIES: CoachAI(primary), GBB(stablecoin), Camp(RWA)
SOPs/PRICING: [Your details]

TEAM (file:55):
## C-SUITE (5):
- CEO: [Profile/prompt from file:55]
- COO: [Goggins‑style ops, Greg personal]
- CMO: Content repurposing (Mani)
- CFO: Treasury hygiene
- CTO: DevOps + Claude Code integration

## EMPLOYEES (11):
- Sales Dev Rep: After-hours leads
- Lead Qual Pipeline
- Content Repurposing
- Email Triage
- Contract Audit
- CRM Hygiene
- Client Renewal
- Research Prep
- Strategic Calendar
- Sales Coach (CFO roleplay)
- Response Quality

LTM: Daily journal append.
```

`moltbot load-context MEMORY.md`

### 4.3 Key Skills (Mani/Nate/Greg)

```
# Load these:
skills/shadow-ceo.md     # Nate dashboard + Mani reports
skills/heartbeat.md      # Proactive pings (30m)
skills/journal.md        # Daily LTM summary (11PM)
skills/classifier.md     # Anti-injection scan
skills/personas.md       # Greg Discord (#personal, #business)
skills/sandbox.md        # Exe.dev code exec
```

`moltbot skills load ~/chiefos/skills/*`

***

## PHASE 5: REPORTING + CRON (10 MIN)

Control UI → Cron:

```
# Daily brief (8AM CST)
0 8 * * * moltbot skills run reports/morning-brief → Telegram/Discord/Local Supabase

# 4hr ops
0 */4 * * * moltbot skills run reports/ops-4h

# Journal
23 23 * * * moltbot skills run journal → MEMORY.md
```


***

## PHASE 6: FULL TEST (10 MIN)

Telegram/Discord → Chief:

```
1. "Status + list agents"  # All 16 live
2. "Goal: Camp RWA. Questions?"  # Reverse prompting
3. "Build STR lead skill"  # Mani factory
4. Wait 30m → Heartbeat ping
```

**Success**: Agents responding, dashboard in Discord, journal appending.

***

## CLEAN ARCHITECTURE DIAGRAM

```
Moltworker (Primary)
├── Kimi K2.5
├── Chief (Proactive/Reverse)
├── MEMORY.md (16 Agents + Agency Brain)
├── Skills (Dashboard/Heartbeat/Journal)
└── Cron → Telegram/Discord/Supabase

Mac Mini (Tailscale Fallback) ─┬── Antigravity (Local Dev + Claude Code)
                               └── VPS Mirror
```

**Total Time**: 90 min. **Drop in Antigravity** → `@claude Execute step-by-step`. Live by 4:15AM. Output first deploy log here.[^3][^4]

<div align="center">⁂</div>

[^1]: https://www.linkedin.com/posts/juliangoldieseo_antigravity-claude-code-build-anything-activity-7415044956333064192-8L7u

[^2]: https://code.claude.com/docs/en/vs-code

[^3]: Agent-Employee-Framework.pdf

[^4]: https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/

