const express = require('express');
const router = express.Router();
const customerController = require('../resource/customer.controller');

router.use('/customers', customerController);

module.exports = router;
