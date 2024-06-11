import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAL-jrh6__iYGxqLrHucbZ_79dW8YhlTWc",
  authDomain: "spmfirebase-c792e.firebaseapp.com",
  databaseURL: "https://spmfirebase-c792e-default-rtdb.firebaseio.com",
  projectId: "spmfirebase-c792e",
  storageBucket: "spmfirebase-c792e.appspot.com",
  messagingSenderId: "864076740253",
  appId: "1:864076740253:web:3b3b153e27b749cd570674",
  measurementId: "G-7X06NLGHVK"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export { db, appFirebase };


