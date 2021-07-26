//!Update all the functions here according to the routes calls.
//! See what handleSearchQuery() does.
const CMSUserSchema = require("../models/CMSuserModel");
const Slugify = require("slugify");

exports.createCMSUserController = async (req, res) => {
  try {
    req.body.slug = Slugify(req.body.title);
    const newCMSUser = await new CMSUserSchema(req.body).save();
    res.json(newCMSUser);
  } catch (err) {
    window.alert(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

  exports.deleteCMSUserController = async (req, res) => {
    try {
      const CMSUserToDelete = await CMSUserSchema.findOneAndRemove({
        slug: req.params.slug,
      }).exec();
      res.json(CMSUserToDelete);
    } catch (err) {
      window.alert(err);
      return res.status(400).send("CMS user deletion failed");
    }
  };

  exports.updateCMSUserController = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = Slugify(req.body.title);
      }
      const updated = await CMSUserSchema.findOneAndUpdate(
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

  exports.listAllCMSUsersController = async (req, res) => {
    let DbCars = await CMSUserSchema.find({})
        .populate("category", "", "", "")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(DbCars);
  };

  exports.CMSUsersForPaginationController = async (req, res) => {
    try {
      // createdAt/updatedAt, desc/asc, 3
      const { sort, order, page } = req.body;
      //the page number the user clicks on
      const currentPage = page || 1;
      //The number of items per page.
      const perPage = 3; // 3

      const cars = await CMSUserSchema.find({})
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

  exports.getSingleCar = async (req, res) => {
    const product = await CMSUserSchema.findOne({ slug: req.params.slug })
        // .populate() is being used in order to bring only needed information.
        //TODO modify the populate criteria.
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product);
  };

  const handleSearchQuery = async (req, res, query) => {
    const searchResults = await CMSUserSchema.find({ $text: { $search: query } })
        //TODO modify the populates criteria .
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();
    res.json(searchResults);
  };

  exports. searchFiltersController = async (req, res) => {
    const {
      query
    } = req.body;

    if (query) {
      console.log("query --->", query);
      await handleSearchQuery(req, res, query);
    }
  };