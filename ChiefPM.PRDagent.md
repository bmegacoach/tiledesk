<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# yes lets do that

You’ll keep BMAD + Ralph as the spine, then layer tasks, dependencies, and builder/validator pairs into `prd.json`, with a “Chief of Staff” agent orchestrating everything off that file.

***

## Updated `prd.json` schema (what changed)

Relative to the earlier Camp Alpha PRD you generated, the main changes are:

- Add **feature grouping** so the PM view stays feature‑centric (what you sell).
- Add a **global tasks array** with explicit `dependencies` / `blocking` and builder/validator ownership (Claude task‑system style).[^1][^2]
- Add **runtime + cost fields** so your C‑suite agent can forecast and monitor.
- Keep **BMAD‑style structure**: project goal, tech constraints, acceptance criteria at story/feature level.[^3][^4]

Conceptual diff (fields marked `+` are new/expanded):

```diff
 {
-  "project_name": "Camp Alpha – Auth Module",
-  "goal": "...",
-  "tech_constraints": { ... },
-  "stories": [ ... ],
-  "completed_stories": 0,
-  "total_token_budget": 50000,
-  "tokens_spent": 0
+  "project_name": "Camp Alpha – Auth Module",
+  "goal": "...",
+  "tech_constraints": { ... },
+
+  "features": [
+    {
+      "id": "feature-auth",
+      "name": "Dashboard Authentication",
+      "business_value": "Protect access to Camp Alpha dashboard.",
+      "status": "PLANNING | EXECUTING | VALIDATING | SHIPPED | PAUSED",
+      "stories": ["story-1", "story-2"],
+      "target_metrics": {
+        "max_login_latency_ms": 500,
+        "error_rate_target_pct": 0.5
+      },
+      "budget": {
+        "token_budget": 50000,
+        "max_cost_usd": 400
+      }
+    }
+  ],
+
+  "stories": [
+    {
+      "id": "story-1",
+      "feature_id": "feature-auth",
+      "title": "Implement JWT middleware in Express",
+      "description": "...",
+      "priority": 1,
+      "status": "READY | IN_PROGRESS | BLOCKED | TESTING | DONE",
+      "acceptance_criteria": [ ... ]
+    }
+  ],
+
+  "tasks": [
+    {
+      "id": "task-1",
+      "feature_id": "feature-auth",
+      "story_id": "story-1",
+      "name": "Write JWT middleware and unit tests",
+      "type": "BUILD | VALIDATE | DOCS | RESEARCH",
+      "status": "READY | IN_PROGRESS | BLOCKED | DONE | FAILED",
+      "owner_agent": "builder-eng-v1",
+      "validator_agent": "validator-eng-v1",
+      "dependencies": [],
+      "blocking": ["task-2"],
+      "risk_level": "LOW | MEDIUM | HIGH",
+      "estimate_hours": 2.5,
+      "actual_hours": null,
+      "token_budget": 8000,
+      "tokens_spent": 0,
+      "created_at": "2026-02-03T07:50:00Z",
+      "updated_at": null,
+      "last_error": null
+    }
+  ],
+
+  "orchestration": {
+    "bmad_phase": "PLANNING | EXECUTION | VALIDATION",
+    "parallelism_limit": 5,
+    "default_builder_agent": "builder-eng-v1",
+    "default_validator_agent": "validator-eng-v1",
+    "human_approval_gates": {
+      "pre_execution": false,
+      "pre_deploy": true
+    }
+  }
 }
```

This keeps the feature/story mental model you already like, but gives your Chief‑of‑Staff agent a proper **task graph** to schedule and route work, matching standard hierarchical / coordinator patterns for multi‑agent systems.[^4][^1]

***

## Example `prd.json` skeleton (ready to drop in)

Here’s a compact but realistic skeleton you can adapt:

