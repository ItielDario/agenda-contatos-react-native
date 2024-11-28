// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database"; // IMPORTAÇÃO DO GETDATABASE -------------------

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBwyPaDt6NAD9yStJH-6A2KGs7ru8Jt98",
  authDomain: "agenda-b2aa4.firebaseapp.com",
  databaseURL: "https://agenda-b2aa4-default-rtdb.firebaseio.com",
  projectId: "agenda-b2aa4",
  storageBucket: "agenda-b2aa4.firebasestorage.app",
  messagingSenderId: "254345056342",
  appId: "1:254345056342:web:415333eea53e4594a9abf7",
  measurementId: "G-5CHFKTBW0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app) // PEGA OS DADOS DO FIREBASE -------------------

const analytics = getAnalytics(app);

export { db } // ESPORTADO OS DADOS PARA OUTRAS PÁGINAS -------------------