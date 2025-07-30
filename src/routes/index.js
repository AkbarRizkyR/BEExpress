const express = require('express');
const router = express.Router();
const customerController = require('../resource/customer.controller');
const adminUserController = require('../resource/adminUser.controller');

router.use('/customers', customerController);
router.use('/admin', adminUserController);

module.exports = router;
