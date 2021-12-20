// noinspection DuplicatedCode
const noteModel = require("../models/noteModel");
const slugify = require("slugify");
//const ObjectId = require("mongoose").Types.ObjectId;

exports.mongoDBCreateNoteController = async ( req, res ) => {
    try {
        console.log( "mongoDBCreateNoteController() worked" );
        //Create and add the slug to the request body. the slug is formed from the registration plate and formatted with Slugify.
        req.body.slug = slugify( req.body.id );
        console.log( "mongoDBCreateNoteController() req.body: ", JSON.stringify( req.body ) );

        const newNote = await new noteModel( req.body ).save();
        res.json( newNote );
    } catch ( err ) {
        console.log( "mongoDBCreateCarController() err: ", err );
        res.status( 400 ).json( { err: err.message, } );
    }
};

exports.mongoDBDeleteNoteController = async ( req, res ) => {
    try {
        const deleted = await noteModel
            .findOneAndRemove({ id: req.params.id, } )
            .exec();
        console.log( "mongoDBDeleteNoteController() note deleted successfully. " );
        res.json( deleted );
    } catch ( err ) {
        console.log( "mongoDBDeleteNoteController() err: ", err );
        return res.status( 400 ).send( "Note deletion failed" );
    }
};

//Gets the single car by the slug.
exports.mongoDBGetSingleNoteController = async ( req, res ) => {
    const note = await noteModel
        .findOne({ slug: req.params.slug } )
        .exec();
    res.json( note );
};

exports.mongoDBUpdateNoteController = async ( req, res ) => {
    try {
        const updated = await noteModel
            .findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true }
            )
            .exec();
        res.json( updated );
    } catch ( err ) {
        console.log( "NOTE UPDATE ERROR ----> ", err );
        res.status( 400 ).json( {
            err: err.message,
        } );
    }
};

// exports.mongoDBListAllNotesController = async (req, res) => {
//     const notes = await carModel
//         .find({})
//         .limit(parseInt(req.params.count))
//         .sort([["createdAt", "desc"]])
//         .exec();
//     res.json(notes);
// };

// WITHOUT PAGINATION
// exports.list = async (req, res) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
exports.mongoDBGetAllNotesController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page, userId } = req.body;
        //the page number the user clicks on.
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 8;
        console.log( "mongoDBGetAllNotesController() userId", userId );

        const notes = await noteModel
            .find( { user: req.body.userId } )
            //.populate( "user" )
            //.populate("client")
            //In order not to get the whole user object, but only some parameters use this syntax:
            // .populate({"user", select: ["name", "email"]})
            //skipping the number of products from the page previous to the chosen page.
            .skip(( currentPage - 1 ) * perPage )
            .sort([ [ sort, order ] ] )
            .limit( perPage )
            .exec();
        res.json( notes );
    } catch ( err ) {
        console.log( "mongoDBGetAllNotesController() err: ", err );
    }
};

exports.mongoDBGetNotesByFilterController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, clientId, userId } = req.body;

        console.log( "mongoDBGetNotesByFilterController() userId", userId );
        console.log( "mongoDBGetNotesByFilterController() clientId", clientId );
        const notes = await noteModel.find( { client: req.body.clientId, user: req.body.userId } )
            //.populate( "user" )
            //.populate( "client" )
            //In order not to get the whole user object, but only some parameters use this syntax:
            // .populate({"user", select: ["name", "email"]})
            //skipping the number of products from the page previous to the chosen page.
            .sort([ [ sort, order ] ] )
            .exec();
        res.json( notes );
    } catch ( err ) {
        console.log( "mongoDBGetNotesByFilterController() err: ", err );
    }
};

//Getting the total car count for the pagination.
exports.mongoDBGetNotesCountController = async ( req, res ) => {
    console.log("mongoDBGetNotesCountController() userId", req.query.user );
    let total = await noteModel
        .find( {} )
        .countDocuments({ user: req.query.userId })
        .exec();
    console.log("mongoDBGetNotesCountController() total: ", total );
    res.json( total );
};