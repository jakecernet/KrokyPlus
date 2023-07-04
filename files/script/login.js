async function fetchMeals(username, password) {
  await kroky.login(username, password);
  return await kroky.getMeals(1);
}

function checkTrueToken(name, token) {
  return new Promise((resolve, reject) => {
    const usersRef = firebase.firestore().collection("users");
    const query = usersRef.where("token", "==", token).limit(1);
    query
      .get()
      .then((šara) => {
        if (!šara.empty) {
          const doc = snapshot.docs[0];
          const storedName = doc.data().username;
          if (name === storedName) {
            resolve(true);
          } else {
            reject();
          }
        } else {
          reject();
        }
      })
      .catch((error) => {
        reject(error);
      });
  })
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    const cookieName = decodeURIComponent(cookie[0]);
    const cookieValue = decodeURIComponent(cookie[1]);
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
}
function display_me() {
  const username = getCookie("username")
  const token = getCookie("token")
  checkTrueToken(username, token)
  .then((results) => {
    getPassword(username)
    .then((password) => {
      fetchMeals(username, password)
    })
    .catch((error) => {
      return
    })
  })
  .catch((error) => {
    return
  })
}   

function getPassword(username){
  db.collection("users")
  .doc(username)
  .get()
  const password = doc.data().password;
  console.log("tuki je password", password)
  return password
}

function show(){
  document.getElementById("animation").style.display = "block";
}