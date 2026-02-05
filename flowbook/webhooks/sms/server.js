const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TILEDESK_API_KEY = 'YOUR_KEY';
const TILEDESK_PROJECTID = 'flow-alpha';
const TILEDESK_BASE_URL = 'https://tile.megaversepro.app';

app.post('/sms-webhook', async (req, res) => {
    const from = req.body.From;  // +1234567890
    const body = req.body.Body;

    await axios.post(`${TILEDESK_BASE_URL}/api/v1/conversations/${from}/messages`, {
        projectid: TILEDESK_PROJECTID,
        message: { type: 'text', text: body, sender: from }
    }, { headers: { Authorization: `Bearer ${TILEDESK_API_KEY}` } });

    res.status(200).json({ status: 'ok' });
});

app.listen(3005);
