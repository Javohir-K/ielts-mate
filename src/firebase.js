import firebase from "firebase";

const firebaseConfig = {
  // firebase config data here. I have deleted mine for security purposes
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();
const auth = app.auth();

export { auth, db, storage };
