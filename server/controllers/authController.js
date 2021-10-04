//Const
const User = require("../models/userModel");

exports.createOrUpdateUserController = async (req, res) => {
   const { email, name, surname, date, fiscal_code, address, city, province, notes, mobile, role, slug } = req.user;
  //Find and update the user in the database.
  const user = await User.findOneAndUpdate(
    //First arg is the search criteria. What we want to find.
    { email },
    //Second is what we want to update. In this case is name and picture. 
    { name: email.split("@")[0] },
    //This argument is optional. It returns the updated user information.
    { new: true }
  );

  if (user) {
    //If user exists, we get the user.
    window.alert("USER UPDATED");
    res.json(user);
  } else {
    //If not existing, we create the user.
    const newUser = await new User({
        name,
        surname,
        date,
        fiscal_code,
        address,
        city,
        province,
        notes,
        mobile,
        email,
        role,
        slug,
    }).save();

    window.alert("USER CREATED");

    //We send in the response the new user object.
    res.json(newUser);
  }
};

exports.currentUserController = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(JSON.stringify(err));
    res.json(user);
  });
};
