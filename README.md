# Bengkel Pro SaaS

Sistem manajemen bengkel terpadu. Fitur: pelacakan servis, stok suku cadang, penugasan mekanik, sistem tagihan.

## Stack
- Backend: Express.js
- Database: Turso SQLite
- Frontend: Tailwind CSS
- Auth: JWT

## Setup
1. `npm install`
2. Set `TURSO_DB_URL`, `TURSO_AUTH_TOKEN` di `.env`.
3. `node server.js`

## API Endpoints
- `GET /api/services` - Daftar servis
- `POST /api/services` - Tambah servis
- `GET /api/inventory` - Daftar suku cadang
- `POST /api/inventory` - Tambah suku cadang

## Struktur Database
- `services`: vehicle_plate, customer_name, service_type, mechanic, cost, status.
- `inventory`: part_name, stock, price.

## Lisensi
MIT.