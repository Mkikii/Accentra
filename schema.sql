    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS maintenance_requests (
        id SERIAL PRIMARY KEY,
        tenant_id INTEGER REFERENCES users(id),
        description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        tenant_id INTEGER REFERENCES users(id),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (username, password, role) VALUES ('landlord_john', 'adminpassword', 'landlord') ON CONFLICT (username) DO NOTHING;
    INSERT INTO users (username, password, role) VALUES ('kikii_tenant', 'password123', 'tenant') ON CONFLICT (username) DO NOTHING;
    