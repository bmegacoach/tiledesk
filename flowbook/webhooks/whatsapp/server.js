const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TILEDESK_API_KEY = 'YOUR_KEY';
const TILEDESK_PROJECTID = 'flow-alpha';
const TILEDESK_BASE_URL = 'https://yourdomain.com';

app.post('/whatsapp-webhook', async (req, res) => {
    const event = req.body;
    if (event.event === 'message.any') {
        const sender = event.data.key.remoteJid;
        const text = event.data.message?.conversation || event.data.message?.extendedTextMessage?.text;

        if (text) {
            await axios.post(`${TILEDESK_BASE_URL}/api/v1/conversations/${sender}/messages`, {
                projectid: TILEDESK_PROJECTID,
                message: { type: 'text', text, sender: sender.split('@')[0] }
            }, { headers: { Authorization: `Bearer ${TILEDESK_API_KEY}` } });
        }
    }
    res.status(200).json({ status: 'ok' });
});

app.listen(3001);
