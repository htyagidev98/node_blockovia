const multer = require('multer')
const path = require('path');
const { animatedAdd ,animatedGet} = require('../controller/animated')
const express = require('express')
router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.post('/animated/add', upload.single('image'), animatedAdd)
router.get('/animated/get', animatedGet)
// router.put('/animated/update', contentUpdate)

module.exports = router;



