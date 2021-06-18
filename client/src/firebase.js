import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
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
