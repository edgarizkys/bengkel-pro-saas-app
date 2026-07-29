const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/appController');
const payCtrl = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.get('/analytics', auth, ctrl.getAnalytics);
router.post('/payment/qris', auth, payCtrl.createQris);
router.post('/payment/va', auth, payCtrl.createVa);
router.post('/payment/webhook', payCtrl.handleWebhook);

router.get('/servis', auth, ctrl.getAllServis);
router.post('/servis', auth, ctrl.createServis);
router.delete('/servis/:id', auth, ctrl.deleteServis);
router.get('/sparepart', auth, ctrl.getAllSparepart);
router.post('/sparepart', auth, ctrl.createSparepart);
router.delete('/sparepart/:id', auth, ctrl.deleteSparepart);
router.get('/teknisi', auth, ctrl.getAllTeknisi);
router.post('/teknisi', auth, ctrl.createTeknisi);
router.delete('/teknisi/:id', auth, ctrl.deleteTeknisi);

module.exports = router;