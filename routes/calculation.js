const { calculationAdd, calculationGet} = require("../controller/calculation")
const express = require('express')

router = express.Router();

router.post('/calculation/add', calculationAdd)
router.get('/calculation/get', calculationGet)
// router.put('/feature/content/update', upload.single('image'), featureContentUpdate)

module.exports = router;