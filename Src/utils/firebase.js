// import firebase from "firebase";
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd39EJhHClPEdDjnr8lK7t719Fg4qMe34",
  authDomain: "yasma-a52a0.firebaseapp.com",
  projectId: "yasma-a52a0",
  storageBucket: "yasma-a52a0.appspot.com",
  messagingSenderId: "448732822172",
  appId: "1:448732822172:web:1e31d42b7bd18750510b59",
  measurementId: "G-W6MD2XTNLW",
};
const FireBase = initializeApp(firebaseConfig);
// const db = getFirestore(app);
export default FireBase;