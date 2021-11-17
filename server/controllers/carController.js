// noinspection DuplicatedCode

const carModel = require("../models/carModel");
const Slugify = require("slugify");

exports.createCarController = async (req, res) => {
    try {
        //Create and add the slug to the request body. the slug is formed from the registration plate and formatted with Slugify.
        req.body.slug = Slugify(req.body.registrationPlate);
        const newCar = await new carModel(req.body).save();
        res.json(newCar);
    } catch (err) {
        window.alert(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.listAllCarsController = async (req, res) => {
    let DbCars = await carModel
        .find({})
        .limit(parseInt(req.params.count))
        .exec();
    res.json(DbCars);
};

exports.deleteCarController = async (req, res) => {
    try {
        const carToDelete = await carModel
            .findOneAndRemove({slug: req.params.slug,})
            .exec();
        res.json(carToDelete);
    } catch (err) {
        window.alert(err);
        return res.status(400).send("Car deletion failed");
    }
};

//Gets the single car by the slug. //TODO use this to get single elements from the DB.
exports.getSingleCarController = async (req, res) => {
    const product = await carModel
        .findOne({ slug: req.params.slug })
        .exec();
    res.json(product);
};

exports.updateCarController = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = Slugify(req.body.title);
        }
        const updated = await carModel
            .findOneAndUpdate({ slug: req.params.slug }, req.body,{ new: true })
            .exec();
        res.json(updated);
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
exports.carsListForPaginationController = async (req, res) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 3; // 3

        const cars = await carModel.find({})
            //skipping the number of products from the page previous to the chosen page.
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();
        res.json(cars);
    } catch (err) {
        window.log(err);
    }
};

//Getting the total car count for the pagination.
exports.carsCountController = async (req, res) => {
    let total = await carModel
        .find({})
        .estimatedDocumentCount()
        .exec();
    res.json(total);
};

// SEARCH / FILTER

const handleSearchQueryController = async (req, res, query) => {
    const clients = await carModel
        .find({ $text: { $search: query } })
        .exec();
    res.json(clients);
};

exports.searchFiltersController = async (req, res) => {
    const { query } = req.body;

    if (query) {
        console.log("query --->", query);
        await handleSearchQuery(req, res, query);
    }
};
