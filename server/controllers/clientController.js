// noinspection DuplicatedCode
const clientModel = require("../models/clientModel");
const slugify = require("slugify");

exports.mongoDBCreateClientController = async ( req, res ) => {
    try {
        console.log( "mongoDBCreateClientController() worked" );
        //Create and add the slug to the request body. the slug is formed from the registration plate and formatted with Slugify.
        req.body.slug = slugify( req.body.fiscal_code );
        console.log( "mongoDBCreateClientController() req.body: ", JSON.stringify( req.body ) );

        const newClient = await new clientModel( req.body ).save();
        res.json(newClient);
    } catch ( err ) {
        console.log( "mongoDBCreateClientController() err: ", err );
        res.status( 400 ).json( { err: err.message, } );
    }
};

exports.mongoDBDeleteClientController = async (req, res) => {
    try {
        const deleted = await clientModel
            .findOneAndRemove({ slug: req.params.slug, } )
            .exec();
        res.json( deleted );
    } catch ( err ) {
        console.log( "mongoDBDeleteClientController() err: ", err );
        return res.status( 400 ).send( "Client deletion failed" );
    }
};

//Gets the single client by the slug.
exports.mongoDBGetSingleClientController = async ( req, res ) => {
    const client = await clientModel
        .findOne({ slug: req.params.slug } )
        .exec();
    res.json( client );
};

exports.mongoDBUpdateClientController = async ( req, res ) => {
    try {
        const updated = await clientModel
            .findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true }
            )
            .exec();
        res.json( updated );
    } catch ( err ) {
        console.log( "CLIENT UPDATE ERROR ----> ", err );
        res.status( 400 ).json( {
            err: err.message,
        } );
    }
};

// WITH PAGINATION
exports.mongoDBGetAllClientsController = async ( req, res, userId ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page, userId } = req.body;
        console.log( "mongoDBGetAllClientsController() req.body.userId: ", req.body.userId );
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 8;

        const clients = await clientModel.find({ user: req.body.userId } )
            //skipping the number of products from the page previous to the chosen page.
            .skip(( currentPage - 1 ) * perPage )
            .sort([ [sort, order] ] )
            .limit( perPage )
            .exec();

        res.json( clients );
    } catch ( err ) {
        console.log( "mongoDBGetAllClientsController() err: ", err );
    }
};

exports.mongoDBGetAllClientsNoPagController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc
        const { sort, order } = req.body;
        const clients = await clientModel
            .find( { user: req.body.userId } )
            .sort( [ [sort, order] ] )
            .exec();
        res.json( clients );
    } catch ( err ) {
        console.log( "mongoDBGetAllClientsControllerNoPag() err: ", err );
    }
};


//Getting the total clients count for the pagination.
exports.mongoDBGetClientsCountController = async ( req, res ) => {
    console.log("mongoDBGetClientsCountController req.body.userId: ", req.body.userId );
    let total = await clientModel
        .find()
        .countDocuments({ user: req.query.userId })
        .exec();
    console.log( "mongoDBGetClientsCountController() total: ", total );
    res.json( total );
};

// SEARCH / FILTER
exports.mongoDBFetchClientByFilterController = async ( req, res ) => {
    const { query } = req.body;
    if ( query ) {
        console.log( "query --->", query );
        const client = await clientModel
            .find( { $text: { $search: query } } )
            .exec();
        res.json( client );
    }
};
