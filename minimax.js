export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const apiKey = process.env.MINIMAX_API_KEY_3;
    const groupId = process.env.MINIMAX_GROUP_ID_3;
    const url = 'https://api.minimax.chat/v1/text/chatcompletion_v2';
  
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
  
    if (groupId && !body.group_id) {
      body.group_id = groupId;
    }
  
    const minimaxRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  
    const data = await minimaxRes.json();
    res.status(minimaxRes.status).json(data);
  }