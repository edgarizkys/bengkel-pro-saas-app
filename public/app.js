const express = require('express');
const { createClient } = require('@libsql/client');
const app = express();

app.use(express.json());

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

const tenantMiddleware = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];
  if (!tenantId) return res.status(403).json({ error: 'Tenant ID required' });
  req.tenantId = tenantId;
  next();
};

app.get('/api/services', tenantMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const rs = await db.execute({
      sql: 'SELECT * FROM services WHERE tenant_id = ? LIMIT ? OFFSET ?',
      args: [req.tenantId, Number(limit), Number(offset)]
    });
    res.json(rs.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/services', tenantMiddleware, async (req, res) => {
  const { vehicle_plate, customer_name, service_type, mechanic, cost, status } = req.body;
  try {
    await db.execute({
      sql: 'INSERT INTO services (tenant_id, vehicle_plate, customer_name, service_type, mechanic, cost, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [req.tenantId, vehicle_plate, customer_name, service_type, mechanic, cost, status]
    });
    res.status(201).json({ message: 'Service created' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/inventory', tenantMiddleware, async (req, res) => {
  try {
    const rs = await db.execute({
      sql: 'SELECT * FROM inventory WHERE tenant_id = ?',
      args: [req.tenantId]
    });
    res.json(rs.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/inventory', tenantMiddleware, async (req, res) => {
  const { part_name, stock, price } = req.body;
  try {
    await db.execute({
      sql: 'INSERT INTO inventory (tenant_id, part_name, stock, price) VALUES (?, ?, ?, ?)',
      args: [req.tenantId, part_name, stock, price]
    });
    res.status(201).json({ message: 'Inventory added' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(3000, () => console.log('Bengkel Pro running on port 3000'));