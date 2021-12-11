const admin = require( "../firebase/fireBaseSettings" );
const getAuth = require( "firebase/auth" );
const userModel = require( "../models/userModel" );

exports.mongoDBFireBaseDeleteUserController = async ( req, res ) => {
    try {
        const deleted = await userModel
            .findOneAndRemove( { slug: req.params.slug } )
            .exec();
        res.json( deleted );
        try {
            // Write the current user from the Firebase to the request object.
            //TODO see if the token is extracted (use console.log).
            const firebaseUser = await admin
                .auth()
                .verifyIdToken( req.headers.authtoken );
            console.log( "FIREBASE USER IN AUTHCHECK", firebaseUser, " end user." );
            req.user = firebaseUser;
            await getAuth()
                .deleteUser( firebaseUser.uid )
                .then( () => {
                    console.log( "Successfully deleted user" );
                } )
                .catch( ( error ) => {
                    console.log( "Error deleting user:", error );
                } );
        } catch ( err ) {
            res.status( 401 ).json( {
                err: "Invalid or expired token",
            } );
        }
    } catch ( err ) {
        window.alert( err );
        return res.status( 400 ).send( "CMS user deletion failed" );
    }
};
//!Start here
exports.mongoDBToggleUserAccessController = async ( req, res ) => {
    try {
        const updated = await userModel
            .findOneAndUpdate(
                { slug: req.params.email },
                { role: req.params.role },
                { new: true }
            )
            .exec();
        console.log( "mongoDBToggleUserAccessController() updated: ", updated );
        res.json( updated );
    } catch ( err ) {
        console.log( "USER UPDATE ERROR ----> ", err );
        res.status( 400 ).json( {
            err: err.message,
        } );
    }
};

exports.mongoDBUsersCountController = async ( req, res ) => {
    const count = await userModel
        .find( {} )
        .estimatedDocumentCount()
        .exec();
    console.log( "mongoDBUsersCountController() COUNT: ", count );
    res.json( count );
};

exports.mongoDBGetAllUsersController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 8;

        const users = await userModel.find( {} )
        //skipping the number of products from the page previous to the chosen page.
            .skip(( currentPage - 1 ) * perPage )
            .sort( [ [ sort, order ] ] )
            .limit( perPage )
            .exec();
        console.log( "mongoDBGetAllUsersController users: ", users );
        res.json( users );
    } catch ( err ) {
        console.log( "mongoDBGetAllUsersController() ", err );
    }
};

exports.getSingleUserController = async (req, res) => {
    const user = await userSchema
        .findOne({ slug: req.params.slug })
        .exec();
    res.json(user);
};

handleSearchQuery = async (req, res, query) => {
    const searchResults = await userSchema
        .find({ $text: { $search: query } })
        .exec();
    res.json(searchResults);
};

exports.searchFiltersController = async (req, res) => {
    const { query } = req.body;
    if (query) {
        console.log("query --->", query);
        await handleSearchQuery(req, res, query);
    }
};