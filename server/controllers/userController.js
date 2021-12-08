const User = require("../models/userModel");

exports.mongoDBUserUpdateController = async ( req, res ) => {
    try {
    //Find and update the user in the database.
        const updated = await User
            .findOneAndUpdate(      
                { email: req.query.email },      
                req.body,
                { new: true }
            ) .exec();
        res.json( updated );
    } catch ( err ) {
        console.log( "USER UPDATE ERROR ----> ", err );
        res.status( 400 ).json( {
            err: err.message,
        } );
    }
};
