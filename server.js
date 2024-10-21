const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (frontend) from the "public" folder
app.use(express.static('public'));

// Route to fetch headshot data
app.get('/api/headshot', async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const apiUrl = `https://api.allorigins.win/raw?url=https://api.valiantwind.dev/v1/roblox/avatar-headshot?username=${username}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch headshot data');
        }

        // Since we are fetching an image (PNG), return the URL directly
        const headshotUrl = `https://api.valiantwind.dev/v1/roblox/avatar-headshot?username=${username}`;
        res.json({ headshotUrl });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching headshot data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
