function popup() {
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = `
    <div id="popupContainer">
        <h1>New Note</h1>
        <input type="text" id="note-heading" placeholder="Note Heading" maxlength="50">
        <textarea id='note-text' placeholder="Enter your note..." maxlength="500"></textarea>
        <div id="color-picker">
            <label>Note Color:</label>
            <input type="color" id="note-color" value="#fff385">
        </div>
        <div id="btn-container">
            <button id="sumbitBtn" onclick="createNote()">Create Note</button>
            <button id="closeBtn" onclick="closePopup()">Close</button>
        </div>
    </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {
    const popupContainer = document.getElementById('popupContainer');
    const noteHeading = document.getElementById('note-heading').value.trim();
    const noteText = document.getElementById('note-text').value.trim();
    const noteColor = document.getElementById('note-color').value;
    
    if (noteHeading !== '' && noteText !== '') {
        const note = {
            id: new Date().getTime(),
            heading: noteHeading,
            text: noteText,
            color: noteColor
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        popupContainer.remove();
        displayNotes();
    } else {
        alert('Please enter both a heading and note content.');
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.style.backgroundColor = note.color || '#fff385';
        listItem.innerHTML = `
        <h3>${note.heading}</h3>
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id === noteId);
    
    const editingPopup = document.createElement("div");
    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
        <h1>Edit Note</h1>
        <input type="text" id="note-heading" value="${noteToEdit.heading}" maxlength="50">
        <textarea id="note-text" maxlength="500">${noteToEdit.text}</textarea>
        <div id="color-picker">
            <label>Note Color:</label>
            <input type="color" id="note-color" value="${noteToEdit.color || '#fff385'}">
        </div>
        <div id="btn-container">
            <button id="sumbitBtn" onclick="updateNote()">Done</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
    </div>
    `;
    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById('editing-container');
    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteHeading = document.getElementById('note-heading').value.trim();
    const noteText = document.getElementById('note-text').value.trim();
    const noteColor = document.getElementById('note-color').value;
    const editingPopup = document.getElementById('editing-container');

    if (noteHeading !== '' && noteText !== '') {
        const noteId = parseInt(editingPopup.getAttribute('data-note-id'));
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return { 
                    id: note.id, 
                    heading: noteHeading,
                    text: noteText,
                    color: noteColor
                };
            }
            return note;
        });

        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        editingPopup.remove();
        displayNotes();
    } else {
        alert('Note heading and content cannot be empty.');
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();