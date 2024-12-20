// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-GGED8JIbRV7DVopGEkZldEeIHC-wWVo",
    authDomain: "full-stuck-soft-website.firebaseapp.com",
    projectId: "full-stuck-soft-website",
    storageBucket: "full-stuck-soft-website.firebasestorage.app",
    messagingSenderId: "160697542731",
    appId: "1:160697542731:web:eb22c2ff16c6ae0fc3c5ce",
    measurementId: "G-1QKPXRDYHF"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
var contactFormDB = firebase.database().ref("count");
var contactFormDBprojectCount = firebase.database().ref("projectCount");
var contactFormDBprojectDayCounter = firebase.database().ref("numberOfDays");


function countFunction() {
    if (window.onload) {
        //Days in Business
        var initialDate = new Date("04/19/2024");
        var now = Date.now();
        var difference = now - initialDate;
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        var daysSince = Math.floor(difference / millisecondsPerDay);
        let inBusiness = document.querySelector(".inBusiness");
        inBusiness.innerHTML += `
            <i class=" fa-solid ">${daysSince}</i>
            `;


        //Page Views
        contactFormDB.once("value", function (snapshot) {
            var dataVisits = snapshot.val().NumberOfCount;
            var setnum = dataVisits + 1;
            firebase.database().ref("/").child('count').set({
                NumberOfCount: setnum,
            }
            );
            let infoResults = document.querySelector(".infoResults");
            infoResults.innerHTML += `
            <i class=" fa-solid ">${setnum}</i>
            `;
        }
        )
        //Number of projects
        contactFormDBprojectCount.once("value", function (snapshot) {
            var dataProject = snapshot.val().NumberOfProject;
            let infoResults2 = document.querySelector(".infoResults2");
            infoResults2.innerHTML += `
            <i class="fa-solid">${dataProject}</i>
           
            
            `;
        }
        )

    } else {
        alert("Page is Not loaded");

    }
}

document.getElementById("contactEmail").addEventListener('submit', submitEmailFunction);

function submitEmailFunction(e) {
    e.preventDefault();
    var emailContact = getElementVal("emailContactInput");
    firebase.database().ref("/").child('EmailHomePage').push({

        email: emailContact,
    }
    );
    document.getElementById("contactEmail").reset();

}
const getElementVal = (id) => {
    return document.getElementById(id).value;
};


