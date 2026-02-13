const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Configuration de la connexion via les variables d'environnement Docker
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Création de la table au démarrage
pool.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, task TEXT)');

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos');
  const tasks = result.rows.map(t => `<li>${t.task}</li>`).join('');
  
  res.send(`
    <h1>✅ Ma Todo List Docker</h1>
    <ul>${tasks}</ul>
    <form action="/add" method="POST">
    <p>TEST</p>
      <input type="text" name="task" placeholder="Nouvelle tâche" required>
      <button type="submit">Ajouter</button>
    </form>
  `);
});

app.post('/add', async (req, res) => {
  await pool.query('INSERT INTO todos (task) VALUES ($1)', [req.body.task]);
  res.redirect('/');
});

app.listen(3000, () => console.log('App prête sur port 3000'));
