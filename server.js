const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()
const db = new sqlite3.Database('./accentra.db')

app.use(cors())
app.use(bodyParser.json())

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    issue TEXT,
    description TEXT,
    status TEXT
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT
  )`)
})

// Maintenance routes
app.get('/api/maintenance', (req, res) => {
  db.all('SELECT * FROM maintenance', (err, rows) => {
    res.json(rows)
  })
})

app.post('/api/maintenance', (req, res) => {
  const { issue, description, status } = req.body
  db.run('INSERT INTO maintenance (issue, description, status) VALUES (?, ?, ?)',
    [issue, description, status], function () {
      res.json({ id: this.lastID })
    })
})

app.put('/api/maintenance/:id', (req, res) => {
  const { status } = req.body
  db.run('UPDATE maintenance SET status = ? WHERE id = ?',
    [status, req.params.id], function () {
      res.json({ updated: this.changes })
    })
})

// Feedback routes
app.get('/api/feedback', (req, res) => {
  db.all('SELECT * FROM feedback', (err, rows) => {
    res.json(rows)
  })
})

app.post('/api/feedback', (req, res) => {
  const { name, message } = req.body
  db.run('INSERT INTO feedback (name, message) VALUES (?, ?)',
    [name, message], function () {
      res.json({ id: this.lastID })
    })
})

// Start server
app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
