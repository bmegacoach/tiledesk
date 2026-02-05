const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TILEDESK_API_KEY = 'YOUR_KEY';
const TILEDESK_PROJECTID = 'flow-alpha';
const TILEDESK_BASE_URL = 'https://yourdomain.com';

app.post('/youtube-webhook', async (req, res) => {
    const event = req.body;
    if (event.kind === 'youtube#liveChatMessage') {
        const chatId = event.liveChatId;
        const author = event.authorDetails.displayName;
        const text = event.snippet.displayMessage;
        const conversationId = `${chatId}_${author}`;

        await axios.post(`${TILEDESK_BASE_URL}/api/v1/conversations/${conversationId}/messages`, {
            projectid: TILEDESK_PROJECTID,
            message: { type: 'text', text: `${author}: ${text}`, sender: author }
        }, { headers: { Authorization: `Bearer ${TILEDESK_API_KEY}` } });
    }
    res.status(200).json({ status: 'ok' });
});

app.listen(3003);
