var fileList1 = "../files/texts/text1.txt";
var fileList2 = "../files/texts/text2.txt";
var fileList3 = "../files/texts/text3.txt";

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
      var list = document.getElementById(listId);
      lines.forEach(function (line) {
        if (line.trim() !== "") {
          var li = document.createElement("li");
          li.draggable = true;
          li.addEventListener("dragstart", function (event) {
            drag(event);
          });
          li.innerText = line;
          list.appendChild(li);
          console.log("succse");
        }
      });
    }
  };
  xhr.send();
}

function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var sourceListId = document.getElementById(data).parentNode.id;
  var targetListId = event.target.id;
  var text = event.dataTransfer.getData("text/plain");

  // Update text file
  if (sourceListId !== targetListId) {
    var sourceFile = getSourceFile(sourceListId);
    var targetFile = getSourceFile(targetListId);
    var sourceList = document.getElementById(sourceListId);
    var targetList = document.getElementById(targetListId);
    var listItem = document.createElement("li");
    listItem.draggable = true;
    listItem.addEventListener("dragstart", function (event) {
      drag(event);
    });
    listItem.innerText = text;
    targetList.appendChild(listItem);
    sourceList.removeChild(document.getElementById(data));

    // Write to source file
    var sourceContent = getListContent(sourceList);
    writeTextFile(sourceFile, sourceContent);

    // Write to target file
    var targetContent = getListContent(targetList);
    writeTextFile(targetFile, targetContent);
  }
}

function allowDrop(event) {
  event.preventDefault();
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

function getListContent(list) {
  var content = "";
  var items = list.getElementsByTagName("li");
  for (var i = 0; i < items.length; i++) {
    content += items[i].innerText + "\n";
  }
  return content.trim();
}

function writeTextFile(file, content) {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Text file updated successfully.");
    }
  };
  xhr.send(content);
}