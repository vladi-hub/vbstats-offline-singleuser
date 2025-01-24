const { initializeApp } = require('firebase/compat/app');
const { getAuth } = require('firebase/auth');
const { getStorage } = require('firebase/storage');


const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();


const firebaseConfig = {
		  apiKey: "AIzaSyAgspjgF5XHE8lJL_lsnPczctrsriMgjRU",
		  authDomain: "todoapp-82701.firebaseapp.com",
		  projectId: "todoapp-82701",
		  storageBucket: "todoapp-82701.appspot.com",
		  messagingSenderId: "634086767204",
		  appId: "1:634086767204:web:56e57c7f4e0d793f1cbd71",
		  measurementId: "G-31070FKS27"
		};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//const appCheck = admin.appCheck();
//Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
//key is the counterpart to the secret key you set in the Firebase console.
//appCheck.activate(
//'6Lf7NIUkAAAAADcj2fo7XfBIOCY0oVH6dLNETlLr',

// Optional argument. If true, the SDK automatically refreshes App Check
// tokens as needed.
//true);


const storage = getStorage(app);

module.exports = { admin, db, storage, auth}
