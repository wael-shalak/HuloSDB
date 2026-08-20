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
  apiKey: "AIzaSyBxJHiXnUgUeNpKQ2F48xGukmd8-xIoCQQ",
  authDomain: "hulo-supplier-data-base.firebaseapp.com",
  projectId: "hulo-supplier-data-base",
  storageBucket: "hulo-supplier-data-base.firebasestorage.app",
  messagingSenderId: "418554089223",
  appId: "1:418554089223:web:0d90bb1cf23970abaffa2"
});

// Used throughout index.html as global `db`, `auth`.
const db = firebase.firestore();
const auth = firebase.auth();
