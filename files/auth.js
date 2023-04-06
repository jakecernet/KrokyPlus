
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

const firebaseConfig = {
    apiKey: "AIzaSyD1fTaLIQOrD96rZUvkxJYYgUt2esHlrYo",
    authDomain: "krokyplus.firebaseapp.com",
    databaseURL: "https://krokyplus-default-rtdb.firebaseio.com",
    projectId: "krokyplus",
    storageBucket: "krokyplus.appspot.com",
    messagingSenderId: "910855641568",
    appId: "1:910855641568:web:1a3e0363c6ab7f5f253385",
    measurementId: "G-NZB4C0XD2Y"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

signUp.addEventListener("click", (e) => {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
});