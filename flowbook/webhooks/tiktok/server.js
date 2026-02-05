const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'tiktok_flow_2026';
const TILEDESK_API_KEY = 'YOUR_KEY';
const TILEDESK_PROJECTID = 'flow-alpha';
const TILEDESK_BASE_URL = 'https://yourdomain.com';

app.get('/tiktok-webhook', (req, res) => {
    if (req.query.hub_verify_token === VERIFY_TOKEN) {
        res.status(200).send(req.query.hub_challenge);
    } else {
        res.status(403).send('Forbidden');
    }
});

app.post('/tiktok-webhook', async (req, res) => {
    const event = req.body;
    if (event.data?.[0]?.message) {
        const message = event.data[0].message;
        const sender = event.data[0].sender_id;

        await axios.post(`${TILEDESK_BASE_URL}/api/v1/conversations/${sender}/messages`, {
            projectid: TILEDESK_PROJECTID,
            message: { type: 'text', text: message.content, sender }
        }, { headers: { Authorization: `Bearer ${TILEDESK_API_KEY}` } });
    }
    res.status(200).json({ status: 'ok' });
});

app.listen(3004);
