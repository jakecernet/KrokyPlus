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

    // Check if the "Don't show again" checkbox is checked
    var dontShowAgainCheckbox = document.getElementById("dont-show-checkbox");
    if (dontShowAgainCheckbox.checked) {
        setCookie("cookiePopupShown", "true", 365);
    }
}

function showCookiePopup() {
    document.getElementById("cookie-popup").style.display = "block";
}

// Check if the user has already accepted or rejected cookies
var cookieAccepted = getCookie("cookieAccepted");
if (cookieAccepted === null) {
    // Check if the cookie popup has already been shown
    var cookiePopupShown = getCookie("cookiePopupShown");
    if (cookiePopupShown === null) {
        showCookiePopup();
    }
}