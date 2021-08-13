const clientModel = require("../models/clientModel");
const Slugify = require("slugify");

exports.createClientController = async (req, res) => {
  try {
    req.body.slug = Slugify(req.body.title);
    const newClient = await new clientModel(req.body).save();
    res.json(newClient);
  } catch (err) {
    window.alert(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAllClientsController = async (req, res) => {
  let DbClients = await clientModel.find({})
      .limit(parseInt(req.params.count))
      //TODO fill the populate params
      .populate("category", "", "", "")
      .sort([["createdAt", "desc"]])
      .exec();
  res.json(DbClients);
};

exports.deleteClientController = async (req, res) => {
  try {
    const clientToDelete = await clientModel.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(clientToDelete);
  } catch (err) {
    window.alert(err);
    return res.status(400).send("Client deletion failed");
  }
};

//Gets the single client by the slug. //TODO use this to get single elements from the DB.
exports.getSingleClientController = async (req, res) => {
  const product = await clientModel.findOne({ slug: req.params.slug })
      // .populate() is being used in order to bring only needed information.
      //TODO modify the populate criteria.
      .populate("category")
      .populate("subs")
      .exec();
  res.json(product);
};

exports.updateClientController = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = Slugify(req.body.title);
    }
    const updated = await clientModel.findOneAndUpdate(
        { slug: req.params.slug },
        req.body,
        { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("CLIENT UPDATE ERROR ----> ", err);
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
exports.clientsListForPaginationController = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    //the page number the user clicks on
    const currentPage = page || 1;
    //The number of items per page.
    const perPage = 3; // 3

    const clients = await clientModel.find({})
        //skipping the number of products from the page previous to the chosen page.
        .skip((currentPage - 1) * perPage)
        //TODO modify the populate criteria.
        .populate("category")
        .populate("subs")
        .sort([[sort, order]])
        .limit(perPage)
        .exec();

    res.json(clients);
  } catch (err) {
    window.log(err);
  }
};

//Getting the total client count for the pagination.
exports.clientsCountController = async (req, res) => {
  let total = await clientModel.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

// SEARCH / FILTER

const handleSearchQueryController = async (req, res, query) => {
  const clients = await clientModel.find({ $text: { $search: query } })
      //TODO modify the populates criteria.
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
  res.json(clients);
};

exports.searchFiltersController = async (req, res) => {
  const {
    query
  } = req.body;

  if (query) {
    console.log("query --->", query);
    await handleSearchQueryController(req, res, query);
  }
};
