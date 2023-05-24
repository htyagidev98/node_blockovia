const { drivingTextAdd,drivingTextGet } = require('../controller/drivingtext')
const express = require('express')
router = express.Router();



router.post('/drivingtext/add', drivingTextAdd)
router.get('/drivingtext/get', drivingTextGet)
// router.put('/content/update', contentUpdate)

module.exports = router;