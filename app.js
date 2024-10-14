const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change if you have a different MySQL user
  password: 'Sairam@9293', // Change if your MySQL user has a password
  database: 'appdb'
});

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  const { username, password, email, phone_number, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (username, password_hash, email, phone_number, address) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [username, hashedPassword, email, phone_number, address], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ user_id: result.insertId });
  });
});

app.listen(port, () => console.log(`API listening on port ${port}`));
