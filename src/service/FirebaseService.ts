// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfw3gZsOjx5hwODJ1gzg5nEYYfW--ZEEI",
  authDomain: "cyberlift-d116f.firebaseapp.com",
  databaseURL: "https://cyberlift-d116f-default-rtdb.firebaseio.com",
  projectId: "cyberlift-d116f",
  storageBucket: "cyberlift-d116f.appspot.com",
  messagingSenderId: "751456446610",
  appId: "1:751456446610:web:105b3371571adc94469e4b"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);