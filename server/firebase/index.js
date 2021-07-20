const admin = require("firebase-admin");
//Connect the file with the key form the FB
const serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://carservicecms-default-rtdb.europe-west1.firebasedatabase.app",
});

module.exports = admin;
