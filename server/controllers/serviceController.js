// noinspection DuplicatedCode
const serviceModel = require( "../models/serviceModel" );
const slugify = require( "slugify" );

exports.mongoDBCreateServiceController = async ( req, res ) => {
    try {
        console.log( "mongoDBCreateServiceController() worked" );
        const slugString = `${req.body.date}${req.body.license_plate}`;
        console.log("slugString: ", slugString);
        //Create and add the slug to the request body. the slug is formed from the registration plate and formatted with Slugify.
        req.body.slug = slugify( slugString, { replacement: "-", remove: /[*+~.()'"!:@]/g, trim: true } );
        console.log(  "mongoDBCreateServiceController() req.body: ", JSON.stringify( req.body ) );
        console.log(req.body);
        const newService = await new serviceModel( req.body ).save();
        res.json( newService );
    } catch (err) {
        console.log( "mongoDBCreateServiceController() err: ", err );
        res.status(400).json( { err: err.message, } );
    }
};

exports.mongoDBDeleteServiceController = async (req, res) => {
    try {
        const deleted = await serviceModel
            .findOneAndRemove({ slug: req.params.slug, })
            .exec();
        res.json( deleted );
    } catch ( err ) {
        window.alert( err );
        return res.status( 400 ).send("Service deletion failed");
    }
};

//Gets the single service by the slug.
exports.mongoDBGetSingleServiceController = async ( req, res ) => {
    const product = await serviceModel
        .findOne({ slug: req.params.slug })
        .exec();
    res.json(product);
};

exports.mongoDBUpdateServiceController = async ( req, res ) => {
    try {
        const updated = await serviceModel
            .findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true }
            )
            .exec();
        res.json( updated );
    } catch ( err ) {
        console.log( "SERVICE UPDATE ERROR ----> ", err );
        res.status( 400 ).json({
            err: err.message,
        });
    }
};

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
exports.mongoDBGetAllServicesController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 8;

        const services = await serviceModel.find({} )
            //skipping the number of products from the page previous to the chosen page.
            .skip(( currentPage - 1 ) * perPage )
            .sort([ [sort, order ] ] )
            .limit( perPage )
            .exec();

        res.json( services );
    } catch ( err ) {
        window.log( err );
    }
};

//Getting the total services count for the pagination.
exports.mongoDBGetServicesCountController = async ( req, res ) => {
    let total = await serviceModel
        .find( {} )
        .estimatedDocumentCount()
        .exec();
    res.json( total );
};

// SEARCH / FILTER
exports.mongoDBFetchServiceByFilterController = async ( req, res ) => {
    const { query } = req.body;
    if ( query ) {
        console.log( "query --->", query );
        const service = await serviceModel
            .find({ $text: { $search: query } } )
            .exec();
        res.json( service );
    }
};
