// noinspection DuplicatedCode

const carModel = require("../models/carModel");
const slugify = require("slugify");

exports.mongoDBCreateCarController = async (req, res) => {
    try {
        //Create and add the slug to the request body. the slug is formed from the registration plate and formatted with Slugify.
        req.body.slug = slugify(req.body.registrationPlate);
        const newCar = await new carModel(req.body).save();
        res.json(newCar);
    } catch (err) {
        console.log("mongoDBCreateCarController() err: ", err);
        res.status(400).json({ err: err.message, });
    }
};

exports.mongoDBListAllCarsController = async (req, res) => {
    const cars = await carModel
        .find({})
        .limit(parseInt(req.params.count))
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(cars);
};

exports.mongoDBDeleteCarController = async (req, res) => {
    try {
        const deleted = await carModel
            .findOneAndRemove({slug: req.params.slug,})
            .exec();
        res.json(deleted);
    } catch (err) {
        console.log("mongoDBDeleteCarController() err: ", err);
        return res.status(400).send("Car deletion failed");
    }
};

//Gets the single car by the slug.
exports.mongoDBGetSingleCarController = async (req, res) => {
    const car = await carModel
        .findOne({ slug: req.params.slug })
        .exec();
    res.json(car);
};

exports.mongoDBUpdateCarController = async (req, res) => {
    try {
        if (req.body.licensePlate) {
            req.body.slug = slugify(req.body.licensePlate);
        }
        const updatedCar = await carModel
            .findOneAndUpdate({ slug: req.params.slug }, req.body,{ new: true })
            .exec();
        res.json(updatedCar);
    } catch (err) {
        console.log("CAR UPDATE ERROR ----> ", err);
        res.status(400).json({
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
exports.mongoDBCarsListPaginationController = async (req, res) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 8;

        const cars = await carModel.find({})
            //skipping the number of products from the page previous to the chosen page.
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(cars);
    } catch (err) {
        console.log("mongoDBCarsListPaginationController() err: ", err);
    }
};

//Getting the total car count for the pagination.
exports.mongoDBCarsCountController = async (req, res) => {
    let total = await carModel
        .find({})
        .estimatedDocumentCount()
        .exec();
    res.json(total);
};

// SEARCH / FILTER
exports.mongoDBCarsSearchFiltersController = async (req, res) => {
    const { query } = req.body;
    if (query) {
        console.log("query --->", query);
        const car = await carModel.find({ $text: { $search: query } }).exec();
        res.json(car);
    }
};
