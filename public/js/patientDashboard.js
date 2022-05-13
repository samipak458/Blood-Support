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
        console.log("You're sign in in patientDashboard.html");
    }
    else {
       console.log("Your session is expired or you are log out");
        location = "patient.html";
    }
});


// retriving username and id
onAuthStateChanged(auth, (patient) => {


    if (patient) {
        const username = document.getElementById("donername");
        const profilename = document.getElementById("donorprofilename");
        const donorname = document.getElementById("username");
        const donoremail = document.getElementById("usermail");
        const displayname = document.getElementById("displayname");
        const id = document.getElementById("patientId");

        const docRef = doc(fs, 'patients', patient.uid);

        onSnapshot(docRef, (def) => {

            // Donor Name
            username.innerHTML = def.data().Name;
            donorname.innerHTML = def.data().Name;
            profilename.innerHTML = def.data().Name;
            displayname.innerHTML = "Patient: " + def.data().Name;

            //Donor Email
            donoremail.innerHTML = def.data().Email;

            // Donor ID
            id.innerText = "Patient ID: " + def.data().ID;


        })
    }
    else {
        // doc.data() will be undefined in this case
        console.log("User not exist!");
    }
});


///////////////////////////////////////////// Request Blood ////////////////////////////////////////////////////

// Input fields of requesting blood from blood bank

let attendant = document.getElementsByClassName("inputAttendantName");
let hospital = document.getElementsByClassName("inputHospitalName");
let hospitalID = document.getElementsByClassName("inputHospitalId");
let doctor = document.getElementsByClassName("inputDoctorName");
let quantity = document.getElementsByClassName("inputQuantity");
let bloodGroup = document.getElementsByClassName("selectBloodGroup");

// Input fields error messages

let attendantError = document.getElementsByClassName("attendantname");
let hospitalError = document.getElementsByClassName("hospitalname");
let hospitalIDError = document.getElementsByClassName("hospitalid");
let doctorError = document.getElementsByClassName("doctorname");
let quantityError = document.getElementsByClassName("quantity");
let error = document.getElementsByClassName("errorMessage");

// Vaidations

// function validation(attendant, attendantError, hospital, hospitalError, hospitalID, hospitalIDError, doctor, doctorError, quantity, quantityError){

// attendant.addEventListener('change', ()=> {
//     if(attendant.value.length < 3)
//     {
//         attendantError.style.color = "red";
//         attendantError.innerHTML = "*invalid name";
//     }
//     else{
//         attendantError.innerHTML = "";
//     }
// })


// hospital.addEventListener('change', ()=> {
//     if(hospital.value.length < 5)
//     {
//         hospitalError.style.color = "red";
//         hospitalError.innerHTML = "*invalid hospital";
//     }
//     else{
//         hospitalError.innerHTML = "";
//     }
// })

// hospitalID.addEventListener('change', ()=> {
//     if(hospitalID.value.length < 6)
//     {
//         hospitalIDError.style.color = "red";
//         hospitalIDError.innerHTML = "*invalid hospital";
//     }
//     else{
//         hospitalIDError.innerHTML = "";
//     }
// })

// doctor.addEventListener('change', ()=> {
//     if(doctor.value.length < 3)
//     {
//         doctorError.style.color = "red";
//         doctorError.innerHTML = "*invalid doctor name";
//     }
//     else{
//         doctorError.innerHTML = "";
//     }
// })

// quantity.addEventListener('change', ()=> {
//     if(quantity.value < 0 || quantity.value > 6)
//     {
//         quantityError.style.color = "red";
//         quantityError.innerHTML = "*Cannot request this quatity";
//     }
//     else{
//         quantityError.innerHTML = "";
//     }
// })

// }


// Request Working
let Request = document.getElementsByClassName("requestss");
// Requests
let requests = document.getElementsByClassName("request");


// Req Status Messsage
 let msg = document.getElementsByClassName("statMsg");

