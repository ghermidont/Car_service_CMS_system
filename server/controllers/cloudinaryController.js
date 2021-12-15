const cloudinary = require( "cloudinary" ).v2;

// config
cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.cloudinaryImageUploadController = async ( req, res ) => {
    console.log("cloudinaryImageUploadController() req.body.image: ", req.body.image);

    await cloudinary.uploader.upload( req.body.image, function( error, result ) {
        if ( result ){
            console.log( "cloudinaryImageUploadController() result: ", result );
            res.json( {
                public_id: result.public_id,
                url: result.secure_url,
                status: "uploaded"
            } );
        }
        else {
            throw new Error( JSON.stringify( error ) );
            console.log( "cloudinaryImageUploadController() error: ", error );
        }
    });    
};

exports.cloudinaryImageRemoveController = ( req, res ) => {
    const image_id = req.body.public_id;

    cloudinary.uploader.destroy( image_id, ( err, result ) => {
        if ( err ) return res.json( { success: false, err } );
        if ( result.result==="ok" ) res.send( "Image removed" );
    } );
};
