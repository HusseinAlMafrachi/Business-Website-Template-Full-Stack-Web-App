
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

firebase.initializeApp(firebaseConfig);
var contactFormDB = firebase.database().ref("contactTable");
var contactFormDBforEmail = firebase.database().ref("EmailHomePage");
var contactFormDBprojectCount = firebase.database().ref("projectCount");

document.getElementById("login").addEventListener('submit', submitFunction);

function submitFunction(e) {
  e.preventDefault();
  var emailLogin = document.getElementById("email").value;
  var passwordLogin = document.getElementById("name").value;
  document.getElementById("login").reset();

  firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then(function (response) {
      console.log(response);
      alert('SignIm success');
      document.getElementById("loginProjectCount").addEventListener('submit', submitFunction2);

      function submitFunction2(e) {
        e.preventDefault();
        var count = document.getElementById("projectCountID").value;
        firebase.database().ref("/").child('projectCount').set({
          NumberOfProject: count,
        }
        );
      }


      if (response) {
        firebase.database().ref("/").child('contactTable').get(
          contactFormDB.once("value", function (snapshot) {
            var data = snapshot.val();
            for (let i in data) {
              let tableNumber = 1;
              let submitDate = data[i].currentDate;
              let name = data[i].name;
              let business = data[i].business;
              let email = data[i].email;
              let text = data[i].text;
              let infoResults = document.querySelector(".infoResults");
              infoResults.innerHTML += `
              <div class="container">
                  <div class="row ">
                    <div class="col-12 bg-light border ">
              <table id="sort" class="table table-fixed  table-bordered  table-hover table-striped">
                <thead class="">
                  <tr class="text-capitalize  bg-dark text-info">
                  <th>#</th>
                  <th>Name</th>
                    <th>email</th>
                    <th>business</th>
                    <th>submitDate</th>
                    <th>text</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-capitalize">
                  <th >${tableNumber}</th>
                    <th >${name}</th>
                    <th>${email}</th>
                    <th>${business}</th>
                    <th>${submitDate}</th>
                    <th>${text}</th>
                  </tr>   
                </tbody>
              </table>
                    </div>
                  </div>
              </div> `;
            }
          }

          )
        )
      } else {
        console.log("Second fierbase error");

      }




    }

    ).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

    });

  firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then(function (response) {
      console.log(response);
      alert('SignIm success');
      if (response) {
        firebase.database().ref("/").child('EmailHomePage').get(
          contactFormDBforEmail.once("value", function (snapshot) {
            var data2 = snapshot.val();
            for (let n in data2) {
              let email2 = data2[n].email;
              let emailHomePage = document.querySelector(".emailHomePage");
              emailHomePage.innerHTML += `
              <div class="container">
                  <div class="row ">
                    <div class="col-12 bg-light border ">
              <table id="sort" class="table table-fixed  table-bordered  table-hover table-striped">
                <thead class="">
                  <tr class="text-capitalize  bg-dark text-info">
                    <th>email</th>
                </thead>
                <tbody>
                  <tr class="text-capitalize">
                    <th>${email2}</th>
                  </tr>   
                </tbody>
              </table>
                    </div>
                  </div>
              </div> `;
            }
          }

          )
        )
      } else {
        console.log("First fierbase error");
      }
    }

    ).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

    });

  document.getElementById("login").addEventListener('logOut', logOutFunction);

  function logOutFunction() {

    window.localStorage.clear();
    window.location.reload(true);
    console.log("logOut successfully!")
  }


}