---
name: agent-orchestration
description: Multi-agent coordination patterns for C-Suite, Agent Zero, and ChiefPM integration. Auto-activates when coordinating between agent systems.
---

# Agent Orchestration

Patterns for coordinating multiple AI agents across your ecosystem.

## Agent Registry

### Your Agent Systems
| System | Type | Purpose | Communication |
|--------|------|---------|---------------|
| Antigravity | IDE Agent | Primary development | Direct |
| Agent Zero | Task Runner | Autonomous execution | AUTONOMOUS_TASK.md |
| C-Suite | Agent Team | Specialized roles | Docker API |
| ChiefPM | Project Manager | Task tracking | Supabase |

## Task Delegation

### When to Activate
- Task exceeds single-agent scope
- Specialized capability needed
- Autonomous execution required

### Delegation Pattern
```
TASK DELEGATION
==============
## Analysis
Current task: [description]
Capability needed: [what's required]
Best agent for this: [agent name]

## Delegation Package
**To:** [Agent Zero / C-Suite / ChiefPM]
**Task:** [specific instruction]
**Context:**
- Project: [project name]
- Files: [relevant files]
- Constraints: [what not to change]
- Success criteria: [how to know it's done]

## Handoff Document
Creating AUTONOMOUS_TASK.md with:
- Clear objective
- Step-by-step instructions
- Verification steps
- Return trigger

## Return Protocol
Agent should return control when:
- [ ] Task complete
- [ ] Blocked and needs human input
- [ ] Error threshold exceeded (3 failures)
```

### AUTONOMOUS_TASK.md Template
```markdown
# Autonomous Task: [Task Name]

## Objective
[One clear sentence]

## Context
- Project: [project path]
- Prior work: [what's been done]
- Related files: [list]

## Instructions
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Constraints
- DO NOT: [constraint 1]
- DO NOT: [constraint 2]
- MUST: [requirement]

## Verification
- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]

## On Completion
Update SESSION_STATE.md with results.
Report: [what to report back]

## On Blocked
Create BLOCKED.md with:
- What was attempted
- What failed
- What would unblock
```

## Multi-Agent Optimization

### When to Activate
- Multiple agents working on related tasks
- Coordination issues detected
- Performance optimization needed

### Pattern
```
MULTI-AGENT ANALYSIS
===================
## Current Agent Activity
- [Agent 1]: [current task] - Status: [status]
- [Agent 2]: [current task] - Status: [status]

## Coordination Check
- Duplicate work: [any overlap?]
- Dependencies: [who waits on whom?]
- Bottlenecks: [what's slowing down?]

## Optimization Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

## Task Queue Rebalance
Suggested redistribution:
- Move [task] from [agent A] to [agent B]
- Parallelize [tasks] across [agents]
- Sequence [task1] before [task2]
```

## Agent Improvement

### When to Activate
- Agent underperforming
- Repeated failures
- User asks to improve agent

### Pattern
```
AGENT IMPROVEMENT
================
## Agent: [name]
Current performance: [assessment]

## Issues Identified
1. [Issue]: [impact]
2. [Issue]: [impact]

## Root Cause
[Analysis of why issues occur]

## Improvements
1. **System Prompt Update**
   - Add: [capability]
   - Clarify: [instruction]
   - Remove: [confusion]

2. **Tool Access**
   - Grant: [tool]
   - Restrict: [tool]

3. **Context Management**
   - Increase: [context type]
   - Reduce: [noise]

## Implementation
[Specific changes to make]

## Verification
After changes, test with:
- [Test case 1]
- [Test case 2]
```

## C-Suite Integration

### Agent Roles
```typescript
const C_SUITE_AGENTS = {
  'project-manager': {
    purpose: 'Task triage, assignment, tracking',
    triggers: ['new task', 'status update', 'blocked'],
    outputs: ['task assignments', 'status reports']
  },
  'researcher': {
    purpose: 'Information gathering, analysis',
    triggers: ['need info', 'explore options'],
    outputs: ['research reports', 'recommendations']
  },
  'developer': {
    purpose: 'Code implementation',
    triggers: ['implement', 'build', 'fix'],
    outputs: ['code changes', 'PRs']
  }
};
```

### Communication Protocol
```typescript
// Message format between agents
interface AgentMessage {
  from: string;
  to: string;
  type: 'task' | 'result' | 'query' | 'alert';
  payload: {
    taskId?: string;
    content: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    context?: Record<string, any>;
  };
  timestamp: string;
}
```

## Coordination Queue

### Pattern
```
COORDINATION QUEUE
=================
## Pending Handoffs
| From | To | Task | Priority | Status |
|------|-----|------|----------|--------|
| Antigravity | Agent Zero | [task] | HIGH | READY |
| Agent Zero | ChiefPM | [task] | NORMAL | WAITING |

## Active Work
- Agent Zero: [current task] - ETA [time]
- C-Suite PM: [current task] - ETA [time]

## Next Actions
1. [Agent] should [action] when [trigger]
2. [Agent] should [action] when [trigger]
```
