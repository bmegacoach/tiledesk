# Flowbook: Flow Sales and Marketing Bot

**Date:** February 4, 2026  
**Mission:** Full FLOW functionality (WhatsApp, FB/IG, YouTube, TikTok, SMS, Knowledge Base) using Tiledesk open-source + free integrations.  
**Total Cost:** $0 (SMS ~$0.0075/msg).  
**Timeline:** 4–6 hours to deploy all.

---

## ARCHITECTURE OVERVIEW

```
WhatsApp → Evolution API (3001)
FB/Instagram → FB Webhook (3002)
YouTube → Pub/Sub webhook (3003)
TikTok → Business API webhook (3004)
SMS → Twilio webhook (3005)
Email → Postfix (optional)

↓ All route to Tiledesk Open Source (core)
└── Knowledge Base → AnythingLLM (3006)

Tiledesk replies → back to each channel
```

---

## 1. WHATSAPP: Evolution API

### Setup
```bash
cd ~
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
cp .env.example .env
```

**.env:**
```env
INSTANCE_NAME=flow-whatsapp
GLOBAL_WEBHOOK_URL=https://yourdomain.com/whatsapp-webhook
GLOBAL_WEBHOOK_EVENTS=message.any,message.create
DB_URI=mongodb://localhost:27017/evolution
```

```bash
docker-compose up -d
# http://your-ip:8080 → Scan QR code
```

### Webhook
Located in `webhooks/whatsapp/server.js`

**Deploy:** `cd webhooks/whatsapp && npm init -y && npm i express axios && pm2 start server.js --name whatsapp-webhook`

---

## 2. FB MESSENGER + INSTAGRAM DMs

### FB App Setup
1. developers.facebook.com → Create App (Messenger).
2. Webhook: `https://yourdomain.com/fb-webhook`, Verify Token: `flow_verify_2026`
3. Subscribe to `messages`
4. Add Instagram Messaging product.

### Webhook
Located in `webhooks/fb/server.js`

**Deploy:** `cd webhooks/fb && npm init -y && npm i express axios && pm2 start server.js --name fb-webhook`

---

## 3. YOUTUBE LIVE CHAT

### Google Setup
1. Google Cloud → YouTube Data API v3 → Enable.
2. Pub/Sub topic `youtube-chat`.
3. YouTube Live Chat API → webhook `https://yourdomain.com/youtube-webhook`.

### Webhook
Located in `webhooks/youtube/server.js`

**Deploy:** `cd webhooks/youtube && npm init -y && npm i express axios && pm2 start server.js --name youtube-webhook`

---

## 4. TIKTOK DMs

### TikTok Setup
1. developers.tiktok.com → Business Messaging app.
2. Webhook `https://yourdomain.com/tiktok-webhook`, Verify token `tiktok_flow_2026`.

### Webhook
Located in `webhooks/tiktok/server.js`

**Deploy:** `cd webhooks/tiktok && npm init -y && npm i express axios && pm2 start server.js --name tiktok-webhook`

---

## 5. SMS: Twilio Webhook

### Twilio Setup
1. twilio.com → Get phone number ($1/mo).
2. Webhook URL: `https://yourdomain.com/sms-webhook`.

### Webhook
Located in `webhooks/sms/server.js`

**Deploy:** `cd webhooks/sms && npm init -y && npm i express axios && pm2 start server.js --name sms-webhook`

---

## 6. KNOWLEDGE BASE: AnythingLLM

```bash
docker run -d \
  --name anythingllm \
  -p 3006:3001 \
  -v ~/anythingllm_data:/app/server/storage \
  mintplexlabs/anythingllm
```

**Usage in Tiledesk flows:**
```
External HTTP Request:
URL: http://localhost:3006/api/v1/chat/completions
Body: {"question": "{{user_message}}", "mode": "local"}
```

---

## 7. NGINX CONFIG
See `nginx/flow` file.

`sudo nginx -t && sudo systemctl reload nginx`

---

## 8. DEPLOYMENT SCRIPT
See `deploy.sh`.

---

## 9. TEST CHECKLIST

```
✅ WhatsApp → Tiledesk → reply back
✅ FB Messenger → Tiledesk → reply back
✅ Instagram DM → Tiledesk → reply back
✅ YouTube live → chat → Tiledesk → reply in chat
✅ TikTok DM → Tiledesk → reply back
✅ SMS (Twilio) → Tiledesk → reply back
✅ AnythingLLM answering queries in flows
✅ Nginx 200 on all webhooks
✅ PM2 all services green
```

---

## 10. TILEDESK FLOW INTEGRATION

**Reply routing in flows:**
```
External HTTP Request after every reply:
- WhatsApp conv IDs → /whatsapp-reply
- FB/IG conv IDs → /fb-reply
- YouTube → /youtube-reply
- TikTok → /tiktok-reply
- SMS → /sms-reply
```

**Knowledge base calls:**
```
External HTTP to http://localhost:3006/api/v1/chat/completions
```
