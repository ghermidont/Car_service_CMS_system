const userModel = require("../models/userModel");
const Slugify = require("slugify");
const User = require("../models/userModel");

exports.mongoDBUserUpdateController = async (req, res) => {
    const { email, name, surname, date, fiscal_code, address, city, province, notes, mobile, role } = req.user;

    //Find and update the user in the database.
    const updatedUser = await User.findOneAndUpdate(
        //First arg is the search criteria. What we want to find.
        { email },
        //Second is what we want to update. In this case is name and picture.
        {
            email,
            name,
            surname,
            date,
            fiscal_code,
            address,
            city,
            province,
            notes,
            mobile,
            role
        },
        //This argument is optional. It returns the updated user information.
        { new: true }
    );

    if (updatedUser) {
        //If user exists, we get the user.
        window.alert("USER UPDATED");
        res.json(updatedUser);
    } else {
        //We send in the response the new user object.
        res.send("Could not update the user info. Please try again."); }
};
