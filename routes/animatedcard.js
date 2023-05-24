const multer = require('multer')
const path = require('path');
const { animatedCardAdd,animatedCardGet } = require('../controller/animatedcard')
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


router.post('/animated/card/add', upload.single('image'), animatedCardAdd)
router.get('/animated/card/get', animatedCardGet)
// router.put('/content/update', contentUpdate)

module.exports = router;





