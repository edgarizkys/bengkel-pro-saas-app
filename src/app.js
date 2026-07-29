const express = require('express');
const { createClient } = require('@libsql/client');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

// Middleware: Tenant Isolation
const getTenant = (req, res, next) => {
  req.tenant_id = req.headers['x-tenant-id'] || 'default';
  next();
};

app.use(getTenant);

// Services CRUD
app.get('/api/services', async (req, res) => {
  try {
    const rs = await db.execute({
      sql: 'SELECT * FROM services WHERE tenant_id = ? LIMIT 50',
      args: [req.tenant_id]
    });
    res.json(rs.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/services', async (req, res) => {
  const { vehicle_plate, customer_name, service_type, mechanic, cost, status } = req.body;
  try {
    await db.execute({
      sql: 'INSERT INTO services (tenant_id, vehicle_plate, customer_name, service_type, mechanic, cost, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [req.tenant_id, vehicle_plate, customer_name, service_type, mechanic, cost, status]
    });
    res.status(201).json({ message: 'Success' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Inventory CRUD
app.get('/api/inventory', async (req, res) => {
  try {
    const rs = await db.execute({
      sql: 'SELECT * FROM inventory WHERE tenant_id = ?',
      args: [req.tenant_id]
    });
    res.json(rs.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/inventory', async (req, res) => {
  const { part_name, stock, price } = req.body;
  try {
    await db.execute({
      sql: 'INSERT INTO inventory (tenant_id, part_name, stock, price) VALUES (?, ?, ?, ?)',
      args: [req.tenant_id, part_name, stock, price]
    });
    res.status(201).json({ message: 'Success' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));