const AnimatedCard = require('../models/animatedcard')
bodyParser = require("body-parser")
Validator = require("validatorjs")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dp6aceayp',
    api_key: '925825434622849',
    api_secret: 'uTuU6iIGtleSOIbtZDO_x5hPErc'
});

exports.animatedCardAdd = async (req, res, images) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph, button, } = req.body;
            let animatedCardData = await AnimatedCard.findOne({ title: title }).lean();
            if (!animatedCardData) {
                let result = await cloudinary.uploader.upload(req.file.path, {
                    images,
                    overwrite: true,
                    faces: false,
                });
                let img_id = result.public_id
                let data = await AnimatedCard.create({
                    title: title,
                    paragraph: paragraph,
                    button: button,
                    image_url: result.secure_url,
                    image_id: img_id
                });
                return res.status(200).json({ responseMessage: "Successfully", responseData: { data }, });
            } else {
                return res.status(403).json({ responseMessage: "title Exist", responseData: {} })
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })

    }
};


exports.animatedCardGet = async (req, res) => {
    try {
        const contentlist = await AnimatedCard.find().sort({ createdAt: -1 });
        if (contentlist && contentlist.length > 0) {
            let animatedCardData = [];
            contentlist.forEach(content => {
                const contentObj = {
                    _id: content._id,
                    title: content.title,
                    paragraph:content.paragraph,
                    image_url: content.image_url,
                    image_id: content.image_id
                };
                animatedCardData.push(contentObj);
            });
            return res.status(200).json({ responseMessage: "Successfully", responseData: { animatedCardData } });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};