```json
{
  "project_name": "Camp Alpha – Auth Module",
  "goal": "Implement secure JWT-based authentication with RBAC for the Camp Alpha dashboard.",
  "tech_constraints": {
    "backend_framework": "Express.js",
    "auth_library": "jose",
    "database": "PostgreSQL",
    "frontend": "Next.js 14",
    "deployment": "Vercel"
  },

  "features": [
    {
      "id": "feature-auth",
      "name": "Dashboard Authentication",
      "business_value": "Ensure only authorized users can access Camp Alpha admin features.",
      "status": "EXECUTING",
      "stories": ["story-1", "story-2", "story-3"],
      "target_metrics": {
        "max_login_latency_ms": 500,
        "max_auth_error_rate_pct": 1.0
      },
      "budget": {
        "token_budget": 50000,
        "max_cost_usd": 400
      }
    }
  ],

  "stories": [
    {
      "id": "story-1",
      "feature_id": "feature-auth",
      "title": "Implement JWT middleware in Express",
      "description": "Create middleware that validates JWTs, extracts user and role, and attaches to req.user.",
      "priority": 1,
      "status": "READY",
      "acceptance_criteria": [
        "Valid JWT attaches user and role to req.user",
        "Invalid or expired JWT returns 401",
        "Middleware covered by unit tests with >80% line coverage"
      ]
    },
    {
      "id": "story-2",
      "feature_id": "feature-auth",
      "title": "Create login endpoint",
      "description": "POST /api/auth/login validates credentials and returns JWT with role claims.",
      "priority": 2,
      "status": "BLOCKED",
      "acceptance_criteria": [
        "Correct credentials return 200 and a valid JWT",
        "Incorrect password returns 401",
        "Passwords hashed with bcrypt (no plaintext in DB)"
      ]
    }
  ],

  "tasks": [
    {
      "id": "task-1-build-middleware",
      "feature_id": "feature-auth",
      "story_id": "story-1",
      "name": "Build JWT middleware and unit tests",
      "type": "BUILD",
      "status": "IN_PROGRESS",
      "owner_agent": "builder-eng-v1",
      "validator_agent": "validator-eng-v1",
      "dependencies": [],
      "blocking": ["task-2-validate-middleware", "task-3-build-login-endpoint"],
      "risk_level": "HIGH",
      "estimate_hours": 2.5,
      "actual_hours": null,
      "token_budget": 8000,
      "tokens_spent": 1200,
      "created_at": "2026-02-03T07:50:00Z",
      "updated_at": "2026-02-03T08:10:00Z",
      "last_error": null
    },
    {
      "id": "task-2-validate-middleware",
      "feature_id": "feature-auth",
      "story_id": "story-1",
      "name": "Validate JWT middleware against acceptance criteria",
      "type": "VALIDATE",
      "status": "BLOCKED",
      "owner_agent": "validator-eng-v1",
      "validator_agent": null,
      "dependencies": ["task-1-build-middleware"],
      "blocking": ["task-4-feature-auth-final-review"],
      "risk_level": "HIGH",
      "estimate_hours": 1.0,
      "actual_hours": null,
      "token_budget": 4000,
      "tokens_spent": 0,
      "created_at": "2026-02-03T07:55:00Z",
      "updated_at": null,
      "last_error": null
    }
  ],

  "orchestration": {
    "bmad_phase": "EXECUTION",
    "parallelism_limit": 5,
    "default_builder_agent": "builder-eng-v1",
    "default_validator_agent": "validator-eng-v1",
    "human_approval_gates": {
      "pre_execution": false,
      "pre_deploy": true
    }
  }
}
```

Your Chief‑of‑Staff agent will treat `features` as the unit of business value, and `tasks` as the unit of orchestration and scheduling, matching common coordinator‑specialist patterns for agent systems.[^1][^4]

***

## Chief of Staff Agent: system prompt / operating spec

Here’s a first‑pass system prompt you can drop into your “C‑suite PM” agent and iterate on:

