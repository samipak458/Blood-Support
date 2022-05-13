// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8RMkayDqpQZN1wLz63b2VI-_fWnidVoQ",
  authDomain: "donate-blood-7e4ec.firebaseapp.com",
  projectId: "donate-blood-7e4ec",
  storageBucket: "donate-blood-7e4ec.appspot.com",
  messagingSenderId: "482764734847",
  appId: "1:482764734847:web:cf8ab52b7fe4f3ae8f1a4a",
  measurementId: "G-FYZY495R9S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore();

// Donor Sign In

const signInBtn = document.getElementById("btn1");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const signinEmail = document.getElementById("login-email").value;
  const signinPassword = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, signinEmail, signinPassword)
    .then(() => {
      console.log("login invoked");
      location = "donorDashboard.html";
    })
    .catch((err) => {
      const signinError = document.getElementById("errorMessage");
      signinError.innerText = err.message;
    });
});
