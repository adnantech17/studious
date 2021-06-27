import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"
import firebaseConfig from "./key";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
