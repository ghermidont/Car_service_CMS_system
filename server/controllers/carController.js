const carModel = require("../models/carModel");
const Slugify = require("slugify");

exports.createCar = async (req, res) => {
    try {
        req.body.slug = Slugify(req.body.title);
        const newCar = await new carModel(req.body).save();
        res.json(newCar);
    } catch (err) {
       window.alert(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.listAllCars = async (req, res) => {
    let DbCars = await carModel.find({})
        .limit(parseInt(req.params.count))
        //TODO fill the populate params
        .populate("category", "", "", "")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(DbCars);
};

exports.deleteCar = async (req, res) => {
    try {
        const carToDelete = await carModel.findOneAndRemove({
            slug: req.params.slug,
        }).exec();
        res.json(carToDelete);
    } catch (err) {
        window.alert(err);
        return res.status(400).send("Car deletion failed");
    }
};

//Gets the single car by the slug. //TODO use this to get single elements from the DB.
exports.getSingleCar = async (req, res) => {
    const product = await carModel.findOne({ slug: req.params.slug })
        // .populate() is being used in order to bring only needed information.
        //TODO modify the populate criteria.
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product);
};

exports.updateCar = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = Slugify(req.body.title);
        }
        const updated = await carModel.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();
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
exports.carsListForPagination = async (req, res) => {
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
            //TODO modify the populate criteria.
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(cars);
    } catch (err) {
        window.log(err);
    }
};

//Getting the total car count for the pagination.
exports.carsCount = async (req, res) => {
    let total = await carModel.find({}).estimatedDocumentCount().exec();
    res.json(total);
};

// SEARCH / FILTER

const handleSearchQuery = async (req, res, query) => {
    const products = await carModel.find({ $text: { $search: query } })
        //TODO modify the populates criteria.
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();
    res.json(products);
};

exports.searchFilters = async (req, res) => {
    const {
        query
    } = req.body;

    if (query) {
        console.log("query --->", query);
        await handleSearchQuery(req, res, query);
    }
};
