const admin = require("firebase-admin");
//Connect the file with the private key gotten from the Fire Base
const serviceAccount = require("../configurationFiles/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://carservicecms-default-rtdb.europe-west1.firebasedatabase.app",
});

module.exports = admin;
