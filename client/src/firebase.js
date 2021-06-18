import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
     authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
     databaseURL: process.env.REACT_APP_FIRE_BASE_DB_URL,
     projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
     storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
     measurementId: process.env.REACT_APP_FIRE_BASE_MEASUREMENT_ID,
     region: 'europe-west1'

    apiKey: "AIzaSyC0H62pHF1ecsDOim4mdASntlLgS1gzwQ4",
    authDomain: "carservicecms.firebaseapp.com",
    projectId: "carservicecms",
    storageBucket: "carservicecms.appspot.com",
    messagingSenderId: "245689319179",
    appId: "1:245689319179:web:e895d969b62c090187ec0e",
    measurementId: "G-DMY7TK5ZE1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
