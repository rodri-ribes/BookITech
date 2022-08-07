// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCueqjsQlOMCj3_nChcxdAHtIZe1KF0CDA",
  authDomain: "pf-books-58155.firebaseapp.com",
  projectId: "pf-books-58155",
  storageBucket: "pf-books-58155.appspot.com",
  messagingSenderId: "223624109594",
  appId: "1:223624109594:web:c36a0145fa768047947ba3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
