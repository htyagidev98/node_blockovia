const Network = require('../models/network')
bodyParser = require("body-parser")
Validator = require("validatorjs")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dp6aceayp',
    api_key: '925825434622849',
    api_secret: 'uTuU6iIGtleSOIbtZDO_x5hPErc'
});

exports.networkAdd = async (req, res, images) => {
    try {
        const rules = { title: "required", button: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, button, } = req.body;
            let networkData = await Network.findOne({ title: title }).lean();
            if (!networkData) {
                let result = await cloudinary.uploader.upload(req.file.path, {
                    images,
                    overwrite: true,
                    faces: false,
                });
                let img_id = result.public_id
                let data = await Network.create({
                    title: title,
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
}

exports.networkGet = async (req, res) => {
    try {
        const contentlist = await Network.findOne().sort({ createdAt: -1 });
        if (contentlist) {
            const contentObj = {
                _id: contentlist._id,
                title: contentlist.title,
                button: contentlist.button,
                image_url: contentlist.image_url,
                image_id: contentlist.image_id
            };
            return res.status(200).json({ responseMessage: "Successfully", responseData: { contentObj } });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};
