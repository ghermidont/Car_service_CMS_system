const User = require("../models/userModel");
const Slugify = require("slugify");

//This function checks the database for the user with current credentials. If no user found it creates a new user with the credentials.
exports.createUserController = async (req, res) => {
    const { email, name, surname, date, fiscal_code, address, city, province, notes, mobile, role } = req.user;

    //Find and update the user in the database.
    const user = User
        .findOne({ email: req.user.email }, { new: true })
        .exec();
    if (user) {
        //If user exists, we get this message.
        res.send("This email address is already in use.");
        res.json(user);
    } else {
        //If not existing, we create the user.
        //Create and add the slug to the request body. The slug is formed from the fiscal_code and formatted with Slugify.
        req.body.slug = Slugify(req.body.fiscal_code);
        const newUser = await new User({ name, surname, date, fiscal_code, address, city, province, notes, mobile, email, role }).save();
        alert("New user created.", );
        //We send in the response the new user object.
        res.json(newUser);
    }
};

exports.mongoDBGetCurrentUserController = async (req, res) => {
    User
        .findOne({ email: req.user.email })
        .exec((err, user) => {
            if (err) throw new Error(JSON.stringify(err));
            res.json(user);
        });
};
