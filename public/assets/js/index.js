const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-group");

// ACTIVE NOTE functions 
  // Keeping track of the note in the textarea
    let activeNote = {};
  // Rendering: setting the activeNote and displaying it (after it's clicked in sidebar list)
    const handleNoteView = (clicked) => {
      let activeTitle = clicked.getAttribute("title");
      let activeText = clicked.getAttribute("text");
      let activeId = clicked.getAttribute("id");
      activeNote = {title: activeTitle, text: activeText, id: activeId};
      renderActiveNote();
    };
  // Rendering: emptying activeNote, allowing input of new note
    const handleNewNoteView = function () {
      activeNote = {};
      renderActiveNote();
    };
  // Rendering: displaying activeNote or, if no activeNote, empty inputs
    const renderActiveNote = () => {
      $saveNoteBtn.hide();
      if (activeNote.id) {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
      } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
      }
    };


// GETTING (G) and RENDERING (R) functions
  // G: db --> all notes + R: note list --> sidebar
    const getAndRenderNotes = () => {
      return getNotes().then(renderNoteList);
    };
  // G: db --> all notes
    const getNotes = () => {
      return $.ajax({url: "/api/notes", method: "GET"});
    };
  // R: note list (titles only) --> sidebar
    const renderNoteList = (notes) => {
      // Emptying the sidebar of previously loaded note list
        $noteList.empty();
      // Setting up the new note list as an empty array
        const noteListItems = [];
      // Returns jquery <li> object with text and delete button (unless withDeleteButton is set to false)
        const create$li = (title, text, id, withDeleteButton = true) => {
          const $li = $("<li class='list-group-item'>");
          $li.attr("title", title);
          $li.attr("text", text);
          $li.attr("id", id);
          const $span = $("<span>").text(title);
          $li.append($span);

          if (withDeleteButton) {
            const $delBtn = $(
              "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
            );
            $li.append($delBtn);
          }
          return $li;
        };
      // If no notes saved, returns the appropriate message
        if (notes.length === 0) {
          noteListItems.push(create$li("No saved Notes", false));
        } 
      // If there are saved notes, filling the note list array with note titles (<li> objects)
        for (i = 0; i < notes.length; i++) {
          let $li = create$li(notes[i].title, notes[i].text, notes[i].id, true);
          console.log($li);
          noteListItems.push($li);
        } 
      // The objects are appended to the sidebar <ul> list
        $noteList.append(noteListItems);
    };
  // R: save button (hide if either title or text inputs are empty, show otherwise)
    const handleRenderSaveBtn = function () {
      if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
      } else {
        $saveNoteBtn.show();
      }
    };
  

// SAVING functions
  // Saving: --> db
    const saveNote = (note) => {
      return $.ajax({url: "/api/notes", data: note, method: "POST"});
    };
  // Getting: data from inputs; Saving: --> db; Updating: note list and active note view
    const handleNoteSave = function () {
      const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val(),
        id: Date.now()
      };
      saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
      });
    };

// DELETING functions
  // A function for deleting a note from the db
    const deleteNote = (id) => {
      return $.ajax({url: "api/notes/" + id, method: "DELETE"});
    };
  // Delete the clicked note
    const handleNoteDelete = event => {
      // Preventing: note list listener (see below) from being called when deleteBtn clicked
      event.stopPropagation();
      const note = $(this).parent(".list-group-item").data();
      // Emptying: activeNote (if corresponds to note being deleted)
      if (activeNote.id === note.id) {
        activeNote = {};
      }
      // Deleting: clicked note; Updating: note list and active note view 
      deleteNote(note.id).then(() => {
        getAndRenderNotes();
        renderActiveNote();
      });
    };

// LISTENERS
  // Rendering listeners
    $noteTitle.on("keyup", handleRenderSaveBtn);
    $noteText.on("keyup", handleRenderSaveBtn);
    $noteList.on("click", ".list-group-item", function(e) {
      const clicked = e.target;
      handleNoteView(clicked);
    });
    $newNoteBtn.on("click", handleNewNoteView);
  // Saving listener
    $saveNoteBtn.on("click", handleNoteSave);
  // Deleting listener
    $noteList.on("click", ".delete-note", handleNoteDelete);

// Gets and renders the initial list of notes
getAndRenderNotes();
