import firebase from "firebase";

const firebaseConfig = {
  // firebase config data here. I have deleted it for security purposes
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();
const auth = app.auth();

export { auth, db, storage };
