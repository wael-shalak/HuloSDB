// Firebase project configuration.
//
// Where to get this: Firebase console > (your project) > gear icon >
// Project settings > scroll to "Your apps" > the web app (</>) > SDK setup
// and configuration > "Config".
//
// This object is safe to keep public / commit to GitHub. It identifies your
// Firebase project to the browser, it is not a secret credential. Real
// security is enforced by firestore.rules (who can read/write data) and by
// the OWNER_EMAIL check inside index.html (who is allowed to edit).
firebase.initializeApp({
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID_HERE.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_PROJECT_ID_HERE.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
});

// Used throughout index.html as global `db`, `auth`.
const db = firebase.firestore();
const auth = firebase.auth();
