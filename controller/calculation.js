const Calculation = require("../models/calculation");
bodyParser = require("body-parser")
Validator = require("validatorjs")

exports.calculationAdd = async (req, res,) => {
    try {
        const rules = { title: "required", paragraph: "required", };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph, } = req.body;
            let CalculationData = await Calculation.findOne({ title: title }).lean();
            if (!CalculationData) {
                let data = await Calculation.create({
                    title: title,
                    paragraph: paragraph,
                });
                return res.status(200).json({ responseMessage: "Successfully", responseData: { data } });
            } else {
                return res.status(403).json({ responseMessage: "title Exist", responseData: {} })
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })

    }
}


exports.calculationGet = async (req, res) => {
    try {
        const contentlist = await Calculation.find().sort({ createdAt: -1 });
        if (contentlist && contentlist.length > 0) {
            const responseData = [];
            contentlist.forEach(content => {
                const contentObj = {
                    _id: content._id,
                    title: content.title,
                    paragraph: content.paragraph,
                   
                };
                responseData.push(contentObj);
            });
            return res.status(200).json({ responseMessage: "Successfully", responseData });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};

// exports.featureContentUpdate = async (req, res, images) => {
//     try {
//         const { title } = req.body;
//         const featureData = await Feature.findOne({ title: title }).lean();
//         if (featureData) {

//             let logoData = [];
//             let result = await cloudinary.uploader.upload(req.file.path, {
//                 images,
//                 overwrite: true,
//                 faces: false,
//             });
//             logoData.push({
//                 image_url: result.secure_url,
//                 image_id: result.public_id,
//             });
//             let data = await Feature.findOneAndUpdate(
//                 { _id: featureData._id },
//                 { title: title },
//                 { $push: { logoData: logoData } },
//                 { new: false, }
//             );

//             return res.status(200).json({ responseMessage: "Successfully", responseData: { data }, });
//         } else {
//             return res.status(404).json({ esponseMessage: "feature not found", responseData: {}, });
//         };
//     } catch (err) {
//         return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {}, });
//     }
// };

