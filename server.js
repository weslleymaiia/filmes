const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/videos', (req, res) => {
    const videoDir = path.join(__dirname, 'public/videos');
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read video directory' });
        }
        const videos = files.map(file => ({
            name: file,
            path: `videos/${file}`
        }));
        res.json(videos);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
