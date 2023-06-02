var blacklist = document.getElementById("blacklist");
var whitelist = document.getElementById("meniblk");
var reset = document.getElementById("reset");

whitelist.style.display = "none";
blacklist.style.display = "none";
reset.style.display = "none";

function showWhitelist() {
    if (whitelist.style.display === "none") {
        whitelist.style.display = "block";
    } else {
        whitelist.style.display = "none";
    }
    if (blacklist.style.display === "block" || reset.style.display === "block") {
        blacklist.style.display = "none";
        reset.style.display = "none";
    }
}

function showBlacklist() {
    if (blacklist.style.display === "none") {
        blacklist.style.display = "block";
    } else {
        blacklist.style.display = "none";
    }
    if (reset.style.display === "block" || whitelist.style.display === "block") {
        reset.style.display = "none";
        whitelist.style.display = "none";
    }
}

function resetList() {
    if (reset.style.display === "none") {
        reset.style.display = "block";
    } else {
        reset.style.display = "none";
    }
    if (blacklist.style.display === "block" || whitelist.style.display === "block") {
        blacklist.style.display = "none";
        whitelist.style.display = "none";
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

function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    function acceptCookies() {
      setCookie("cookieAccepted", "true", 365);
      hideCookiePopup();
    }

    function rejectCookies() {
      setCookie("cookieAccepted", "false", 365);
      hideCookiePopup();
    }

    function hideCookiePopup() {
      document.getElementById("cookie-popup").style.display = "none";
    }

    function showCookiePopup() {
      document.getElementById("cookie-popup").style.display = "block";
    }

    // Check if the user has already accepted or rejected cookies
    var cookieAccepted = getCookie("cookieAccepted");
    if (cookieAccepted === null) {
      showCookiePopup();
    }