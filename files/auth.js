
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

submit = document.getElementById('submit').value;

document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
  });

submit.addEventListener('click',(e) => {

var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var username = document.getElementById('username').value;

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   // Signed in 
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid),{
        username: username,
        email: email
    })

    alert('user created!');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  // ..
  });

});

login.addEventListener('click',(e)=>{
 var email = document.getElementById('email').value;
 var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const dt = new Date();
       update(ref(database, 'users/' + user.uid),{
        last_login: dt,
      })

       alert('User loged in!');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
});

});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
if (user) {
  const uid = user.uid;
  //bla bla bla
  // ...
} else {
  // User is signed out
  // ...
  //bla bla bla
}
});

