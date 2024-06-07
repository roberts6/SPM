// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQxTBII1gUIuAWpmL7dzJE9Z_iS-X2lwE",
  authDomain: "spmdb-40088.firebaseapp.com",
  projectId: "spmdb-40088",
  storageBucket: "spmdb-40088.appspot.com",
  messagingSenderId: "81759493355",
  appId: "1:81759493355:web:ff436b56dbd8e3a6d5f2ae",
  measurementId: "G-JCKDGGDFGL"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(appFirebase);
