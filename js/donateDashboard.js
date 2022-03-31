console.log("Connected");

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
onAuthStateChanged(auth, (donor) => {

    
    if (donor) {
        const username = document.getElementById("donername");
        const profilename = document.getElementById("donorprofilename");
        const donorname = document.getElementById("username");
        const donoremail = document.getElementById("usermail");
        const displayname = document.getElementById("displayname");
        const id = document.getElementById("donorId");

        const docRef = doc(fs, 'donors', donor.uid);

        onSnapshot(docRef, (def) => {

            // Donor Name
            username.innerHTML = def.data().Name;
            donorname.innerHTML = def.data().Name;
            profilename.innerHTML = def.data().Name;
            displayname.innerHTML = "Donor: " + def.data().Name;

            //Donor Email
            donoremail.innerHTML = def.data().Email;

            // Donor ID
            id.innerText = "Donor ID: " + def.data().ID;


        })
    }
    else {
        // doc.data() will be undefined in this case
        console.log("User not exist!");
    }
});


// Request Working
let Request = document.getElementsByClassName("request");

// History Of Donation
let bloodBank = ["Sahara","AMTF","Saylani","Hussaini","Hussaini"];

// Req Status Messsage
let msg = document.getElementsByClassName("statMsg");

for (let i = 0; i < Request.length; i++) {
    Request[i].addEventListener('click', () => {

          // Adding Blood bank requested in donor record
          onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                updateDoc(doc(fs, 'donors', userCredential.uid), {
                    BloodBank: bloodBank[i]

                }).then(() => {
                    console.log("updated");
                }).catch(err => {
                    console.log(err.message);
                })
            }
        })

       getHistory(DonorHistoryList[i]);
       showStatus(Request[i]);

       updateNotification();
        getStatusMsg(msg[i]);
        cancels[i].style.display = "block";
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






// Creating History on request


let DonorHistoryList;

onAuthStateChanged(auth, (donor) => {

    const docRef = doc(fs, 'donors', donor.uid);


    onSnapshot(docRef, (def) => {

        // Donor Details
        DonorHistoryList = [
            {
                tag:"Sahara",
                donor: def.data().Name,
                id: def.data().ID,
                bloodGrp: def.data().BloodGroup,
                BloodBankReq: "Sahara",
                Record: 0
            },
            {
                tag:"AMTF",
                donor: def.data().Name,
                id: def.data().ID,
                bloodGrp: def.data().BloodGroup,
                BloodBankReq: "AMTF",
                Record: 0
            },
            {
                tag:"Saylani",
                donor: def.data().Name,
                id: def.data().ID,
                bloodGrp: def.data().BloodGroup,
                BloodBankReq: "Saylani",
                Record: 0
            },
            {
                tag:"Hussaini",
                donor: def.data().Name,
                id: def.data().ID,
                bloodGrp: def.data().BloodGroup,
                BloodBankReq: "Hussaini",
                Record: 0
            },
            {
                tag:"Hussaini",
                donor: def.data().Name,
                id: def.data().ID,
                bloodGrp: def.data().BloodGroup,
                BloodBankReq: "Hussaini",
                Record: 0
            }
        
        ]

    })
})


/////////////////////////////////////////// History of Donation ///////////////////////////////////////////////// 


// Display requested after click on button request
function showStatus(getStatus)
{
    localStorage.setItem("status","Requested");
    let status = localStorage.getItem("status");
    getStatus.innerText = status;
}


function getHistory(history){
    setHistory(history);
}


let setHistory = (reqHistory) => {

    let Item = localStorage.getItem("reqBloodBank");
    Item = JSON.parse(Item);

    if (Item != null) {
        if (Item[reqHistory.tag] == undefined) {
            Item = {
                ...Item, //items already added in object
                [reqHistory.tag]: reqHistory
            }
        }
        Item[reqHistory.tag].Record += 1;
    }
    else {
        reqHistory.Record = 1;
        Item = {
            [reqHistory.tag]: reqHistory
        }
    }
    localStorage.setItem("reqBloodBank", JSON.stringify(Item));
}





