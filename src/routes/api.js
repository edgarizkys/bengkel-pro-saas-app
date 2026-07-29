// controllers/bengkelController.js
const { tursoClient } = require('../config/database');

exports.getAllServices = async (req, res) => {
    try {
        const tenantId = req.headers['x-tenant-id'] || 'default';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const data = await tursoClient.execute({
            sql: 'SELECT * FROM services WHERE tenant_id = ? LIMIT ? OFFSET ?',
            args: [tenantId, limit, offset]
        });

        res.json({ success: true, data: data.rows });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const tenantId = req.headers['x-tenant-id'] || 'default';
        const { vehicle_plate, customer_name, service_type, mechanic, cost, status } = req.body;

        await tursoClient.execute({
            sql: `INSERT INTO services (tenant_id, vehicle_plate, customer_name, service_type, mechanic, cost, status) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`,
            args: [tenantId, vehicle_plate, customer_name, service_type, mechanic, cost, status]
        });

        res.status(201).json({ success: true, message: 'Servis berhasil dibuat' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const tenantId = req.headers['x-tenant-id'] || 'default';
        const data = await tursoClient.execute({
            sql: 'SELECT * FROM inventory WHERE tenant_id = ?',
            args: [tenantId]
        });
        res.json({ success: true, data: data.rows });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock, price } = req.body;
        await tursoClient.execute({
            sql: 'UPDATE inventory SET stock = ?, price = ? WHERE id = ?',
            args: [stock, price, id]
        });
        res.json({ success: true, message: 'Stok diperbarui' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};