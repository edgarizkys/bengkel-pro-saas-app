const { createClient } = require('@libsql/client');

const tursoClient = createClient({
    url: process.env.TURSO_DATABASE_URL || 'libsql://edgartech-db-edgarizkys.turso.io',
    authToken: process.env.TURSO_AUTH_TOKEN || ''
});

async function initializeDatabase() {
    try {
        await tursoClient.execute(`CREATE TABLE IF NOT EXISTS servis (id INTEGER PRIMARY KEY AUTOINCREMENT, tenant_id TEXT DEFAULT 'default', nopol TEXT NOT NULL, pemilik TEXT NOT NULL, tipe TEXT NOT NULL, layanan TEXT NOT NULL, teknisi TEXT NOT NULL, biaya REAL NOT NULL, status TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
        console.log('[DB] Table servis (Multi-Tenant) ready');
        await tursoClient.execute(`CREATE TABLE IF NOT EXISTS sparepart (id INTEGER PRIMARY KEY AUTOINCREMENT, tenant_id TEXT DEFAULT 'default', kode TEXT NOT NULL, nama TEXT NOT NULL, kategori TEXT NOT NULL, harga REAL NOT NULL, stok REAL NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
        console.log('[DB] Table sparepart (Multi-Tenant) ready');
        await tursoClient.execute(`CREATE TABLE IF NOT EXISTS teknisi (id INTEGER PRIMARY KEY AUTOINCREMENT, tenant_id TEXT DEFAULT 'default', nama TEXT NOT NULL, spesialis TEXT NOT NULL, no_hp TEXT NOT NULL, status TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
        console.log('[DB] Table teknisi (Multi-Tenant) ready');
    } catch(e) { console.log('DB Notice:', e.message); }
}

module.exports = { tursoClient, initializeDatabase };