console.log("connected");

// FireBase 

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore, doc, getDoc, onSnapshot, collection, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

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


//Checking if user is login or logout
onAuthStateChanged(auth, (donor) => {
    if (donor) {
        console.log("You're sign in in donateDashboard.html");
    }
    else {
        console.log("Your session is expired or you are log out");
        location = "donate.html";
    }
});

// retriving username
onAuthStateChanged(auth, (Patient) => {

    // console.log(users.uid)
    if (Patient) {
        const username = document.getElementById("donername");
        const profilename = document.getElementById("donorprofilename");
        const patientname = document.getElementById("username");
        const patientemail = document.getElementById("usermail");

        const docRef = doc(fs, 'patients', Patient.uid);

        onSnapshot(docRef, (def) => {

            // Patient Name
            username.innerHTML = def.data().Name;
            patientname.innerHTML = def.data().Name;
            profilename.innerHTML = def.data().Name;
           

            //Patient Email
            patientemail.innerHTML = def.data().Email;


        })
    }
    else {
        // doc.data() will be undefined in this case
        console.log("User not exist!");
    }
});


// Request Working
let Request = document.getElementsByClassName("request");

for (let i = 0; i < Request.length; i++) {
    Request[i].addEventListener('click', () => {
        updateNotification();
    });

}


// Notifications
function updateNotification() {

    let numOfNotification = document.getElementById("notify");
    let notification = document.getElementById("updateNotice");
    let showNotif = document.getElementById("notifNo");
    let noticeMsg = document.getElementById("noticeMsg");

    let getNotificationNumber = localStorage.getItem("NoticeNumber");
    getNotificationNumber = parseInt(getNotificationNumber);


    if (getNotificationNumber) {
        localStorage.setItem("NoticeNumber", getNotificationNumber + 1);
        numOfNotification.innerHTML = getNotificationNumber + 1;
        notification.innerHTML = getNotificationNumber + 1;
        showNotif.innerHTML = getNotificationNumber + 1;
        numOfNotification.style.backgroundColor = "#ff646d";
        numOfNotification.style.display = "block";
        noticeMsg.style.display = "block";
    }
    else {
        localStorage.setItem("NoticeNumber", 1);
        numOfNotification.innerHTML = 1;
        notification.innerHTML = 1;
        showNotif.innerHTML = 1;
        numOfNotification.style.backgroundColor = "#ff646d";
        numOfNotification.style.display = "block";
        noticeMsg.style.display = "block";
    }
}



function showNotification() {
    let numOfNotification = document.getElementById("notify");
    let notification = document.getElementById("updateNotice");
    let showNotif = document.getElementById("notifNo");
    let noticeMsg = document.getElementById("noticeMsg");

    let getNotificationNumber = localStorage.getItem("NoticeNumber");
    getNotificationNumber = parseInt(getNotificationNumber);


    if (getNotificationNumber) {
        numOfNotification.innerHTML = getNotificationNumber;
        notification.innerHTML = getNotificationNumber;
        showNotif.innerHTML = getNotificationNumber;
        numOfNotification.style.backgroundColor = "#ff646d";
        noticeMsg.style.display = "block";
        numOfNotification.style.display = "block";
    }
    else {
        notification.innerHTML = 0;
        numOfNotification.innerHTML = 0;
        noticeMsg.style.display = "none";
    }
}

showNotification();


// Clear notification 

let clear = document.getElementById("clear");

clear.addEventListener('click', () => {

    let noticeMsg = document.getElementById("noticeMsg");
    let numOfNotification = document.getElementById("notify");
    let notification = document.getElementById("updateNotice");
    let showNotif = document.getElementById("notifNo");

    localStorage.setItem("NoticeNumber", 0);
    let getNotificationNumber = localStorage.getItem("NoticeNumber");
    getNotificationNumber = parseInt(getNotificationNumber);

    notification.innerHTML = "0";
    numOfNotification.style.display = "none";
    showNotif.style.display = "none";
    noticeMsg.style.display = "none";
});




// Showing History Of Blood Donation request
let i=0;
function displayHistory() {


    let getreqBloodBank = localStorage.getItem("reqBloodBank");
    getreqBloodBank = JSON.parse(getreqBloodBank);

    let historyContainer = document.getElementById("showHistory");
    let noRecord = document.getElementById("noRecord");

   
      
        historyContainer.innerHTML = '';
        Object.values(getreqBloodBank).map( detail => {

         
         if(getreqBloodBank && historyContainer)  { 
            noRecord.style.display = "none";
            i=i+1;
            // Date of history
            const date = new Date();
             historyContainer.innerHTML += `<div class="card">
            <h5 class="card-header"> <b>Record #0${i}</b> <span class="float-right">Date: ${date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}</h5>
            <div class="card-body">
              <h5 class="title">Details: <span class="float-right">Code: ${detail.Record+1000}</span></h5>
              <p class="text"></p>
              <p class="text" id="donorname"> <b>Patient Name: </b>${detail.patient}</p>
              <p class="text"  id="donorId"> <b>Patient ID: </b>${detail.id}</p>
              <p class="text" id="bloodGrp"> <b>Blood Group: </b>${detail.bloodGrp}</p>
              <p class="text" id="bloodGrp"> <b>Hospital: </b>${detail.hosital}</p>
              <p class="text" id="bloodGrp"> <b>Hospital ID: </b>${detail.hospitalid}</p>
              <p class="text" id="bloodGrp"> <b>Doctor: </b>${detail.doctor}</p>
              <p class="text" id="bloodGrp"> <b>Required Pints: </b>${detail.quantity}</p>
              <p class="text" id="bloodBank"> <b>Requested Blood Bank: </b>${detail.BloodBankReq}</p>
              <a class="btn btn-secondary text-light float-right">${detail.status}</a>
            </div>
          </div>`;

          
         }

        });

    


}

displayHistory();



///////////////////////////////////////////////// Logout /////////////////////////////////////////////////////////

let logOut = document.getElementById("logout");

logOut.addEventListener('click', (e)=> {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("Sucessfully logout!")
        location =  "patient.html";
      }).catch((error) => {
         consolr.log(error.message);
      });
})