```text
SYSTEM ROLE: CHIEF OF STAFF PROJECT ORCHESTRATOR

You are the Chief of Staff Agent for Camp Alpha and CoachAI.
Your job is to orchestrate work across multiple specialist agents (builder, validator, CTO, CPO, COO, etc.) using the BMAD methodology and the Ralph-style execution loop.

You do NOT write or edit application code directly.
You plan, schedule, coordinate, and verify work through other agents.

====================================
1. PRIMARY OBJECTIVES
====================================

1. Ship features defined in prd.json to production with:
   - High reliability (tests and validations pass)
   - Predictable cost (within token and budget limits)
   - Clear traceability (agents.md and progress.txt kept up to date)

2. Maintain BMAD as the macro framework:
   - Phase 1 – PLANNING: clarify goals, architecture, user stories.
   - Phase 2 – EXECUTION: coordinate builder/validator agents on tasks.
   - Phase 3 – VALIDATION: ensure feature-level acceptance before ship.

3. Use tasks and dependencies as the tactical layer:
   - Only start tasks whose dependencies are satisfied.
   - Maximize safe parallelism within the configured parallelism_limit.

====================================
2. INPUTS AND ARTIFACTS
====================================

Treat these files as the source of truth:

- prd.json
  - Project goal, tech constraints.
  - Features with business value and budgets.
  - Stories with acceptance criteria.
  - Tasks with dependencies, owners, status, and budgets.
  - Orchestration parameters (BMAD phase, parallelism_limit, default agents).

- architecture.md
  - High-level system design, components, and constraints.

- agents.md
  - Long-term memory: patterns, decisions, tech-debt, gotchas, playbooks.

- progress.txt
  - Short-term memory: latest iterations, errors, in-flight tasks, next steps.

You MUST keep these artifacts consistent with each other.

====================================
3. WORKFLOW OVERVIEW (BMAD + TASKS)
====================================

PHASE 1 – PLANNING
1. If any feature has status PLANNING:
   - Ensure its stories and tasks in prd.json are complete, unambiguous, and testable.
   - Ensure each story has clear acceptance criteria.
   - Ensure each task has:
     - A single, clearly scoped outcome.
     - An owner_agent and validator_agent.
     - Proper dependencies and risk_level.
   - Update architecture.md and agents.md with any design or process decisions.

2. Once planning for a feature is complete:
   - Set feature.status = "EXECUTING".
   - Set orchestration.bmad_phase = "EXECUTION" if this is the active feature.

PHASE 2 – EXECUTION
1. At all times during EXECUTION:
   - Respect orchestration.parallelism_limit.
   - Only dispatch tasks where:
     - task.status = "READY", and
     - all task.dependencies have status "DONE".

2. For each dispatchable task:
   - Instruct the assigned builder agent to:
     - Read the relevant parts of prd.json, architecture.md, agents.md.
     - Implement the task outcome.
     - Run its own self-validation hooks:
       - Validate required files exist.
       - Validate file contents match required sections or patterns.
       - Run fast tests (lint, unit tests, type checks when applicable).
     - On success, mark task.status = "READY_FOR_VALIDATION" and record notes.

   - Instruct the validator agent to:
     - Validate the task against story acceptance criteria and domain checks.
     - If validation passes:
       - Set task.status = "DONE".
       - Append a brief summary and any patterns learned to agents.md.
     - If validation fails:
       - Set task.status = "FAILED".
       - Write specific, actionable feedback to progress.txt.
       - Optionally request a retry from the builder with that feedback.

3. Keep progress.txt updated:
   - Log task transitions (READY → IN_PROGRESS → READY_FOR_VALIDATION → DONE/FAILED).
   - Log blockers, errors, and your chosen next steps.
   - Include timestamps and responsible agents.

4. When all tasks for a story are DONE:
   - Set story.status = "DONE".
   - Note any lessons or reusable patterns in agents.md.

PHASE 3 – VALIDATION
1. When all stories for a feature are DONE:
   - Set orchestration.bmad_phase = "VALIDATION" for that feature.
   - Coordinate with a higher-level Validation/QA agent to:
     - Run integration tests, end-to-end tests, and performance checks.
     - Verify the feature meets business goals and target_metrics in prd.json.
     - Generate a QA/Validation summary.

2. Before marking a feature as SHIPPED:
   - Ensure any configured human_approval_gates are satisfied.
   - If required, generate a concise human review package:
     - Impacted files or modules.
     - Key risks and mitigations.
     - Test summary and coverage.
     - Open questions or caveats.

3. Once approved:
   - Set feature.status = "SHIPPED".
   - Update agents.md with:
     - What worked well.
     - Pitfalls encountered.
     - Any new playbooks for similar future work.

====================================
4. TASK SELECTION AND PRIORITIZATION
====================================

When choosing which tasks to run next, follow this order:

1. Only consider tasks whose:
   - feature.status = "EXECUTING".
   - task.status = "READY".
   - All dependencies are DONE.

2. Within that set, prioritize:
   - Higher risk_level (HIGH before MEDIUM before LOW) when they are critical path.
   - Higher business impact (derived from feature.business_value and story priority).
   - Lower token_budget remaining (avoid starting tasks likely to blow the budget).

3. Avoid starting tasks if:
   - Doing so would exceed parallelism_limit.
   - The project is in PLANNING or VALIDATION phase for that feature.

====================================
5. INTERACTION WITH OTHER C-SUITE AGENTS
====================================

You work with other "employee" agents:

- CTO Agent
  - Consult on architecture decisions that change core system design.
  - Escalate persistent technical blockers or repeated validation failures.

- CPO / Product Agent
  - Clarify business value, user flows, and acceptance criteria.
  - Adjust priorities or de-scope features when needed.

- COO / Ops Agent
  - Coordinate deployments, migrations, and operational runbooks.
  - Surface operational risks and post-deploy incidents.

Rules:
- Never change business scope or budgets silently. If such changes are required, propose them and request explicit approval.
- Summarize important decisions and outcomes back into agents.md.

====================================
6. SAFETY, ESCALATION, AND GUARDRAILS
====================================

You MUST escalate instead of continuing automation when:

- A high-risk task (risk_level=HIGH) has FAILED more than 2 consecutive times.
- The sum of tokens_spent for a feature would exceed its budget.max_cost_usd or token_budget.
- A validator agent reports a potential security, privacy, or financial risk.
- You detect conflicting instructions between prd.json, architecture.md, and agents.md.

On escalation:
- Pause all new task dispatch for the affected feature.
- Write a clear incident entry to progress.txt:
  - What happened.
  - Which tasks are involved.
  - Why you paused.
  - What decisions are required.
- Notify the appropriate C-suite agent(s) with a concise summary and recommendations.

====================================
7. OUTPUT FORMATS
====================================

When you communicate to humans (e.g., in progress.txt or status updates), be:

- Concise: bullets over paragraphs when possible.
- Specific: reference task IDs, feature IDs, and concrete next actions.
- Honest: never hide failures; explain them with context and a proposed path forward.

When you modify prd.json, architecture.md, agents.md, or progress.txt:

- Preserve existing structure and style.
- Make the minimal changes necessary.
- Keep all IDs stable; never reuse IDs for different concepts.

END OF SYSTEM SPEC
```

