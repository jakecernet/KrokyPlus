document.addEventListener('DOMContentLoaded', function() {
  var loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.parentNode.removeChild(loadingScreen);
  }
});


const firebaseConfig = {
  apiKey: "AIzaSyDFC2TYDhw7ILNi_HVB5TlF0ZW-g6CzJeY",
  authDomain: "krokyplus-90d21.firebaseapp.com",
  projectId: "krokyplus-90d21",
  storageBucket: "krokyplus-90d21.appspot.com",
  messagingSenderId: "747520605008",
  appId: "1:747520605008:web:5c72d0004e9a956a7bca55",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function saveUserInfo(name, username, email, password, g_token) {
    const db = firebase.firestore();
    db.collection("users")
      .doc(username)
      .set({
        name: name,
        username: username,
        password: password,
        token: g_token,
        email: email,
      })
      .then(() => {
        console.log("User information saved successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

function saveToken(token, username, name){
  const db = firebase.firestore();
  db.collection("tokens")
    .doc(token)
    .set({
      name: name,
      username: username,
    })
    .then(() => {
      console.log("saved token");
    })
}

function replaceCookieWithFirestore(email) {
    return new Promise((resolve, reject) => {
      const usersRef = db.collection("users");
      const query = usersRef.where("email", "==", email).limit(1);
  
      query
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const firestoreCode = doc.get("token");
            setCookie("token", firestoreCode);
            resolve();
          } else {
            reject(new Error("User not found"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
function createCookieWithFirestore(name) {
    return new Promise((resolve, reject) => {
      const usersRef = db.collection("users");
      const query = usersRef.where("name", "==", name).limit(1);
  
      query
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const firestoreCode = doc.get("token");
            setCookie("token", firestoreCode);
            resolve();
          } else {
            reject(new Error("User not found"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

function setCookie(name, value) {
document.cookie = `${name}=${value}; path=/`;
}

function getCookie(name) {
const cookies = document.cookie.split("; ");
for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].split("=");
  if (cookie[0] === name) {
    return cookie[1];
  }
}
return " ";
}


function register(){
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const g_token = generateToken();
        checkUsernameExists(name, username, email, password, g_token);
        setCookie("token", g_token)
    });
}

function generateToken() {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  
    const allChars = uppercaseChars + lowercaseChars;
    let password = "";
  
    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }
  
    return password;
}

function checkUsernameExists(name, username, email, password, g_token) {
    return new Promise((resolve, reject) => {
      const usersRef = db.collection("users");
      const query = usersRef.where("username", "==", username).limit(1);
  
      query
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            alert("Uporabnik že obstaja, prosimo pišite na mail za pomoč.")
            location.reload()
            resolve(true);
          } else {
            saveUserInfo(name, username, email, password, g_token);
            saveToken(g_token, username, name)
            setCookie("token", g_token)
            alert("Registracija je bila uspešna. Preusmerjam ...");
            window.location.href = "/user-area"
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

function login(){
  document.getElementById("log-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    db.collection("users")
    .doc(username)
    .get()
    .then((doc) => {
      const name = doc.data().name;
      const password = doc.data().password;
      const token = doc.data().token;
      const input_password = document.getElementById("password").value;
      if (password !== input_password){
        alert("Geslo ni pravilno, poskusi še enkrat.")
      }else{
        const cookienamevalue = getCookie("name");
        if (cookienamevalue === null){
          setCookie("name", name);
          setCookie("username", username);
          setCookie("token", token);
          alert("Uspešno si bil vpisan.")
        }
      }
      })
      .catch((error) => {
        alert(error);
      });
    })
  }


function OnloadLogin(){
  console.log("checking token onload")
    const token = getCookie("token");
    if (token) {
        if (token === "a0a0a0a0a0a0a0a0a0a0a0a0"){
          return
        } else{
          db.collection
          .doc()
          .get()
          .then(() => {
            const name = getCookie(name)
            const token = getCookie(token)
            checkTrueToken(name, token)
            document.getElementById("naslov2").textContent = "KrokyPlus | Profil"
          })
        }
    } else {
      console.log("No token found.");
      pass
    }
  }


function checkTrueToken(name, token){
  return new Promise((resolve, reject) => {
    const usersRef = firebase.firestore().collection("users");
    const query = usersRef.where("token", "==", token).limit(1);
    query
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const storedName = doc.data().name;
          if (name === storedName) {
            console.log("Name is correct:", name);
            resolve();
          } else {
            reject;
          }
        } else {
          reject;
      }
  })
  })
}