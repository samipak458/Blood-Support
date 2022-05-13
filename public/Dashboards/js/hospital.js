let card4 = document.getElementById("hospitalCard1");
let card5 = document.getElementById("hospitalCard2");
let card6 = document.getElementById("hospitalCard3");

const tableRow = document.getElementsByClassName("PnameRow");

let tableRows = document.getElementsByClassName("PnameRow");
let selectStatus = document.getElementsByClassName("select");
let cancelBtn = document.getElementsByClassName("cancel");
let acceptBtn = document.getElementsByClassName("accept");

card4.addEventListener('click', ()=> {

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


card5.addEventListener('click', ()=> {

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


card6.addEventListener('click', ()=> {

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
