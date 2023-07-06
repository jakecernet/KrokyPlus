var blacklist = document.getElementById("blacklist");
var whitelist = document.getElementById("meniblk");
var reset = document.getElementById("reset");
var meniji = document.getElementById("meniji");
var blacklist_btn = document.getElementById("blacklist_btn");
var whitelist_btn = document.getElementById("whitelist_btn");
var reset_btn = document.getElementById("reset_btn");
var navbar = document.getElementById("navbar");

whitelist.style.height = "0px";
whitelist.style.display = "none";
blacklist.style.display = "none";
blacklist.style.height = "0px";
reset.style.display = "none";

function showWhitelist() {
  if (whitelist.style.height === "0px") {
    whitelist.style.display = "block";
    setTimeout(function () {
      whitelist.style.height = "600px";
      blacklist.style.height = "0px";
      reset.style.height = "0px";
    }, 10);
    whitelist_btn.style.backgroundColor = "#f2f2f2";
    whitelist_btn.style.color = "#000";
    blacklist_btn.style.backgroundColor = "#091c38";
    blacklist_btn.style.color = "white";
    reset_btn.style.backgroundColor = "#091c38";
    reset_btn.style.color = "white";
  }
  else {
    whitelist.style.height = "0px";
    setTimeout(function () { whitelist.style.display = "none"; }, 300);
    whitelist_btn.style.backgroundColor = "#091c38";
    whitelist_btn.style.color = "white";
  }
}

function showBlacklist() {
  if (blacklist.style.height === "0px") {
    blacklist.style.display = "block";
    setTimeout(function () {
      blacklist.style.height = "110vh";
      whitelist.style.height = "0px";
      reset.style.height = "0px";
    }, 10);
    blacklist_btn.style.backgroundColor = "#f2f2f2";
    blacklist_btn.style.color = "#000";
    whitelist_btn.style.backgroundColor = "#091c38";
    whitelist_btn.style.color = "white";
    reset_btn.style.backgroundColor = "#091c38";
    reset_btn.style.color = "white";
  }
  else {
    blacklist.style.height = "0px";
    setTimeout(function () { blacklist.style.display = "none"; }, 300);
    blacklist_btn.style.backgroundColor = "#091c38";
    blacklist_btn.style.color = "white";
  }
}

function resetList() {
  if (reset.style.height === "0px") {
    reset.style.display = "block";
    setTimeout(function () {
      reset.style.height = "180px";
      blacklist.style.height = "0px";
      whitelist.style.height = "0px";
    }, 10);
    reset_btn.style.backgroundColor = "#f2f2f2";
    reset_btn.style.color = "#000";
    blacklist_btn.style.backgroundColor = "#091c38";
    blacklist_btn.style.color = "white";
    whitelist_btn.style.backgroundColor = "#091c38";
    whitelist_btn.style.color = "white";
  }
  else {
    reset.style.height = "0px";
    setTimeout(function () { reset.style.display = "none"; }, 300);
    reset_btn.style.backgroundColor = "#091c38";
    reset_btn.style.color = "white";
  }
}

function checkbox(num) {
  var checkbox = document.getElementById(num);
  if (checkbox.checked == true) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }
}

function showPassword() {
  const loginForm = document.getElementById("log-form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission behavior
  });

  var passwordInput = document.getElementById("password");

  if (passwordInput.type == "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}