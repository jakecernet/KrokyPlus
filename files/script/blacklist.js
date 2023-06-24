// Clear localStorage
localStorage.clear();

// Read data from three text files
function readFiles() {
  const fileNames = ['../files/texts/text1.txt', '../files/texts/text2.txt', '../files/texts/text3.txt'];
  const filePromises = fileNames.map(fileName => fetch(fileName).then(response => response.text()));

  Promise.all(filePromises)
    .then(fileContents => {
      notes = [];

      fileContents.forEach(fileContent => {
        const lines = fileContent.trim().split('\n');

        lines.forEach(line => {
          const noteText = line.trim();
          if (noteText !== '') {
            const newNote = {
              text: noteText,
              done: false,
              inProgress: false
            };
            notes.push(newNote);
          }
        });
      });

      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    })
    .catch(error => {
      console.error('Error reading files:', error);
    });
}

// Create a note element
function createNoteElement(index, note) {
  const noteElement = document.createElement('div');
  noteElement.className = 'note';
  noteElement.setAttribute('draggable', 'true');
  noteElement.setAttribute('ondragstart', 'dragStart(event)');
  noteElement.setAttribute('data-index', index);
  noteElement.innerHTML = `<span>${note.text}</span>`;
  return noteElement;
}

// Display existing notes
function displayNotes() {
  const undoneNotesContainer = document.getElementById('undone-notes');
  const inProgressNotesContainer = document.getElementById('in-progress-notes');
  const doneNotesContainer = document.getElementById('done-notes');

  undoneNotesContainer.innerHTML = '';
  inProgressNotesContainer.innerHTML = '';
  doneNotesContainer.innerHTML = '';

  if (notes.length === 0) {
    undoneNotesContainer.innerHTML = '<p>No notes yet</p>';
  } else {
    // Sort the notes by "done" status
    notes.sort(function (a, b) {
      return a.done - b.done;
    });

    notes.forEach(function (note, index) {
      const noteElement = createNoteElement(index, note);

      if (note.done) {
        doneNotesContainer.appendChild(noteElement);
      } else if (note.inProgress) {
        inProgressNotesContainer.appendChild(noteElement);
      } else {
        undoneNotesContainer.appendChild(noteElement);
      }
    });
  }
}

// Drag start event handler
function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.index);
}

// Allow drop event handler
function allowDrop(event) {
  event.preventDefault();
}

// Drop event handler
function drop(event) {
  event.preventDefault();
  const index = event.dataTransfer.getData('text/plain');
  const sourceColumn = document.querySelector(`[data-index="${index}"]`).parentNode;
  const targetColumn = event.target.closest('.column');
  const targetStatus = targetColumn.id === 'column-done' ? true : false;

  if (sourceColumn !== targetColumn) {
    notes[index].done = targetStatus;
    notes[index].inProgress = targetColumn.id === 'column-in-progress' ? true : false;

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  }
}

// Call readFiles to load data from text files and display notes
readFiles();