---
name: clickup-orchestration
description: Manage ClickUp tasks, lists, and webhooks. Auto-activates for project management tasks referencing ClickUp.
---

# ClickUp Orchestration

Manage the workforce via the ClickUp API. Moltworker acts as the "Orchestrator" bot.

## Setup
Requires:
- `CLICKUP_API_KEY`: Personal Access Token
- `CLICKUP_TEAM_ID`: The Workspace ID

## Core Patterns

### 1. Ingest & Triage
When a new task arrives in the "Injest" list:
1. **Analyze** the description and title.
2. **Breakdown** into subtasks if complex because "smaller tasks move faster".
3. **Assign** to specific agent (or human) based on skill match.
4. **Move** to "Active" or specific backlog status.

### 2. Status Updates
Moltworker monitors status changes:
- If `In Progress`: Check if assignee has what they need.
- If `Blocked`: Alert the CEO (Troy) immediately via "War Room" chat.
- If `Review`: Run automated checks (if code) or summarize for approval.

### 3. War Room Chat
Moltworker listens to the "War Room" list chat:
- **Trigger:** "@Moltworker" or keywords like "Update status", "Assign this".
- **Action:** Parse natural language command -> Execute API call.
- **Reply:** Post comment with result.

## API Patterns (TypeScript)

### Create Task
```typescript
async function createTask(listId: string, task: { name: string; description?: string; assignees?: string[] }) {
  const url = `https://api.clickup.com/api/v2/list/${listId}/task`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': env.CLICKUP_API_KEY
    },
    body: JSON.stringify(task)
  });
  return resp.json();
}
```

### Webhook Handling
```typescript
// Route: /webhooks/clickup
// Trigger: taskCreated, taskStatusUpdated
async function handleWebhook(payload: any, env: Env) {
  const { event, task_id } = payload;
  
  if (event === 'taskCreated') {
    // Analyze and Triage
    await orchestrator.triageTask(task_id);
  }
}
```

## Prompt Triggers
- "Triage the ClickUp inbox"
- "Create a task for [agent] to [action]"
- "Check status of [project]"
