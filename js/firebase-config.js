import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkqodmUj841fC3F0HLj1j1PKyjBpsY7pc",
  authDomain: "testboard-f25ed.firebaseapp.com",
  projectId: "testboard-f25ed",
  storageBucket: "testboard-f25ed.firebasestorage.app",
  messagingSenderId: "58306963773",
  appId: "1:58306963773:web:a68e2fdeba14dabed6fd54"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
