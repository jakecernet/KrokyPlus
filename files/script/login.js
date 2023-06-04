function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    document.cookie = "username=" + username;
    document.cookie = "password=" + password;
}