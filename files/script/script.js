var blacklist = document.getElementById("blacklist");
var whitelist = document.getElementById("meniblk");
var reset = document.getElementById("reset");
var meniji = document.getElementById("meniji");

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
  }
  else {
    whitelist.style.height = "0px";
    setTimeout(function () { whitelist.style.display = "none"; }, 300);
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
  }
  else {
    blacklist.style.height = "0px";
    setTimeout(function () { blacklist.style.display = "none"; }, 300);
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
  }
  else {
    reset.style.height = "0px";
    setTimeout(function () { reset.style.display = "none"; }, 300);
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