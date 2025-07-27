const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://molly:password@localhost:5432/accentra_db',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
    process.exit(-1);
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
    } else {
        console.log('PostgreSQL connected:', res.rows[0].now);
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3',
            [username, password, role]
        );

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login successful', user: result.rows[0] });
        } else {
            res.status(401).json({ message: 'Invalid credentials or role' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
});

app.get('/api/maintenance', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM maintenance_requests ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching maintenance requests:', error.message);
        res.status(500).json({ message: 'Server error fetching maintenance requests' });
    }
});

app.post('/api/maintenance', async (req, res) => {
    const { tenant_id, description } = req.body;
    if (!tenant_id || !description) {
        return res.status(400).json({ message: 'Tenant ID and description are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO maintenance_requests (tenant_id, description, status) VALUES ($1, $2, $3) RETURNING *',
            [tenant_id, description, 'Pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding maintenance request:', error.message);
        res.status(500).json({ message: 'Server error adding maintenance request' });
    }
});

app.patch('/api/maintenance/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    try {
        const result = await pool.query(
            'UPDATE maintenance_requests SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Maintenance request not found' });
        }
    } catch (error) {
        console.error('Error updating maintenance request:', error.message);
        res.status(500).json({ message: 'Server error updating maintenance request' });
    }
});

app.get('/api/feedback', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM feedback ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching feedback:', error.message);
        res.status(500).json({ message: 'Server error fetching feedback' });
    }
});

app.post('/api/feedback', async (req, res) => {
    const { tenant_id, message } = req.body;
    if (!tenant_id || !message) {
        return res.status(400).json({ message: 'Tenant ID and message are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO feedback (tenant_id, message) VALUES ($1, $2) RETURNING *',
            [tenant_id, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding feedback:', error.message);
        res.status(500).json({ message: 'Server error adding feedback' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
