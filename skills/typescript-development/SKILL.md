---
name: typescript-development
description: TypeScript and JavaScript development patterns for Next.js, Cloudflare Workers, Node.js. Auto-activates for .ts/.tsx/.js files.
---

# TypeScript Development

Modern TypeScript patterns for your stack (Next.js, Cloudflare Workers, Firebase).

## Project Detection

### File Patterns
- `*.ts`, `*.tsx` → TypeScript mode
- `wrangler.toml` → Cloudflare Workers context
- `next.config.*` → Next.js context
- `firebase.json` → Firebase context

## Scaffold Patterns

### Cloudflare Worker
```typescript
// Standard Cloudflare Worker structure
export interface Env {
  // KV Namespaces
  CACHE: KVNamespace;
  // R2 Buckets
  STORAGE: R2Bucket;
  // D1 Database
  DB: D1Database;
  // Secrets
  API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    try {
      // Route handling
      if (url.pathname === '/health') {
        return Response.json({ status: 'ok' });
      }
      
      // Your logic here
      
    } catch (error) {
      console.error('Worker error:', error);
      return Response.json({ error: 'Internal error' }, { status: 500 });
    }
  },
  
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    // Cron job logic
  }
} satisfies ExportedHandler<Env>;
```

### Next.js API Route (App Router)
```typescript
// app/api/[route]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const param = searchParams.get('param');
    
    // Your logic
    
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate body
    if (!body.required_field) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }
    
    // Your logic
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### React Component (TypeScript)
```typescript
import { useState, useEffect } from 'react';

interface ComponentProps {
  title: string;
  onAction?: (value: string) => void;
}

export function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  const handleAction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Action logic
      onAction?.(state);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{title}</h1>
      {/* Component content */}
    </div>
  );
}
```

## Type Safety Patterns

### Null Safety
```typescript
// Always use optional chaining
const value = obj?.nested?.property ?? 'default';

// Explicit null checks before operations
if (data && data.items) {
  data.items.forEach(/* ... */);
}

// Type guards
function isValidData(data: unknown): data is ValidData {
  return data !== null && typeof data === 'object' && 'required' in data;
}
```

### Error Handling
```typescript
// Typed error handling
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Result type pattern
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function safeOperation<T>(fn: () => T): Result<T> {
  try {
    return { success: true, data: fn() };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

## Build & Deploy

### Cloudflare Workers
```bash
# Development
npx wrangler dev

# Deploy
npx wrangler deploy

# Tail logs
npx wrangler tail
```

### Next.js
```bash
# Development
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit
```

## Quality Checklist

Before committing TypeScript code, verify:
- [ ] `npx tsc --noEmit` passes (no type errors)
- [ ] All `any` types are intentional and documented
- [ ] Null safety applied (optional chaining, nullish coalescing)
- [ ] Error boundaries/try-catch in async code
- [ ] Interfaces defined for API responses
- [ ] Environment variables typed in Env interface
