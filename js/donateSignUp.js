// FireBase 

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

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

// Text Fields
let email = document.getElementById("inputEmail");
let phone = document.getElementById("inputPhone");
let age = document.getElementById("inputAge");
let cnic = document.getElementById("inputCNIC");
let bloodGroup = document.getElementById("selectBloodGroup").value;
let address = document.getElementById("inputAddress");
let city = document.getElementById("inputCity");
let password = document.getElementById("inputPassword");
let repassword = document.getElementById("inputRePassAgain");

// Text Fields error messages
let nameError = document.getElementById("name");
let emailError = document.getElementById("email");
let phoneError = document.getElementById("number");
let ageError = document.getElementById("age");
let cnicError = document.getElementById("cnic");
let addressError = document.getElementById("address");
let cityError = document.getElementById("city");
let passError = document.getElementById("password");
let repassError = document.getElementById("repassword");
let errorMessage = document.getElementById("errorMessage");

// Validation


// Email Validation
email.addEventListener('change', () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == false) {
        emailError.innerHTML = "*invalid email address";
    }
    else {
        emailError.innerHTML = "";
    }
})

// Age Validation
age.addEventListener('change', () => {
    if (age.value < 0 || age.value > 90) {
        ageError.innerText = "*Invalid age";
    }

    else if (age.value > 0 && age.value < 18) {
        alert("You cannot donate blood as you are under 18");
        ageError.innerText = "*ineligible";
        errorMessage.innerText = "*not eligible to donate";
    }

    else {
        ageError.innerText = "";
        errorMessage.innerText = "";
    }
})

// Phone Number Validation
phone.addEventListener('change', () => {

    if (phone.value.length != 11) {
        phoneError.innerText = "*Phone number is not valid";
    }
    else {
        phoneError.innerText = "";
    }
})

// CNIC Validation
cnic.addEventListener('change', () => {
    if (cnic.value.length != 13) {
        cnicError.innerText = "*Invalid CNIC";
    }
    else {
        cnicError.innerText = "";
    }
})

// Address Validation
address.addEventListener('change', () => {
    if (address.value.length < 5) {
        addressError.innerText = "*Invalid Address";
    }
    else {
        addressError.innerText = "";
    }
})

// City Validation
city.addEventListener('change', () => {
    if (city.value.length < 4) {
        cityError.innerText = "*Invalid City";
    }
    else {
        cityError.innerText = "";
    }
})


// Password Validation
password.addEventListener('change', () => {
    if (password.value.length < 8) {
        passError.innerText = "*Should contain 8 characters";
    }

    else {
        passError.innerText = "";
    }
})

// Confirm Password Validation
repassword.addEventListener('change', () => {
    if (password.value != repassword.value) {
        errorMessage.innerText = "*Pass and confirm pass should be same.";
    }
    else {
        errorMessage.innerText = "";
    }
})



// Donor Sign Up

let signUp = document.getElementById("signup-form");
let signUpBtn = document.getElementById("btn1");
let id = 21456;

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();


    // Check Form Details 
    if (phone.value == "" || age.value == "" || cnic.value == "" || number.value == "" || email.value == "" || address.value == ""
        || city.value == "" || password.value == "" || repassword.value == "") {
        errorMessage.innerText = "*Please add your details";
        alert("Please add your details");
        location.reload();
    }

    // If every thing is alright then add this donor to database
    else {
        errorMessage.innerText = "";

        let emailaddress = document.getElementById("inputEmail").value;
        let donorname = document.getElementById("Name").value;

        createUserWithEmailAndPassword(auth, emailaddress, password.value).then((userCredential) => {
            return setDoc(doc(fs, 'donors', userCredential.user.uid), {
                Name: donorname,
                Email: emailaddress,
                Phone: phone.value,
                Age: age.value,
                CNIC: cnic.value,
                BloodGroup: bloodGroup,
                Address: address.value,
                City: city.value,
                Password: password.value,
                ID: id+23
            })
        }).then(() => {
            signUp.reset();
            console.log('Account created Successfully success!');
            location = "donorDashboard.html";
        }).catch(err => {
            console.log(err.message);
            errorMessage.innerText = "Cannot Signup";
        }).catch(err => {
            console.log(err.message);
            errorMessage.innerText = "Cannot Signup";
        });

    }

});