///////////////////////////////////////  Saving Blood Bank  ////////////////////////////////////////////////
var BloodBankList ;

BloodBankList = [
    {
        tag: "Sahara",
        BloodBankName: "Sahara Blood Bank",
        address: "Main Gurumandar, Community Centre, Karachi.",
        RequiredBloodGrp: "A-, AB-, AB+, O-" ,
        RecordNo: 0       
    },
    {
        tag:"AMTF",
        BloodBankName: "AMTF Blood Bank",
        address: "Shahrah-e-Jahangir, Block 10 Gulberg Town.",
        RequiredBloodGrp: "B-, AB-, A-, O+",
        RecordNo: 0
    },
    {
        tag:"Saylani",
        BloodBankName: "Saylani Blood Bank",
        address: "Block No.4 Gulshan-e-Iqbal, Karachi",
        RequiredBloodGrp: "AB+, AB-, O-, O+",
        RecordNo: 0
    },
    {
        tag:"Husaini",
        BloodBankName: "Husaini Blood Bank",
        address: "Shan Hospital Brashid Minhas Rd.,Block 5 Gulshan -e- Iqbal",
        RequiredBloodGrp: "AB-, AB+, O-",
        RecordNo: 0
    },
    {
        tag:"Husaini",
        BloodBankName: "Husaini Blood Bank",
        address: "Block T Qalandria Chowk Opp Talib Chaman Park North Nazimabad.",
        RequiredBloodGrp: "AB+, O+",
        RecordNo: 0
    }
]


var saved = document.getElementsByClassName("save");



for(let i=0; i<saved.length;i++)
{
   saved[i].addEventListener('click', ()=> {
    getBloodBankList(BloodBankList[i]);
    saved[i].innerText = "Saved";

   })
}


function getBloodBankList(list)
{
    setBloodBankList(list)
}

let setBloodBankList = (BloodBank) => {

    let Item = localStorage.getItem("saveBloodBank");
    Item = JSON.parse(Item);

    if (Item != null) {
        if (Item[BloodBank.tag] == undefined) {
            Item = {
                ...Item, //items already added in object
                [BloodBank.tag]: BloodBank
            }
        }
        Item[BloodBank.tag].RecordNo += 1;
    }
    else {
        BloodBank.RecordNo = 1;
        Item = {
            [BloodBank.tag]: BloodBank
        }
    }
    localStorage.setItem("saveBloodBank", JSON.stringify(Item));
}




/////////////////////////////////////////////// Card Working ///////////////////////////////////////////////////////

function getStatusMsg(msg){
    setMsg(msg);
}


function setMsg(msg)
{
    localStorage.setItem("showReq","Your donation request has been send to blood bank...");
    let message = localStorage.getItem("showReq");
    msg.innerText = message;
    
  
}


//////////////////////////////////////////// Cards Update on Cancel //////////////////////////////////////////////

let cancels = document.getElementsByClassName("btns");


for(let i=0;i<cancels.length; i++)
{
   cancels[i].addEventListener('click', ()=> {
    cancels[i].innerText = "Cancelled";
    msg[i].innerText = "Your request has been cancelled...";
    localStorage.setItem("showReq","Your request has been cancelled...");
   })
}



///////////////////////////////////////////////////// Search ///////////////////////////////////////////////////////

//Searching Note by keyword
let searchNote = document.getElementById('searchText');
searchNote.addEventListener('input', function () {

    let search = searchNote.value.toLowerCase();

    let noteCards = document.getElementsByClassName('card');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("h4")[0].innerText.toLowerCase();
        let cardTxt2 = element.getElementsByTagName("span")[0].innerText.toLowerCase(); 

        if (cardTxt.includes(search) || cardTxt2.includes(search)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});

///////////////////////////////////////////////// Logout /////////////////////////////////////////////////////////

let logOut = document.getElementById("logout");

logOut.addEventListener('click', (e)=> {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("Sucessfully logout!")
        location =  "donate.html";
      }).catch((error) => {
         consolr.log(error.message);
      });
})