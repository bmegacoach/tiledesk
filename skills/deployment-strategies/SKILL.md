---
name: deployment-strategies
description: Infrastructure deployment patterns for Cloudflare Workers, VPS, Docker, and Cloudflare Tunnels. Auto-activates for deploy tasks.
---

# Deployment Strategies

Production deployment patterns for your infrastructure.

## Cloudflare Workers Deployment

### When to Activate
- `wrangler.toml` present
- User says "deploy to cloudflare" or "deploy worker"

### Pre-Deploy Checklist
```
CLOUDFLARE DEPLOY CHECKLIST
===========================
- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] All environment variables set in wrangler.toml or dashboard
- [ ] KV/R2/D1 bindings configured
- [ ] No hardcoded secrets in code
- [ ] Routes configured correctly
```

### Deploy Pattern
```bash
# Dry run first
npx wrangler deploy --dry-run

# Deploy
npx wrangler deploy

# Verify
curl https://[worker-url]/health
```

### Rollback
```bash
# List versions
npx wrangler deployments list

# Rollback to previous
npx wrangler rollback
```

## VPS Deployment (Docker + Cloudflare Tunnel)

### When to Activate
- Deploying to InterServer/VPS
- Docker-based deployment
- User mentions VPS or server

### SSH & Docker Setup
```bash
# Connect to VPS
ssh user@[vps-ip]

# Install Docker (if needed)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin
```

### Docker Compose Pattern
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=${CLOUDFLARE_TUNNEL_TOKEN}
```

### Cloudflare Tunnel Setup
```bash
# Install cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# Login (one-time)
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create [tunnel-name]

# Configure
cat > ~/.cloudflared/config.yml << EOF
tunnel: [tunnel-id]
credentials-file: /root/.cloudflared/[tunnel-id].json

ingress:
  - hostname: [your-domain.com]
    service: http://localhost:3000
  - service: http_status:404
EOF

# Run as service
cloudflared service install
```

### Deploy Script Pattern
```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Build and restart
docker compose down
docker compose build --no-cache
docker compose up -d

# Health check
sleep 10
curl -f http://localhost:3000/health || exit 1

echo "✅ Deployment complete!"
```

## Firebase Deployment

### When to Activate
- `firebase.json` present
- User mentions Firebase

### Pattern
```bash
# Deploy functions only
firebase deploy --only functions

# Deploy hosting only
firebase deploy --only hosting

# Full deploy
firebase deploy

# Emulator for testing
firebase emulators:start
```

## Zero-Downtime Deploy Pattern

### Blue-Green Strategy
```
BLUE-GREEN DEPLOY
================
1. Current (Blue) serving traffic
2. Deploy new version (Green)
3. Health check Green
4. Switch traffic to Green
5. Keep Blue as rollback
6. After verification, retire Blue
```

### Implementation
```bash
# For Docker
docker compose -f docker-compose.green.yml up -d
# Test green
curl http://localhost:3001/health
# If OK, switch nginx upstream
# Retire blue
docker compose -f docker-compose.blue.yml down
```

## Deployment Verification

### Post-Deploy Checks
```
DEPLOY VERIFICATION
==================
- [ ] Health endpoint responds 200
- [ ] Key API endpoints work
- [ ] No error spike in logs
- [ ] Performance baseline met
- [ ] Database connections stable
```

### Monitoring Commands
```bash
# Cloudflare Workers
npx wrangler tail

# Docker logs
docker compose logs -f

# Check resource usage
docker stats
```

## Rollback Procedures

### Quick Rollback
```bash
# Cloudflare Workers
npx wrangler rollback

# Docker
docker compose down
docker compose -f docker-compose.backup.yml up -d

# Git-based
git revert HEAD
git push
# Redeploy
```

### Rollback Decision Tree
```
Is service down? 
  → YES → Immediate rollback
  → NO → 
    Are errors > 5%?
      → YES → Rollback
      → NO → 
        Is performance degraded > 50%?
          → YES → Rollback
          → NO → Monitor closely
```
