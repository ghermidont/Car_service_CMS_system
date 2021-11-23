const cloudinaryController = require("cloudinary");

// config
cloudinaryController.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.cloudinaryImageUploadController = async (req, res) => {
    const result = await cloudinaryController.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto", // jpeg, png
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};

exports.cloudinaryImageRemoveController = (req, res) => {
    const image_id = req.body.public_id;

    cloudinaryController.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ success: false, err });
        res.send("Image removed");
    });
};
