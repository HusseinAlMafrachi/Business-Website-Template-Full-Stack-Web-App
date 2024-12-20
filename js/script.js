
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
var contactFormDB = firebase.database().ref("contactTable");

document.getElementById("contactSoft").addEventListener('submit', submitFunction);

function submitFunction(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var business = document.getElementById("business").value;
    var text = document.getElementById("text").value;
    var currentTime = new Date();
    var currentDate = (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + '-' + currentTime.getFullYear() + ' || ' + currentTime.getHours() + ":" + currentTime.getMinutes();
    let numColumn = 0;
    numColumn++;
    saveMessages(name, email, business, text, currentDate, numColumn);

    let alertMessage = document.querySelector(".alert");

    alertMessage.innerHTML += ` 
            <div class="alert alert-danger" role="alert">
                Application Was Submitted Successfully
            </div>
        `;
    document.getElementById("contactSoft").reset();
}

const saveMessages = (name, email, business, text, currentDate, numColumn) => {
    var newContactSoft = contactFormDB.push();
    newContactSoft.set({
        name: name,
        email: email,
        business: business,
        text: text,
        currentDate: currentDate,
        tableNumber: numColumn,
    });
};


