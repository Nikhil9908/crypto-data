const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController')



router.get('/crypto', cryptoController.cryptoData );

router.get('/get', cryptoController.getCryptoData)




module.exports = router
