var admin = require("firebase-admin");
//Connect the file with the key form the FB
var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-225c8.firebaseio.com",
});

module.exports = admin;
