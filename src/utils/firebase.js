// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "deeflow-blog.firebaseapp.com",
  projectId: "deeflow-blog",
  storageBucket: "deeflow-blog.appspot.com",
  messagingSenderId: "79217753542",
  appId: "1:79217753542:web:c2ec9dd4ce1a9d67fc46c7",
  measurementId: "G-HZ2D8D4YBF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);