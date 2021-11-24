const cloudinary = require("cloudinary").v2;

// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.cloudinaryImageUploadController = async (req, res) => {
    await cloudinary.uploader.upload(req.body.image, function(error, result) {
        if ( result ){
            res.json({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        else {
            throw new Error( JSON.stringify( error ) );
        }
    });    
};

exports.cloudinaryImageRemoveController = (req, res) => {
    const image_id = req.body.public_id;

    cloudinary.v2.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ success: false, err });
        if(result.result==="ok")res.send("Image removed");
    });
};
