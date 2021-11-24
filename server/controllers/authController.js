const User = require("../models/userModel");
const Slugify = require("slugify");

//This function checks the database for the user with current credentials. If no user found it creates a new user with the credentials.
exports.mongoDBCreateNewUserController = async (req, res) => {
    window.alert(req);
    // const {
    //     company_name,
    //     current_residence,
    //     current_city,
    //     current_province,
    //     official_residence,
    //     official_city,
    //     official_province,
    //     fiscal_code,
    //     images,
    //     email,
    //     role
    // } = req.user;

    //Find and update the user in the database.
    const user = User.findOne({ email: req.user.email }, { new: true }).exec();

    if (user) {
        //If user exists, we get this message.
        res.send("This email address is already in use.");
        console.log("This email address is already in use.");
        res.json(user);
    } else {
        //If not existing, we create the user.
        //Create and add the slug to the request body. The slug is formed from the fiscal_code and formatted with Slugify.
        req.body.slug = Slugify(req.body.fiscal_code);
        const newUser = await new User({
            company_name: req.body.company_name,
            current_residence: req.body.current_residence,
            current_city: req.body.current_city,
            current_province: req.body.current_province,
            official_residence: req.body.official_residence,
            official_city: req.body.official_city,
            official_province: req.body.official_province,
            fiscal_code: req.body.fiscal_code,
            images: req.body.images,
            email: req.body.email,
            role: req.body.role
        }).save();
        alert( `New user created: ${newUser}` );
        //We send in the response the new user object.
        res.json(newUser);
    }
};

exports.mongoDBGetCurrentUserController = async ( req, res ) => {
    User.findOne({ email: req.user.email }).exec(
        ( err, user ) => {
            if ( err ) {
                throw new Error( JSON.stringify( err ) );
            }
            console.log( "user: ", user );
            res.json(user);
        });
};
