// FireBase 

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8RMkayDqpQZN1wLz63b2VI-_fWnidVoQ",
    authDomain: "donate-blood-7e4ec.firebaseapp.com",
    projectId: "donate-blood-7e4ec",
    storageBucket: "donate-blood-7e4ec.appspot.com",
    messagingSenderId: "482764734847",
    appId: "1:482764734847:web:cf8ab52b7fe4f3ae8f1a4a",
    measurementId: "G-FYZY495R9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const fs = getFirestore();


// patient Sign In

const signInBtn = document.getElementById("btn1");

signInBtn.addEventListener('click', e=> {
  e.preventDefault();

  const signinEmail = document.getElementById("login-email").value;
  const signinPassword = document.getElementById("login-password").value;

   signInWithEmailAndPassword(auth, signinEmail, signinPassword).then(()=> {
    console.log("login invoked");
    location = "patientDashboard.html";

   }).catch(err => {

       const signinError = document.getElementById("errorMessage");
       signinError.innerText = err.message;
   })

});