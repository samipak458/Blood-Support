console.log("Connected")

let card1 = document.getElementById("patientCard1");
let card2 = document.getElementById("patientCard2");
let card3 = document.getElementById("patientCard3");




const tableRow = document.getElementsByClassName("PnameRow");

let tableRows = document.getElementsByClassName("PnameRow");
let selectStatus = document.getElementsByClassName("select");
let cancelBtn = document.getElementsByClassName("cancel");
let acceptBtn = document.getElementsByClassName("accept");

let table = document.getElementById("TableDetails");

card1.addEventListener('click', ()=> {

    for(let i=0;i<tableRow.length;i++)
    {     
            tableRow[i].style.display = "table-row"
    }

    for(let i=0;i<tableRows.length;i++)
    {

        if(selectStatus[i].value != "pending")
        {
            tableRows[i].style.display = "none"
        }
    }
})


card2.addEventListener('click', ()=> {

    for(let i=0;i<tableRow.length;i++)
    {     
            tableRow[i].style.display = "table-row"
    }

    for(let i=0;i<tableRows.length;i++)
    {     
        if(selectStatus[i].value != "completed")
        {
            tableRows[i].style.display = "none"
        }
        cancelBtn[i].style.display = "none";
    }
})


card3.addEventListener('click', ()=> {

    for(let i=0;i<tableRow.length;i++)
    {     
            tableRow[i].style.display = "table-row"
    }

    for(let i=0;i<tableRows.length;i++)
    {
        if(selectStatus[i].value !=  "progress")
        {
            tableRows[i].style.display = "none"
        }
    }
})



let button = document.getElementById("btn");
let showSection = document.getElementById("show");

showSection.style.display = "none";

button.addEventListener("click", ()=> {
    showSection.style.display = "block";
})

function accept()
{
    
}

