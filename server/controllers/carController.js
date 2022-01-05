// noinspection DuplicatedCode
const carModel = require( "../models/carModel" );
const slugify = require( "slugify" );
const userModel = require( "../models/userModel" );
//const ObjectId = require("mongoose").Types.ObjectId;

exports.mongoDBCreateCarController = async ( req, res ) => {
    try {
        console.log( "mongoDBCreateCarController() worked" );
        //Create and add the slug to the request body. the slug is formed from the registration plate and formatted with Slugify.
        req.body.slug = slugify( req.body.licensePlate );
        console.log( "mongoDBCreateCarController() req.body: ", JSON.stringify( req.body ) );

        const newCar = await new carModel( req.body ).save();
        res.json( newCar );
    } catch ( err ) {
        console.log( "mongoDBCreateCarController() err: ", err );
        res.status( 400 ).json( { err: err.message, } );
    }
};

exports.mongoDBDeleteCarController = async ( req, res ) => {
    try {
        const deleted = await carModel
            .findOneAndRemove({ slug: req.params.slug, } )
            .exec();
        res.json( deleted );
    } catch ( err ) {
        console.log( "mongoDBDeleteCarController() err: ", err );
        return res.status( 400 ).send( "Car deletion failed" );
    }
};

//Gets the single car by the slug.
exports.mongoDBGetSingleCarController = async ( req, res ) => {
    const car = await carModel
        .findOne({ slug: req.params.slug } )
        .exec();
    res.json( car );
};

exports.mongoDBUpdateCarController = async ( req, res ) => {
    try {
        const updated = await carModel
            .findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true }
            )
            .exec();
        res.json( updated );
    } catch ( err ) {
        console.log( "CAR UPDATE ERROR ----> ", err );
        res.status( 400 ).json( {
            err: err.message,
        } );
    }
};

// exports.mongoDBListAllCarsController = async (req, res) => {
//     const cars = await carModel
//         .find({})
//         .limit(parseInt(req.params.count))
//         .sort([["createdAt", "desc"]])
//         .exec();
//     res.json(cars);
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
exports.mongoDBGetAllCarsController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page, userId } = req.body;
        //the page number the user clicks on.
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 8;
        console.log( "mongoDBGetAllCarsController() userId", userId );

        const cars = await carModel
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
        res.json( cars );
    } catch ( err ) {
        console.log( "mongoDBGetAllCarsController() err: ", err );
    }
};

exports.mongoDBGetCarsByFilterController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, clientId, userId } = req.body;

        console.log( "mongoDBGetCarsByFilterController() userId", userId );
        console.log( "mongoDBGetCarsByFilterController() clientId", clientId );
        const cars = await carModel.find( { client: req.body.clientId, user: req.body.userId } )
            //.populate( "user" )
            //.populate("client")
            //In order not to get the whole user object, but only some parameters use this syntax:
            // .populate({"user", select: ["name", "email"]})
            //skipping the number of products from the page previous to the chosen page.
            .sort([ [ sort, order ] ] )
            .exec();
        res.json( cars );
    } catch ( err ) {
        console.log( "mongoDBGetCarsByFilterController() err: ", err );
    }
};

//Getting the total car count for the pagination.
exports.mongoDBGetCarsCountController = async ( req, res ) => {
    console.log("mongoDBGetCarsCountController() userId", req.query.user );
    let total = await carModel
        .find( {} )
        .countDocuments({ user: req.query.userId })
        .exec();
    console.log("mongoDBGetCarsCountController() total: ", total );
    res.json( total );
};

// SEARCH / FILTER
exports.mongoDBSearchCarByFilterController = async ( req, res ) => {
    if ( req.body.query ) {
        const searchQuery = req.body.query;
        console.log( "mongoDBSearchCarByFilterController() req.body.query: ", req.body.query );
        console.log( "mongoDBSearchCarByFilterController() req.body.userId: ", req.body.userId );
        // const objId = new ObjectId( (searchQuery.length === 12) ? "123456789012" : searchQuery );
        // You should make string 'param' as ObjectId type. To avoid exception,
        // the 'param' must consist of more than 12 characters.
        const cars = await carModel
            .find({
                user: req.body.userId,
            } )
            .or([
                { _id: searchQuery },
                { brand: searchQuery },
                { licensePlate: searchQuery }
            ]
            )
            .exec();
        console.log( "mongoDBSearchCarByFilterController() cars: ", cars );
        res.json( cars );
        // $text: { $search: req.body.query },
        // user: req.body.userId
    }
};

