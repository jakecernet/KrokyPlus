var whitelist = document.getElementById("whitelist");
var blacklist = document.getElementById("blacklist");
var reset = document.getElementById("reset");
   
whitelist.style.display = "none";
blacklist.style.display = "none";
reset.style.display = "none";

function showWhitelist(){
    if (whitelist.style.display === "none") {
        whitelist.style.display = "block";
    } else {
        whitelist.style.display = "none";
    }
    if (blacklist.style.display === "block" || reset.style.display === "block"){
        blacklist.style.display = "none";
        reset.style.display = "none";
    }
}

function showBlacklist(){
    if (blacklist.style.display === "none") {
        blacklist.style.display = "block";
    } else {
        blacklist.style.display = "none";
    }
    if (reset.style.display === "block" || whitelist.style.display === "block"){
        reset.style.display = "none";
        whitelist.style.display = "none";
    }
}

function resetList(){
    if (reset.style.display === "none") {
        reset.style.display = "block";
    } else {
        reset.style.display = "none";
    }
    if (blacklist.style.display === "block" || whitelist.style.display === "block"){
        blacklist.style.display = "none";
        whitelist.style.display = "none";
    }
}