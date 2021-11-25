const testModel = require("../models/testModel");

exports.mongoDBTestController = async (req, res) => {
    console.log(JSON.stringify(req.body.name));
    // const {name} = req.body.params;
    // const newTest = await new testModel({name: name}).save();
    // console.log( `New test created: ${newTest}` );
    // res.json(newTest);
};