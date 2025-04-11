const express = require('express');
const app = express();
const port = 3000;

// Startscore
let score = { red: 0, blue: 0 };

// Gebruik de 'public' map voor frontend
app.use(express.static('public'));

// Zorg dat we JSON kunnen ontvangen
app.use(express.json());

// Geef huidige score terug
app.get('/api/score', (req, res) => {
    res.json(score);
});

// Verhoog score van team
app.post('/api/score', (req, res) => {
    const { team } = req.body;
    if (team === 'red' || team === 'blue') {
        score[team]++;
    }
    res.json(score);
});

// Reset score
app.post('/api/reset', (req, res) => {
    score = { red: 0, blue: 0 };
    res.json(score);
});

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
