const User = require("../models/userModel");
const Slugify = require("slugify");

//This function checks the database for the user with current credentials. If no user found it creates a new user with the credentials.
exports.mongoDBCreateNewUserController = async (req, res) => {

    console.log("mongoDBCreateNewUserController() worked");

    const {
        company_name,
        current_residence,
        current_city,
        current_province,
        official_residence,
        official_city,
        official_province,
        fiscal_code,
        images,
        email,
        role
    } = req.body;

    console.log("mongoDBCreateNewUserController() email", email);

    //console.log("req.data.role", req.data.role);
    //Find and update the user in the database.
    const user = await User.findOne({ email: email }, { new: true }).exec();
    console.log("back end mongoDB user: ", JSON.stringify(user));

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
            company_name,
            current_residence,
            current_city,
            current_province,
            official_residence,
            official_city,
            official_province,
            fiscal_code,
            images,
            email,
            role
        }).save();

        console.log( `New user created: ${newUser}` );
        //We send in the response the new user object.
        res.json(newUser);
    }
};

exports.mongoDBGetCurrentUserController = async ( req, res ) => {
    console.log("mongoDBGetCurrentUserController() req.query.email: ", JSON.stringify(req.query.email));
    User.findOne({ email: req.query.email }).exec(
        ( err, user ) => {
            if ( err ) {
                throw new Error( JSON.stringify( err ) );
            }
            console.log( "mongoDBGetCurrentUserController() user: ", user );
            res.json(user);
        });
};
