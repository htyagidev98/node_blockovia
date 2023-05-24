const Animated = require('../models/animated')
bodyParser = require("body-parser")
Validator = require("validatorjs")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dp6aceayp',
    api_key: '925825434622849',
    api_secret: 'uTuU6iIGtleSOIbtZDO_x5hPErc'
});

exports.animatedAdd = async (req, res, images) => {
    try {
        const rules = { title: "required", paragraph: "required", button: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph, button, } = req.body;
            let animatedData = await Animated.findOne({ title: title }).lean();
            if (!animatedData) {
                let result = await cloudinary.uploader.upload(req.file.path, {
                    images,
                    overwrite: true,
                    faces: false,
                });
                let img_id = result.public_id
                let data = await Animated.create({
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
}

exports.animatedGet = async (req, res) => {
    try {
        const contentlist = await Animated.find().sort({ createdAt: -1 });
        if (contentlist && contentlist.length > 0) {
            const animatedData = [];
            contentlist.forEach(content => {
                const contentObj = {
                    _id: content._id,
                    title: content.title,
                    paragraph: content.paragraph,
                    button: content.button,
                    image_url: content.image_url,
                    image_id: content.image_id

                };
                animatedData.push(contentObj);
            });
            return res.status(200).json({ responseMessage: "Successfully", animatedData });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};

// exports.bulidScaleUpdate = async (req, res,) => {
//     try {
//         const rules = { title: "required", paragraph: "required", button: "required" };
//         const validation = new Validator(req.body, rules);
//         if (validation.fails()) {
//             return res.status(422).json({
//                 responseMessage: "Validation Error", responseData: validation.errors.all(),
//             });
//         } else {
//             const { title, paragraph, button } = req.body;
//             const { _id } = req.query;
//             const bulidData = await Bulid.findById(_id).lean();
//             if (bulidData) {
//                 const updatedData = {
//                     title: title,
//                     paragraph: paragraph,
//                     button: button
//                 }
//                 const data = await Bulid.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });
//                 return res.status(200).json({ responseMessage: "Successfully Updated", responseData: data });
//             } else {
//                 return res.status(404).json({ esponseMessage: "feature not found", responseData: {}, });
//             };
//         }
//     } catch (err) {
//         return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, });
//     }
// };