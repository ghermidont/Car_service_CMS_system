//TODO Update all the functions here according to the routes calls.
//TODO See what handleSearchQuery() does.

const userSchema = require("../models/userModel");
const Slugify = require("slugify");

exports.deleteUserController = async (req, res) => {
    try {
        const CMSUserToDelete = await userSchema
            .findOneAndRemove({slug: req.params.slug,})
            .exec();
        res.json(CMSUserToDelete);
    } catch (err) {
        window.alert(err);
        return res.status(400).send("CMS user deletion failed");
    }
};

exports.toggleUserAccessController = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = Slugify(req.body.title);
        }
        const updated = await userSchema.findOneAndUpdate(
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

exports.listAllUsersController = async (req, res) => {
    let DbCars = await userSchema.find({})
        .populate("category", "", "", "")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(DbCars);
};

exports.usersForPaginationController = async (req, res) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 3; // 3

        const user = await userSchema.find({})
        //skipping the number of products from the page previous to the chosen page.
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();
        res.json(user);
    } catch (err) {
        window.log(err);
    }
};

exports.getSingleUserController = async (req, res) => {
    const user = await userSchema
        .findOne({ slug: req.params.slug })
        .exec();
    res.json(user);
};

exports.handleSearchQuery = async (req, res, query) => {
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