for (let i = 0; i < Request.length; i++) {

        Request[i].addEventListener('click',()=> {

            // Adding records
            onAuthStateChanged(auth, (userCredential) => {
                if (userCredential) {
                    updateDoc(doc(fs, 'patients', userCredential.uid), {
                        Attendant: attendant[i].value,
                        Hospital: hospital[i].value,
                        HospitalID: hospitalID[i].value,
                        Doctor: doctor[i].value,
                        BloodGroup: bloodGroup[i].value,
                        Quantity: quantity[i].value
        
        
                    }).then(() => {
                        console.log("updated");
                    }).catch(err => {
                        console.log(err.message);
                    })
                }
            })
        
       //    validation(attendant[i], attendantError[i], hospital[i], hospitalError[i], hospitalID[i], hospitalIDError[i], doctor[i], doctorError[i], quantity[i], quantityError[i] )
            error[i].innerHTML = "request sent";
            requests[i].innerHTML = "Requested";
            Request[i].innerHTML = "Confirm";
            error[i].innerHTML = "Click again to send request."
            setLocalStorage(attendant[i].value,hospital[i].value,hospitalID[i].value,doctor[i].value, bloodGroup[i].value, quantity[i].value);
            getHistory(PatientHistoryList[i]);
            updateNotification();
            showStatus(Request[i], error[i]);
             getStatusMsg(msg[i]);
             cancels[i].style.display = "block";
        })


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
let  PatientHistoryList;

function setLocalStorage(attendant,hospital,hospitalID,doctor, bloodGroup, quantity){

onAuthStateChanged(auth, (patient) => {

    const docRef = doc(fs, 'patients', patient.uid);


    onSnapshot(docRef, (def) => {

        //  Patient Details
        PatientHistoryList = [
            {
                tag:"Sahara",
                patient: def.data().Name,
                id: def.data().ID,
                attendant: attendant,
                bloodGrp: bloodGroup,
                hosital: hospital,
                hospitalid: hospitalID,
                doctor: doctor,
                quantity: quantity,
                BloodBankReq: "Sahara",
                Record: 0,
                status: "in process.."
            },
            {
                tag:"AMTF",
                patient: def.data().Name,
                id: def.data().ID,
                attendant: attendant,
                bloodGrp: bloodGroup,
                hosital: hospital,
                hospitalid: hospitalID,
                doctor: doctor,
                quantity: quantity,
                BloodBankReq: "AMTF",
                Record: 0,
                status: "in process.."
            },
            {
                tag:"Saylani",
                patient: def.data().Name,
                id: def.data().ID,
                attendant: attendant,
                bloodGrp: bloodGroup,
                hosital: hospital,
                hospitalid: hospitalID,
                doctor: doctor,
                quantity: quantity,
                BloodBankReq: "Saylani",
                Record: 0,
                status: "in process.."
            },
            {
                tag:"Hussaini",
                patient: def.data().Name,
                id: def.data().ID,
                attendant: attendant,
                bloodGrp: bloodGroup,
                hosital: hospital,
                hospitalid: hospitalID,
                doctor: doctor,
                quantity: quantity,
                BloodBankReq: "Hussaini",
                Record: 0,
                status: "in process.."
            },
            {
                tag:"Indus",
                patient: def.data().Name,
                id: def.data().ID,
                attendant: attendant,
                bloodGrp: bloodGroup,
                hosital: hospital,
                hospitalid: hospitalID,
                doctor: doctor,
                quantity: quantity,
                BloodBankReq: "Indus",
                Record: 0,
                status: "in process.."
            }
        
        ]

        
    })
})

}

/////////////////////////////////////////// History of Requests ///////////////////////////////////////////////// 


// Display requested after click on button request
function showStatus(getStatus,error)
{
    localStorage.setItem("status","Requested");
    let status = localStorage.getItem("status");
    getStatus.innerText = status;
    error.innerHTML = "";
    getStatus.style.display = "none";
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

/////////////////////////////////////////////// Card Working ///////////////////////////////////////////////////////

function getStatusMsg(msg){
    setMsg(msg);
}


function setMsg(msg)
{
    localStorage.setItem("showReq","Your request has been send to blood bank...");
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
    changeStatus(i);
   })
}


function changeStatus(i) {

    let Item = localStorage.getItem("saveBloodBank");
    Item = JSON.parse(Item);

    if (Item != null) {
        if (Item[PatientHistoryList[i].tag] == undefined) {
            Item = {
                ...Item, //items already added in object
                [PatientHistoryList[i].tag]: PatientHistoryList[i]
            }
        }
        Item[PatientHistoryList[i].tag].status = "cancelled";
    }
    else {
        PatientHistoryList[i].status = "cancelled";
        Item = {
            [PatientHistoryList[i].tag]: PatientHistoryList[i]
        }
    }
    localStorage.setItem("saveBloodBank", JSON.stringify(Item));
}


///////////////////////////////////////  Saving Blood Bank  ////////////////////////////////////////////////
var BloodBankList ;

BloodBankList = [
    {
        tag: "Sahara",
        BloodBankName: "Sahara Blood Bank",
        address: "Main Gurumandar, Community Centre, Karachi.",
        RequiredBloodGrp: "A-, A+, B-, AB+, AB-, AB+" ,
        RecordNo: 0       
    },
    {
        tag:"AMTF",
        BloodBankName: "AMTF Blood Bank",
        address: "Shahrah-e-Jahangir, Block 10 Gulberg Town.",
        RequiredBloodGrp: "B+, AB+, AB-, AB+, O-, O+",
        RecordNo: 0
    },
    {
        tag:"Saylani",
        BloodBankName: "Saylani Blood Bank",
        address: "Block No.4 Gulshan-e-Iqbal, Karachi",
        RequiredBloodGrp: "A+, B+, AB+, AB-, AB+, O+",
        RecordNo: 0
    },
    {
        tag:"Husaini",
        BloodBankName: "Husaini Blood Bank",
        address: "Shan Hospital Brashid Minhas Rd.,Block 5 Gulshan -e- Iqbal",
        RequiredBloodGrp: "A-, A+, B-, AB+, O-, O+",
        RecordNo: 0
    },
    {
        tag:"Indus",
        BloodBankName: "Indus Blood Bank",
        address: "Sector 39 Korangi Creek, Karachi",
        RequiredBloodGrp: "A-, A+, B+, AB+, AB-, AB+, O-",
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