---
name: unit-testing
description: Automated test generation and systematic debugging. Auto-activates when creating tests or debugging failures.
---

# Unit Testing

Systematic test generation and debugging patterns.

## Test Generation

### When to Activate
- New function/component created
- Bug fixed (regression test)
- User says "add tests" or "test this"

### Pattern
```
TEST GENERATION
==============
## Target
Function/Component: [name]
File: [path]

## Test Strategy
- Unit tests for: [pure functions]
- Integration tests for: [API endpoints]
- Component tests for: [React components]

## Generated Tests
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { [targetFunction] } from './[file]';

describe('[targetFunction]', () => {
  beforeEach(() => {
    // Setup
  });

  describe('happy path', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      const input = [testInput];
      
      // Act
      const result = [targetFunction](input);
      
      // Assert
      expect(result).toEqual([expected]);
    });
  });

  describe('edge cases', () => {
    it('should handle null input', () => {
      expect(() => [targetFunction](null)).toThrow();
    });

    it('should handle empty input', () => {
      const result = [targetFunction]([]);
      expect(result).toEqual([]);
    });
  });

  describe('error cases', () => {
    it('should throw on invalid input', () => {
      expect(() => [targetFunction]('invalid')).toThrow('[ErrorType]');
    });
  });
});
```

## Coverage Analysis
Current: [X]%
Target: 80%+
Missing: [uncovered areas]
```

### Test Patterns by Type

#### API Endpoint
```typescript
describe('POST /api/[endpoint]', () => {
  it('returns 200 with valid body', async () => {
    const response = await fetch('/api/[endpoint]', {
      method: 'POST',
      body: JSON.stringify({ valid: 'data' }),
    });
    expect(response.status).toBe(200);
  });

  it('returns 400 with invalid body', async () => {
    const response = await fetch('/api/[endpoint]', {
      method: 'POST',
      body: JSON.stringify({ invalid: true }),
    });
    expect(response.status).toBe(400);
  });

  it('returns 401 without auth', async () => {
    // Remove auth header
    const response = await fetch('/api/[endpoint]', {
      method: 'POST',
    });
    expect(response.status).toBe(401);
  });
});
```

#### React Component
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onAction = vi.fn();
    render(<Component title="Test" onAction={onAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalled();
  });

  it('displays loading state', () => {
    render(<Component title="Test" loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

## Systematic Debugging

### When to Activate
- Test fails
- Error in production
- Unexpected behavior

### Debug Protocol
```
SYSTEMATIC DEBUG
===============
## Error Details
- Test/Error: [name/message]
- Location: [file:line]
- Frequency: [always/sometimes/rare]

## Reproduction
1. [Step to reproduce]
2. [Step 2]
3. Error occurs

## Hypothesis Stack (ordered by likelihood)
1. [Most likely cause] - Confidence: HIGH
2. [Second possibility] - Confidence: MEDIUM
3. [Third possibility] - Confidence: LOW

## Investigation
### Hypothesis 1: [description]
Test: [how to verify]
Result: [CONFIRMED/REJECTED]

[If rejected, move to next hypothesis]

## Root Cause
[Confirmed root cause]

## Fix
[Description of fix]

## Regression Test
```typescript
it('should not regress: [bug description]', () => {
  // This test catches the bug we just fixed
  const result = [buggyFunction]([inputThatCausedBug]);
  expect(result).not.toThrow(); // or appropriate assertion
});
```

## Verification
- [ ] Fix applied
- [ ] Regression test added
- [ ] All existing tests pass
- [ ] No new warnings
```

## Mocking Patterns

### External API
```typescript
vi.mock('./api-client', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' }),
}));
```

### Environment Variables
```typescript
beforeEach(() => {
  vi.stubEnv('API_KEY', 'test-key');
});
```

### Timers
```typescript
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('handles timeout', async () => {
  const promise = functionWithTimeout();
  vi.advanceTimersByTime(5000);
  await expect(promise).rejects.toThrow('Timeout');
});
```

## Test Configuration

### Vitest Setup
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // or 'node'
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'test'],
    },
    include: ['**/*.test.ts', '**/*.spec.ts'],
  },
});
```

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific file
npm test -- [file.test.ts]

# Watch mode
npm test -- --watch
```
