// Elementos

const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

const searchInput = document.querySelector("#search-input");

const exportBtn = document.querySelector("#export-notes");

// Funções

function showNotes() {
  cleanNotes();

  getNotes().forEach((note) => {
    const noteElement = createNote(note.id, note.content, note.fixed);

    notesContainer.appendChild(noteElement);
  })
}

function cleanNotes() {
  notesContainer.replaceChildren([]);
}

function addNote() {

  const notes = getNotes();
  
  const noteObject = {
    id: generateId(),
    content: noteInput.value,
    fixed: false,
  }

  const noteElement = createNote(noteObject.id, noteObject.content);

  notesContainer.appendChild(noteElement);

  notes.push(noteObject);

  saveNotes(notes);

  noteInput.value = "";

}

function generateId() {
  return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {

  const element = document.createElement("div");
  
  element.classList.add("note"); 

  const textarea = document.createElement("textarea");

  textarea.value = content;

  textarea.placeholder = "Adicione algum texto...";

  element.appendChild(textarea);

  const pinIcon = document.createElement("i");

  pinIcon.classList.add(...["bi", "bi-pin"]);

  element.appendChild(pinIcon);

  const deleteIcon = document.createElement("i");

  deleteIcon.classList.add(...["bi", "bi-x-lg"]);

  element.appendChild(deleteIcon);

  const duplicateIcon = document.createElement("i");

  duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);

  element.appendChild(duplicateIcon);

  if(fixed) {
    element.classList.add("fixed");
  }

  // Eventos do elemento

  element.querySelector("textarea").addEventListener("keydown", (e) => {
  
    const noteContent = e.target.value;

    updateNote(id, noteContent);

  })

  element.querySelector(".bi-pin").addEventListener("click", () => {
    toggleFixNote(id);
  });

  element.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNote(id, element);
  });

  element.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
    copyNote(id);
  })

  
  return element;
  
}

function updateNote(id, newContent) {

  const notes = getNotes();

  const targetNote = notes.filter((note) => note.id === id)[0];

  targetNote.content = newContent;

  saveNotes(notes);

}

function copyNote(id) {

  const notes = getNotes();

  const targetNote = notes.filter((note) => note.id === id)[0];

  const noteObject = {
    id: generateId(),
    content: targetNote.content,
    fixed: false
  };

  const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);

  notesContainer.appendChild(noteElement);

  notes.push(noteObject);

  saveNotes(notes);
}

function deleteNote(id, element) {

  const notes = getNotes().filter((note) => note.id !== id);

  saveNotes(notes);

  notesContainer.removeChild(element);

}

function toggleFixNote(id) {
   const notes = getNotes();
   const targetNote = notes.filter((note) => note.id === id)[0];

   targetNote.fixed = !targetNote.fixed;

   saveNotes(notes);

   showNotes();
}

// Local Storage

function getNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  const orderedNotes = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1);
  
  return orderedNotes;
}

function saveNotes(notes) {

  localStorage.setItem("notes", JSON.stringify(notes));

}

function searchNotes(search) {

  const searchResults = getNotes().filter((note) => {
    return note.content.includes(search);
  });

  if(search !== null) {
    cleanNotes();

    searchResults.forEach((note) => {
      const noteElement = createNote(note.id, note.content);
      notesContainer.appendChild(noteElement);
    });

    return;
  }

  cleanNotes();

  showNotes();

}

function exporData() {

  const notes = getNotes();

  // separa o dado por, quebra linha \n

  const csvString = [
    ["ID", "Conteúdo", "Fixado?"],
    ...notes.map((note) => [note.id, note.content, note.fixed])
  ]
    .map((e) => e.join(","))
    .join("\n");

    const element = document.createElement("a");

    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);

    element.target = "_blank";

    element.download = "notes.csv";

    element.click()

}

// Eventos

searchInput.addEventListener("keydown", (e) => {


  const search = e.target.value;

  searchNotes(search);

})

noteInput.addEventListener("keydown", (e) => {
  
  if(e.key === "Enter") {
    addNote();
  }

})

addNoteBtn.addEventListener("click", () => addNote())


exportBtn.addEventListener("click", () => {
  exporData();
})

// Inicialização

showNotes();