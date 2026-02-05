---
name: git-workflows
description: Streamlined git operations, PR enhancement, and onboarding. Auto-activates for git operations and repository management.
---

# Git Workflows

Efficient git operations with smart commit messages and PR enhancements.

## Smart Commit

### When to Activate
- Files have been modified
- User says "commit" or ready to save changes

### Pattern
```
GIT COMMIT
==========
## Changes Detected
- Modified: [list of files]
- Added: [list of files]
- Deleted: [list of files]

## Suggested Commit Message
```
[type]([scope]): [short description]

[longer description if needed]

[BREAKING CHANGE: if any]
[Fixes #issue if applicable]
```

## Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `test`: Tests
- `chore`: Maintenance

Proceed with commit? (Y/N/Edit)
```

### Implementation
```bash
# Conventional commit format
git add -A
git commit -m "[type]([scope]): [description]"
```

## Project Onboarding

### When to Activate
- New project opened
- User says "onboard" or "what is this project"
- No prior context for project

### Pattern
```
PROJECT ONBOARDING
=================
## Quick Scan
Analyzing project structure...

## Project Identity
- Name: [from package.json/config]
- Type: [Web App / API / Library / Worker / etc.]
- Stack: [frameworks detected]

## Key Files
- Entry: [main entry point]
- Config: [important config files]
- Tests: [test location]

## Scripts Available
- `npm run dev`: [description]
- `npm run build`: [description]
- `npm run test`: [description]

## Architecture Overview
[Brief description of project structure]

## Quick Start
1. Install: `npm install`
2. Configure: [any env setup]
3. Run: `npm run dev`

## Key Patterns Used
- [Pattern 1]: [where/how]
- [Pattern 2]: [where/how]

Ready to work on this project. What would you like to do?
```

## PR Enhancement

### When to Activate
- Creating pull request
- User says "PR" or "pull request"

### Pattern
```
PR ENHANCEMENT
=============
## PR Title
[type]: [Concise description of change]

## Description
### What
[What was changed]

### Why
[Motivation for change]

### How
[Implementation approach]

## Changes
- [file1]: [change description]
- [file2]: [change description]

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] No regressions

## Screenshots (if UI)
[placeholder for screenshots]

## Checklist
- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] No console.log/debug statements
- [ ] Types are accurate

## Review Notes
[Any specific areas to focus on during review]
```

## Branch Management

### Naming Convention
```
[type]/[issue-number]-[short-description]

Examples:
- feat/123-user-auth
- fix/456-null-pointer
- chore/789-update-deps
```

### Workflow
```bash
# Create feature branch
git checkout -b feat/[description]

# Keep in sync
git fetch origin
git rebase origin/main

# Push
git push -u origin [branch-name]
```

## Conflict Resolution

### When to Activate
- Merge conflict detected
- User asks about conflicts

### Pattern
```
CONFLICT RESOLUTION
==================
## Conflicts Detected
- [file1]: [type of conflict]
- [file2]: [type of conflict]

## Resolution Strategy
For each conflict:

1. **[file1]**
   - Ours: [what our version has]
   - Theirs: [what their version has]
   - Recommended: [which to keep and why]

2. **[file2]**
   - Ours: [what our version has]
   - Theirs: [what their version has]
   - Recommended: [which to keep and why]

## After Resolution
```bash
git add [resolved-files]
git rebase --continue
# or
git commit -m "merge: resolve conflicts in [files]"
```
```
