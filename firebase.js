// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCilY70GEaQ01Fy1U0uKqKaRKzhgnP571A",
  authDomain: "crud-firebase-ccfc1.firebaseapp.com",
  projectId: "crud-firebase-ccfc1",
  storageBucket: "crud-firebase-ccfc1.appspot.com",
  messagingSenderId: "946142222495",
  appId: "1:946142222495:web:3e8a3bdfe8f85d9d0f2aaa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
