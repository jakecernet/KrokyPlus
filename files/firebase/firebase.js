
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

function register(){
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value
    const g_token = generateToken();
    console.log(name, username, password, g_token)
    saveUserInfo(name, username, password, g_token)
    console.log("tukaj sem")
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
function saveUserInfo(name, username, password, g_token) {
  const db = firebase.firestore();
  db.collection("users")
  .doc(username)
  .set({
  name: name,
  username: username,
  password: password,
  token: g_token,
  })
  .then(() => {
    console.log("User information saved successfully!");
    })
    .catch((error) => {
    console.log(error.message);
  });
}
function saveUserInfo(name, username, password, g_token) {
    const db = firebase.firestore();
    db.collection("users")
      .doc(username)
      .set({
        name: name,
        username: username,
        password: password,
        token: g_token,
      })
      .then(() => {
        console.log("User information saved successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
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
      const query = usersRef.where("email", "==", name).limit(1);
  
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
return null;
}

function checkTokenOnLoad() {
    const token = getCookie("token");
    if (token) {
        if (token === "a0a0a0a0a0a0a0a0a0a0a0a0"){
          return
        } else{
      getUsernameFromToken(token)
        }
    } else {
      console.log("No token found.");
      pass
    }
  }


function register(){
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value
        const g_token = generateToken();
        console.log(name, username, password, g_token)
        saveUserInfo(name, username, password, g_token)
        console.log("tukaj sem")
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