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
      blacklist.style.height = "9050px";
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

function save() {
  var whitelist = document.getElementById("meniblk");
  var blacklist = document.getElementById("blacklist");
  var reset = document.getElementById("reset");
  var whitelistArray = [];
  var blacklistArray = [];
  var resetArray = [];
  var whitelistChecked = whitelist.getElementsByTagName("input");
  var blacklistChecked = blacklist.getElementsByTagName("input");
  var resetChecked = reset.getElementsByTagName("input");
  for (var i = 0; i < whitelistChecked.length; i++) {
    if (whitelistChecked[i].checked) {
      whitelistArray.push(whitelistChecked[i].value);
    }
  }
  for (var i = 0; i < blacklistChecked.length; i++) {
    if (blacklistChecked[i].checked) {
      blacklistArray.push(blacklistChecked[i].value);
    }
  }
  for (var i = 0; i < resetChecked.length; i++) {
    if (resetChecked[i].checked) {
      resetArray.push(resetChecked[i].value);
    }
  }
  chrome.storage.sync.set({ "whitelist": whitelistArray }, function () {
    console.log("whitelist saved");
  });
  chrome.storage.sync.set({ "blacklist": blacklistArray }, function () {
    console.log("blacklist saved");
  });
  chrome.storage.sync.set({ "reset": resetArray }, function () {
    console.log("reset saved");
  });
  window.close();
}