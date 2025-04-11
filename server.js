// server.js met websockets
const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let score = { red: 0, blue: 0 };

// Statische bestanden serveren uit /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// WebSocket broadcast functie
function broadcast(data) {
    const json = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(json);
        }
    });
}

// REST API
app.get('/api/score', (req, res) => {
    res.json(score);
});

app.post('/api/score', (req, res) => {
    const { team } = req.body;
    if (team === 'red' || team === 'blue') {
        score[team]++;
        broadcast({ type: 'scoreUpdate', score });
    }
    res.json(score);
});

app.post('/api/reset', (req, res) => {
    score = { red: 0, blue: 0 };
    broadcast({ type: 'scoreUpdate', score });
    res.json(score);
});

// Dummy websocket updates zolang backend er nog niet is
setInterval(() => {
    score.red = Math.floor(Math.random() * 10);
    score.blue = Math.floor(Math.random() * 10);
    broadcast({ type: 'scoreUpdate', score });
}, 3000); // elke 3 seconden

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
