#!/bin/bash
# Create folders
mkdir -p ~/channel-webhooks/{whatsapp,fb,youtube,tiktok,sms}

# WhatsApp: Evolution API
cd ~ && git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api && cp .env.example .env && docker-compose up -d

# Copy all server.js files above to ~/channel-webhooks/[channel]/server.js
# NOTE: This part assumes you have copied the server.js files to the respective directories.
# Since we are generating this script, we assume the user will upload the 'webhooks' folder to ~

# This command assumes the 'flowbook/webhooks' directory is available (e.g. copied to ~)
# If running this from the repo, adjust paths accordingly.

# NPM + PM2 all
for channel in whatsapp fb youtube tiktok sms; do
  cd ~/channel-webhooks/$channel
  npm init -y && npm i express axios
  pm2 start server.js --name ${channel}-webhook
done

# Nginx config for tile.megaversepro.app
sudo nginx -t && sudo systemctl reload nginx

# AnythingLLM
docker run -d --name anythingllm -p 3006:3001 -v ~/anythingllm_data:/app/server/storage mintplexlabs/anythingllm

pm2 status
