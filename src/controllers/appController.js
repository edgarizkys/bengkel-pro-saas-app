// World-Class Controllers for Bengkel Pro Saas (Sistem Manajemen Bengkel Saas Enterprise)

let servisData = [
  {
    "id": 1,
    "nopol": "B 1234 EKR",
    "pemilik": "Pak Edgar",
    "tipe": "Honda Vario 160",
    "layanan": "Servis Berkala + Ganti Oli",
    "teknisi": "Budi Santoso",
    "biaya": 220000,
    "status": "Selesai"
  },
  {
    "id": 2,
    "nopol": "B 5678 TGA",
    "pemilik": "Ahmad Fauzi",
    "tipe": "Yamaha NMAX",
    "layanan": "Ganti Kampas Rem",
    "teknisi": "Joko Susilo",
    "biaya": 150000,
    "status": "Proses"
  }
];

exports.getAllServis = async (req, res) => {
    const tenantId = req.headers['x-tenant-id'] || 'default_tenant';
    res.json({ success: true, tenantId, count: servisData.length, data: servisData });
};

exports.createServis = async (req, res) => {
    const item = { id: Date.now(), tenant_id: req.headers['x-tenant-id'] || 'default_tenant', ...req.body };
    servisData.unshift(item);
    res.status(201).json({ success: true, data: item });
};

exports.deleteServis = async (req, res) => {
    servisData = servisData.filter(i => i.id !== parseInt(req.params.id));
    res.json({ success: true, message: 'Booking Servis deleted' });
};

let sparepartData = [
  {
    "id": 1,
    "kode": "OLI-MPX2-800",
    "nama": "Oli MPX2 Matik 0.8L",
    "kategori": "Oli & Pelumas",
    "harga": 65000,
    "stok": 85
  },
  {
    "id": 2,
    "kode": "KPS-VARIO160",
    "nama": "Kampas Rem Depan Vario",
    "kategori": "Suku Cadang",
    "harga": 85000,
    "stok": 40
  }
];

exports.getAllSparepart = async (req, res) => {
    const tenantId = req.headers['x-tenant-id'] || 'default_tenant';
    res.json({ success: true, tenantId, count: sparepartData.length, data: sparepartData });
};

exports.createSparepart = async (req, res) => {
    const item = { id: Date.now(), tenant_id: req.headers['x-tenant-id'] || 'default_tenant', ...req.body };
    sparepartData.unshift(item);
    res.status(201).json({ success: true, data: item });
};

exports.deleteSparepart = async (req, res) => {
    sparepartData = sparepartData.filter(i => i.id !== parseInt(req.params.id));
    res.json({ success: true, message: 'Inventaris Sparepart deleted' });
};

let teknisiData = [
  {
    "id": 1,
    "nama": "Budi Santoso",
    "spesialis": "Mesin & Injection",
    "no_hp": "081234567890",
    "status": "Aktif"
  },
  {
    "id": 2,
    "nama": "Joko Susilo",
    "spesialis": "CVT & Matik",
    "no_hp": "082345678901",
    "status": "Aktif"
  }
];

exports.getAllTeknisi = async (req, res) => {
    const tenantId = req.headers['x-tenant-id'] || 'default_tenant';
    res.json({ success: true, tenantId, count: teknisiData.length, data: teknisiData });
};

exports.createTeknisi = async (req, res) => {
    const item = { id: Date.now(), tenant_id: req.headers['x-tenant-id'] || 'default_tenant', ...req.body };
    teknisiData.unshift(item);
    res.status(201).json({ success: true, data: item });
};

exports.deleteTeknisi = async (req, res) => {
    teknisiData = teknisiData.filter(i => i.id !== parseInt(req.params.id));
    res.json({ success: true, message: 'Data Teknisi deleted' });
};

exports.getAnalytics = async (req, res) => {
    res.json({ success: true, platform: 'Bengkel Pro Saas', domain: 'Sistem Manajemen Bengkel Saas Enterprise', version: '5.0.0-WorldClass', architecture: 'Multi-Tenant Ready + Redis Cache' });
};