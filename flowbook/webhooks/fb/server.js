const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'flow_verify_2026';
const TILEDESK_API_KEY = 'YOUR_KEY';
const TILEDESK_PROJECTID = 'flow-alpha';
const TILEDESK_BASE_URL = 'https://yourdomain.com';

app.get('/fb-webhook', (req, res) => {
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.sendStatus(403);
    }
});

app.post('/fb-webhook', async (req, res) => {
    const body = req.body;
    if (body.object === 'page') {
        for (const entry of body.entry) {
            for (const event of entry.messaging) {
                if (event.message) {
                    const senderId = event.sender.id;
                    const text = event.message.text;
                    if (text) {
                        await axios.post(`${TILEDESK_BASE_URL}/api/v1/conversations/facebook/messages`, {
                            projectid: TILEDESK_PROJECTID,
                            conversation: senderId,
                            message: { type: 'text', text, sender: senderId }
                        }, { headers: { Authorization: `Bearer ${TILEDESK_API_KEY}` } });
                    }
                }
            }
        }
    }
    res.status(200).send('OK');
});

app.listen(3002);
