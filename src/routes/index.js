const express = require('express');
const router = express.Router();
const customerController = require('../resource/customer.controller');
const adminUserController = require('../resource/adminUser.controller');
const itemController = require('../resource/item.controller');
const hargaHarianItemController = require('../resource/HargaHarianItemResource');

router.use('/customers', customerController);
router.use('/admin', adminUserController);
router.use('/items', itemController);
router.use('/harga-harian', hargaHarianItemController);

module.exports = router;
