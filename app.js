const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>🚀 Démo Docker réussie !</h1><p>L\'application tourne dans un conteneur.</p>');
});

app.listen(3000, () => {
    console.log('App lancée sur le port 3000');
});
