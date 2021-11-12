//Const
const User = require("../models/userModel");
const Slugify = require("slugify");

//This function checks the database for the user with current credentials. If no user found it creates a new user with the credentials.
exports.createUserController = async (req, res) => {
    const { email, name, surname, date, fiscal_code, address, city, province, notes, mobile, role } = req.user;

    //Find and update the user in the database.
    const user = User.findOne({ email: req.user.email }).exec();

    if (user) {
        //If user exists, we get this message.
        res.send("This email address is already in use.");
    } else {
        //If not existing, we create the user.
        //Create and add the slug to the request body. The slug is formed from the fiscal_code and formatted with Slugify.
        req.body.slug = Slugify(req.body.fiscal_code);
        const newUser = await new User({ name, surname, date, fiscal_code, address, city, province, notes, mobile, email, role }).save();

        //We send in the response the new user object.
        res.json(newUser);
    }
};

exports.updateUserController = async (req, res) => {
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

exports.mongoDBGetCurrentUserController = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(JSON.stringify(err));
    res.json(user);
  });
};
