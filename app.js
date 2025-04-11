const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Statische files bedienen uit ./public
app.use(express.static(path.join(__dirname, 'public')));

// Bijvoorbeeld een route voor de hoofdpagina:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
