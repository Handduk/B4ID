// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBGLiGEWFfO7LIji3sQXP6icQGWhdVogw",
  authDomain: "b4id-proj.firebaseapp.com",
  projectId: "b4id-proj",
  storageBucket: "b4id-proj.firebasestorage.app",
  messagingSenderId: "782825710836",
  appId: "1:782825710836:web:797ee4a2b0cd88d07d2aa1",
  measurementId: "G-8LTLK0XLL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export {db, auth, app}
