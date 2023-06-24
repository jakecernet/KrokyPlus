var fileList1 = "../files/texts/text1.txt";
var fileList2 = "../files/texts/text2.txt";
var fileList3 = "../files/texts/text3.txt";

var arrays = {
  list1: [],
  list2: [],
  list3: []
};

// Load text files and store data in local storage
loadTextFile(fileList1, "list1");
loadTextFile(fileList2, "list2");
loadTextFile(fileList3, "list3");

// Load text file and store data in local storage
function loadTextFile(file, listId) {
  // Clear local storage for the corresponding listId
  localStorage.removeItem(listId);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var text = xhr.responseText;
      var lines = text.split("\n");
      arrays[listId] = lines.filter(function (line) {
        return line.trim() !== "";
      });
      // Store data in local storage
      localStorage.setItem(listId, JSON.stringify(arrays[listId]));
      renderList(listId);
    }
  };
  xhr.send();
}

// Render the list from local storage
function renderList(listId) {
  var list = document.getElementById(listId);
  if (list) {
    var array = JSON.parse(localStorage.getItem(listId)) || [];
    list.innerHTML = ""; // Clear the list
    array.forEach(function (item, index) {
      var li = document.createElement("li");
      li.draggable = true;
      li.addEventListener("dragstart", function (event) {
        drag(event);
      });
      li.innerText = item;
      li.setAttribute("data-index", index);
      list.appendChild(li);
    });
    list.addEventListener("drop", function (event) {
      drop(event, listId);
    });
    list.addEventListener("dragover", function (event) {
      allowDrop(event);
    });
  }
}

// Drag start event handler
function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

// Drop event handler
function drop(event, listId) {
  event.preventDefault();
  var sourceIndex = event.dataTransfer.getData("text/plain");
  var targetListId = listId;
  var targetIndex = event.target.dataset.index;

  // Update arrays in local storage
  if (sourceIndex !== targetIndex) {
    var sourceArray = JSON.parse(localStorage.getItem(listId)) || [];
    var targetArray = JSON.parse(localStorage.getItem(listId)) || [];
    var item = sourceArray.splice(sourceIndex, 1)[0];
    targetArray.splice(targetIndex, 0, item);

    // Update local storage
    localStorage.setItem(listId, JSON.stringify(targetArray));
    renderList(listId);

    // Remove the dragged element from its previous position
    var sourceList = document.getElementById(listId);
    var draggedElement = sourceList.querySelector(`[data-index="${sourceIndex}"]`);
    sourceList.removeChild(draggedElement);
  }
}

// Allow drop event handler
function allowDrop(event) {
  event.preventDefault();
}

// Save changes to text files
function saveChanges() {
  Object.keys(arrays).forEach(function (listId) {
    var file = getSourceFile(listId);
    var content = localStorage.getItem(listId) || "";
    writeTextFile(file, content);
  });
}

// Get the file path based on the listId
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

// Write text file
function writeTextFile(file, content) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Text file updated successfully.");
    }
  };
  xhr.send(content);
}

// Event listener for the "Save" button
document.getElementById("save-btn").addEventListener("click", function () {
  saveChanges();
});

// Render the lists from local storage
Object.keys(arrays).forEach(function (listId) {
  renderList(listId);
});
