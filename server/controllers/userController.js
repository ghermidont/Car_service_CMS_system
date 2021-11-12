const userModel = require("../models/userModel");
const Slugify = require("slugify");

//INFORMATION populate() gets extra fields information from the same document in the same answer without making any other extra requests.

exports.listAllUsers = async (req, res) => {
    let dbUsers = await userModel.find({}).exec();
    res.json(dbUsers);
};

exports.removeUser = async (req, res) => {
    try {
        const userToDelete = await userModel.findOneAndRemove({
            slug: req.params.slug,
        }).exec();
        res.json(userToDelete);
    } catch (err) {
        window.alert(err);
        return res.status(400).send("User deletion failed");
    }
};

//Gets the single car by the slug. //TODO use this to get single elements from the DB.
exports.getSingleUser = async (req, res) => {
    const product = await userModel.findOne({ slug: req.params.slug }).exec();
    res.json(product);
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
exports.usersListForPagination = async (req, res) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 10;

        const users = await userModel.find({})
            //skipping the number of products from the page previous to the chosen page.
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(users);
    } catch (err) {
        window.log(err);
    }
};

//Getting the total users count for the pagination.
exports.usersCount = async (req, res) => {
    let total = await userModel.find({}).estimatedDocumentCount().exec();
    res.json(total);
};

// SEARCH / FILTER

const handleSearchQuery = async (req, res, query) => {
    const products = await userModel.find({ $text: { $search: query } })
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
