import React, { useState, useEffect } from "react";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTittle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(false);
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const addNote = event => {
    event.preventDefault();

    const addNotes = {
      id: notes.id,
      title: title,
      content: content,
    };
    setNotes([addNotes, ...notes]);
    console.log(notes);
    setContent("");
    setTittle("");
  };

  const editMode = id => {
    const noteToEdit = notes.find(n => n.id === id);
    setTittle(noteToEdit.title);
    setContent(noteToEdit.content);
    console.log(title, content);
    setEditingNote(true);
  };
  //Save edited note
  const handleUpdateNote = e => {
    e.preventDefault();

    const updatedNotes = notes.map(notes =>
      notes.id === editingNote.id ? { ...notes, title, content } : notes
    );

    setNotes(updatedNotes);
    setEditingNote(null);
    setTittle("");
    setContent("");
    console.log(updatedNotes);
  };
  const cancelNote = () => {
    setTittle("");
    setContent("");
    setEditingNote(null);
  };
  const deleteNote = (event, id) => {
    event.stopPropagation();
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
    console.log(filteredNotes);
  };
  return (
    <section>
      <div className="container">
        <form
          className="note-form"
          onSubmit={event =>
            editingNote ? handleUpdateNote(event) : addNote(event)
          }
        >
          <input
            placeholder="title"
            required
            value={title}
            onChange={event => setTittle(event.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={event => setContent(event.target.value)}
            rows={10}
          ></textarea>
          {editingNote ? (
            <div className="edit-btn">
              <button>Save</button>
              <button onClick={cancelNote} className="cancel">
                cancel
              </button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
        <div className="note-container">
          {notes.map((note, id) => (
            <div className="note-item" onClick={() => editMode(notes.id)}>
              <div className="note-header">
                <button onClick={event => deleteNote(event, notes.id)}>
                  X
                </button>
              </div>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Note;