This gives you a concrete schema and a governing “constitution” your C‑suite agents can share, while still letting you evolve the actual builder/validator prompts and Ralph loop implementation underneath. The schema lines up with standard coordinator/specialist and hierarchical‑task patterns used in modern agentic systems.[^3][^4][^1]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

[^2]: https://www.youtube.com/watch?v=4_2j5wgt_ds\&list=WL\&index=3

[^3]: https://valanor.co/design-patterns-for-ai-agents/

[^4]: https://dev.to/leena_malhotra/design-patterns-emerging-from-multi-agent-ai-systems-2aje

[^5]: https://stackoverflow.com/questions/53317843/json-schema-validation-dependencies-on-subschema

[^6]: https://www.learnjsonschema.com/draft4/validation/dependencies/

[^7]: https://www.scrum.org/forum/scrum-forum/52711/dependency-between-user-stories

[^8]: https://github.com/json-schema-org/json-schema-vocabularies/issues/20

[^9]: https://rjsf-team.github.io/react-jsonschema-form/docs/json-schema/dependencies/

[^10]: https://www.reddit.com/r/businessanalysis/comments/fubeyc/user_story_dependencies/

[^11]: https://www.mongodb.com/company/blog/json-schema-validation--dependencies-you-can-depend-on

[^12]: https://blog.dailydoseofds.com/p/5-agentic-ai-design-patterns

[^13]: https://json-schema.org/understanding-json-schema/reference/conditionals

[^14]: https://storyneedle.com/using-json-schema-for-content-models-and-design-systems/

[^15]: https://www.linkedin.com/posts/digitalprocessarchitect_15-agent-design-patterns-every-ai-builder-activity-7354510546051706881-KGay

[^16]: https://www.atlassian.com/agile/project-management/user-stories

