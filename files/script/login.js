async function fetchMeals(username, password) {
    await kroky.login(username, password);
    return await kroky.getMeals(1);
  }

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    document.cookie = "username=" + username;
    document.cookie = "password=" + password;
    window.open("/user-area.html", "_blank");
}


function display(){
    let username = getCookie("username");
    let password = getCookie("password");
    const userDisplayWidget = document.getElementById("user");
    userDisplayWidget.innerHTML = username + " " + password;
    const MenuDisplayWidget = document.getElementById("test123"); 
    fetchMeals(username, password)


}   
