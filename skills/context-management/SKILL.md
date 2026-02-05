---
name: context-management
description: Save and restore conversation context across sessions. Maintains continuity for long-running projects. Works with SESSION_STATE.md and MEMORY.md.
---

# Context Management

Preserve and restore context across sessions for continuous workflow.

## Context Save

### When to Activate
- End of session
- Before major context switch
- User says "save context" or "I'm done for now"

### Pattern
```
CONTEXT SAVE
============
Saving session context to SESSION_STATE.md...

## Session Summary
- Date: [timestamp]
- Duration: ~[time]
- Project: [active project]

## Work Completed
1. [Major accomplishment 1]
2. [Major accomplishment 2]

## Current State
- Active file: [file]
- Last action: [action]
- Pending: [what's next]

## Blockers (if any)
- [blocker 1]
- [blocker 2]

## Quick Resume Command
"Continue [project] from [last milestone]. Start with [next action]."

Context saved to SESSION_STATE.md ✓
```

### Implementation
```typescript
// Update SESSION_STATE.md
const contextSave = {
  lastUpdated: new Date().toISOString(),
  activeProject: "[detected project]",
  status: "PAUSED",
  lastMilestone: "[description]",
  nextStep: "[action]",
  openFiles: ["[list]"],
  blockers: []
};
```

## Context Restore

### When to Activate
- Start of new session
- User says "load context" or "where was I"
- Automatically on session start (check SESSION_STATE.md)

### Pattern
```
CONTEXT RESTORE
===============
Loading previous session context...

## Previous Session
- Date: [timestamp]
- Project: [project]
- Last Milestone: [milestone]

## Ready to Resume
I found your previous work on [project].

Last you were working on: [specific task]
Files involved: [files]
Status: [status]

## Recommended Next Action
[specific next step based on context]

Shall I continue from here?
```

## Cross-Session Memory

### When to Activate
- Need to reference past decisions
- Pattern appears multiple times
- Building on previous work

### Pattern
```
MEMORY REFERENCE
===============
Checking MEMORY.md and DECISIONS.log...

## Relevant Past Context
- [Date]: [Decision/Pattern]
- [Date]: [Related work]

## Applying Learned Pattern
Based on previous work, I will [approach] because [reasoning from past].
```

## Handoff Protocol

### When to Activate
- Switching to different agent/system
- User mentions Agent Zero, C-Suite, etc.
- Task requires different capabilities

### Pattern
```
HANDOFF PREPARED
===============
Preparing context for handoff to [target system]...

## Handoff Package
**Target:** [Agent Zero / C-Suite / ChiefPM / etc.]
**Task:** [what they need to do]

## Context Transfer
- Project: [project]
- Current State: [state]
- Files: [relevant files]
- Constraints: [what not to change]

## Expected Outcome
[what success looks like]

## Return Trigger
Hand back to Antigravity when: [condition]

Handoff ready. Create AUTONOMOUS_TASK.md? (Y/N)
```
