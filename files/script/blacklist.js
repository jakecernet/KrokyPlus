var fileList1 = "../files/texts/text1.txt";
var fileList2 = "../files/texts/text2.txt";
var fileList3 = "../files/texts/text3.txt";

var arrays = {
  list1: [],
  list2: [],
  list3: []
};

loadTextFile(fileList1, "list1");
loadTextFile(fileList2, "list2");
loadTextFile(fileList3, "list3");

function loadTextFile(file, listId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var text = xhr.responseText;
      var lines = text.split("\n");
      arrays[listId] = lines.filter(function (line) {
        return line.trim() !== "";
      });
      renderList(listId);
    }
  };
  xhr.send();
}

function renderList(listId) {
  var list = document.getElementById(listId);
  if (list) {
    var array = arrays[listId];
    list.innerHTML = ""; // Clear the list
    array.forEach(function (item) {
      var li = document.createElement("li");
      li.draggable = true;
      li.addEventListener("dragstart", function (event) {
        drag(event);
      });
      li.innerText = item;
      list.appendChild(li);
    });
    list.addEventListener("drop", function (event) {
      drop(event);
    });
    list.addEventListener("dragover", function (event) {
      allowDrop(event);
    });
  }
}

function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var sourceListId = document.getElementById(data)?.parentNode?.id;
  var targetListId = event.currentTarget?.id;
  var text = event.dataTransfer.getData("text/plain");

  // Update arrays
  if (sourceListId && targetListId && sourceListId !== targetListId) {
    var sourceArray = arrays[sourceListId];
    var targetArray = arrays[targetListId];
    var index = sourceArray.indexOf(text);
    if (index !== -1) {
      sourceArray.splice(index, 1);
      targetArray.push(text);
    }
    renderList(sourceListId);
    renderList(targetListId);
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function saveChanges() {
  Object.keys(arrays).forEach(function (listId) {
    var file = getSourceFile(listId);
    var content = arrays[listId].join("\n");
    writeTextFile(file, content);
  });
}

function getSourceFile(listId) {
  var file;
  switch (listId) {
    case "list1":
      file = fileList1;
      break;
    case "list2":
      file = fileList2;
      break;
    case "list3":
      file = fileList3;
      break;
    default:
      file = "";
      break;
  }
  return file;
}

function writeTextFile(file, content) {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", file, true);
  xhr.setRequestHeader("Content-type", "text/plain");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Text file updated successfully.");
    }
  };
  xhr.send(content);
}