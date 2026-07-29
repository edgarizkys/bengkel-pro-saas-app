// config/database.js
const { createClient } = require('@libsql/client');

const tursoClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
});

async function initializeDatabase() {
    try {
        await tursoClient.execute(`
            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tenant_id TEXT DEFAULT 'default',
                vehicle_plate TEXT NOT NULL,
                customer_name TEXT NOT NULL,
                service_type TEXT NOT NULL,
                mechanic TEXT,
                cost REAL DEFAULT 0,
                status TEXT DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await tursoClient.execute(`
            CREATE TABLE IF NOT EXISTS inventory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tenant_id TEXT DEFAULT 'default',
                part_name TEXT NOT NULL,
                stock INTEGER DEFAULT 0,
                price REAL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('[DB] Tables initialized: services, inventory');
    } catch(e) {
        console.error('[DB] Init error:', e.message);
        process.exit(1);
    }
}

module.exports = { tursoClient, initializeDatabase };