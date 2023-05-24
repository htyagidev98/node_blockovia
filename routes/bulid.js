const { bulidScaleAdd, bulidScaleGet, bulidScaleGetById, bulidScaleUpdate } = require("../controller/bulid")
const express = require('express')

router = express.Router();

router.post('/bulid/scale/add', bulidScaleAdd)
router.get('/bulid/scale/get', bulidScaleGet)
router.get('/bulid/scale/get/id', bulidScaleGetById)
router.put('/bulid/scale/update', bulidScaleUpdate)

module.exports = router;