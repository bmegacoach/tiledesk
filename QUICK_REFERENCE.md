# 🚀 Antigravity Quick Reference Card

## Superpowers Commands

| Trigger | Skill | What It Does |
|---------|-------|--------------|
| "brainstorm [idea]" | superpowers-core | Explore 3+ approaches before coding |
| "write plan for [task]" | superpowers-core | Structured implementation plan |
| "execute the plan" | superpowers-core | Step-by-step with checkpoints |
| "debug [error]" | superpowers-core | Systematic hypothesis-driven debug |
| "review this code" | superpowers-core | Quality checklist and recommendations |

## Session Commands

| Trigger | Skill | What It Does |
|---------|-------|--------------|
| "save context" | context-management | Save state to SESSION_STATE.md |
| "load context" | context-management | Restore previous session |
| "handoff to [agent]" | context-management | Create AUTONOMOUS_TASK.md |

## Development Commands

| Trigger | Skill | What It Does |
|---------|-------|--------------|
| "scaffold [type]" | typescript-development | Create TypeScript boilerplate |
| "commit changes" | git-workflows | Smart conventional commit |
| "onboard project" | git-workflows | Quick project understanding |
| "create PR" | git-workflows | Enhanced PR description |

## Deployment Commands

| Trigger | Skill | What It Does |
|---------|-------|--------------|
| "deploy to cloudflare" | deployment-strategies | Worker deployment with checks |
| "deploy to VPS" | deployment-strategies | Docker + Tunnel setup |
| "rollback" | deployment-strategies | Quick rollback procedures |

## Testing Commands

| Trigger | Skill | What It Does |
|---------|-------|--------------|
| "add tests for [function]" | unit-testing | Generate test suite |
| "debug failing test" | unit-testing | Systematic test debugging |

## Documentation Commands

| Trigger | Skill | What It Does |
|---------|-------|--------------|
| "document [project/api]" | documentation-generation | Generate README/API docs |
| "create ADR for [decision]" | documentation-generation | Architecture Decision Record |
| "diagram [system]" | documentation-generation | Mermaid diagrams |

## Agent Commands

| Trigger | Skill | What It Does |
|---------|-------|--------------|
| "delegate to [agent]" | agent-orchestration | Create handoff package |
| "coordinate agents" | agent-orchestration | Multi-agent optimization |
| "improve [agent]" | agent-orchestration | Agent enhancement |

---

## BRAIN Protocol (Optimal Prompts)

```
B - Brief the objective (one clear sentence)
R - Reference context (files, state, prior work)
A - Assert constraints (what NOT to do)
I - Invoke skills explicitly when needed
N - Next steps (what happens after)
```

### Example
```
Continue Cashflow Trustee testing.
- Load: AUTONOMOUS_TASK.md from cashflow-trustee folder
- Status: Backend generateForm API has bug
- Constraint: Don't change Firebase config
- After: Run emulator test to verify fix
```

---

## Emergency Commands

```
# If stuck
"Create BLOCKED.md with: [issue], [attempts], [what would unblock]"

# If context lost
"Session recovery: Load all .md files in Chief OS root"

# If errors accumulating
"Stop. Log state to ERRORS.log. Report for human decision."
```

---

## Skills Location
`c:\Users\Troy\Chief OS\skills\`

## Moltworker Skills
`c:\Users\Troy\Chief OS\moltworker\skills\`