exports.mongoDBGetAlertsCountController = async ( req, res ) => {
    console.log( "mongoDBGetAlertsCountController() worked!" );
    console.log( "mongoDBGetAlertsCountController() req.query.userId: ", req.query.userId );

    let total = await carModel
        .find()
        .countDocuments( {
            user: req.query.userId,
            "alerts.show": true
        } )
        .exec();
    console.log( "mongoDBGetAlertsCountController() total: ", total );
    res.json( total );
};

exports.mongoDBCheckForActiveAlertsController = async ( req, res ) => {
    console.log( "mongoDBCheckForActiveAlertsController() worked!" );
    console.log( "mongoDBCheckForActiveAlertsController() req.query.userId: ", req.query.userId );

    let active = await carModel
        .find()
        .countDocuments( {
            user: req.query.userId,
            "alerts.show": true,
            "alerts.read": false
        } )
        .exec();
    console.log( "mongoDBCheckForActiveAlertsController() total: ", active );
    res.json( active );
};

// WITH PAGINATION
exports.mongoDBGetAlertsController = async ( req, res ) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page, userId } = req.body;
        console.log( "mongoDBGetAlertsController() sort: ", sort );
        console.log( "mongoDBGetAlertsController() order: ", order );
        console.log( "mongoDBGetAlertsController() page: ", page );
        console.log( "mongoDBGetAlertsController() userId: ", userId );
        //const currentDate = new Date(req.body.currentDate);
        //currentDate.setDate( currentDate.getDate() - 3 );

        //the page number the user clicks on.
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 8;
        console.log( "mongoDBGetAlertsController() userId: ", userId );
        //revisions: { end: new Date(req.body.currentDate).toDateString()
        const alerts = await carModel
            .find( {
                user: req.body.userId,
                "alerts.show": true
            } )
        // user: req.body.userId,
        //.populate( "user" )w
        //.populate("client")
        //In order not to get the whole user object, but only some parameters use this syntax:
        // .populate({"user", select: ["name", "email"]})
        //skipping the number of products from the page previous to the chosen page.
            .skip(( currentPage - 1 ) * perPage )
            .sort([ [ sort, order ] ] )
            .limit( perPage )
            .exec();
        console.log( "mongoDBGetAlertsController() alerts: ", alerts );
        res.json( alerts );
    } catch ( err ) {
        console.log( "mongoDBGetAlertsController() err: ", err );
    }
};

exports.mongoDBToggleAlertParamsController = async ( req, res ) => {
    console.log( "mongoDBToggleAlertParamsController() worked!" );
    console.log( "mongoDBToggleAlertParamsController() req.body.value: ", req.body.value );
    console.log( "mongoDBToggleAlertParamsController() req.body.slug: ", req.body.slug );
    console.log( "mongoDBToggleAlertParamsController() req.body.field: ", req.body.field );
    //req.body.field
    try {
        const updated = await carModel
            .findOneAndUpdate(
                { slug: req.body.slug, "alerts.show": true },
                { [req.body.field==="show"?"alerts.show":"alerts.read"]: req.body.value },
                { new: true }
            )
            .exec();
        console.log( "mongoDBToggleAlertParamsController() updated: ", updated );
        res.json( updated );
    } catch ( err ) {
        console.log( "ALERT PARAM TOGGLE ERROR --> ", err );
        res.status( 400 ).json( { err: err.message, } );
    }
};

exports.mongoDBActivateAlertsController = async ( req, res ) => {
    console.log( "mongoDBActivateAlertsController() worked!" );
    console.log( "mongoDBActivateAlertsController() req.body.currentDate: ", req.body.currentDate);

    try {
        const activated = await carModel
            .updateMany(
                { "revisions.end": req.body.currentDate },
                { "alerts.show": true },
                { new: true }
            )
            .exec();
        console.log( "mongoDBActivateAlertsController() activated: ", activated );
        res.json( activated );
    } catch ( err ) {
        console.log( "ALERTS activation ERROR --> ", err );
        res.status( 400 ).json( { err: err.message, } );
    }
};