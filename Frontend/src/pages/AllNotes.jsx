import React, { useState, useEffect } from "react"; // Update the path as needed
import getAllNotesApiService from "../services/apiServices/notesApis/getAllNotesApi";
import axios from "axios";
import deleteNoteByIdApiService from "../services/apiServices/notesApis/deleteNoteApiService";
import EditNote from "../views/EditNote";
import UpdateNoteByIdApiService from "../services/apiServices/notesApis/UpdateNoteByIdApi";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  // open edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(null);

  useEffect(() => {
    // Call the service to fetch the data
    getAllNotesApiService()
      .then((data) => {
        setNotes(data);
      })
  }, []);

  const handleDeleteNoteById = (noteId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      // Pass the noteId to the deleteNoteByIdApiService
      deleteNoteByIdApiService(noteId)
        .then(() => {
          const updatedNotes = notes.filter((note) => note._id !== noteId);
          // Set the new array as the state
          setNotes(updatedNotes);

        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    }
  };
  // Function to handle edit button click
  const handleEditNoteModal = (note) => {
    setEditedNote(note);
    setIsEditing(true);
  };

  const handleCancelEditModal = () => {
    setIsEditing(false);
    setEditedNote(null);
  };


  // Log updated value of isEditing when it changes
  useEffect(() => {
    // Your logic here
  }, [isEditing]);

  // update the state editing
  // function to save updated note
  const handleSaveUpdatedNote = (updatedNote) => {
    // Handle saving the updated note
    // console.log(updatedNote._id)
    // console.log("Save note:", updatedNote);
    // integrate this api
    // make axios.put request to the specified url
    // setIsEditing(false);
    // setEditedNote(null);
    // ################################
    // Handle saving the updated note
    // const url = `http://localhost:5000/api/v1/notes/${updatedNote._id}`; // Replace with your API endpoint

    // axios
    //     .put(url, updatedNote) // Send a PUT request to update the note
    //     .then((response) => {
    //         console.log("Note updated successfully");
    //         // You can handle any success behavior here, e.g., show a success message
    //         setIsEditing(false);
    //         setEditedNote(null);
    //     })
    //     .catch((error) => {
    //         console.error("Error updating note:", error);
    //         // Handle errors, e.g., show an error message
    //     });
    const response = updateNoteByIdApiService(updatedNote._id, updatedNote);
    setIsEditing(false);
    setEditedNote(null);
  };

  // update page
  const navigate = useNavigate();
  const handleUpdateNotePage = (id) => {
    navigate(`/notes/update/${id}`);
  };

  return (
    <>
      {/* conditionally rendering the edit modal */}
      {isEditing && (
        <EditNote
          note={editedNote}
          onSave={handleSaveUpdatedNote}
          onCancel={handleCancelEditModal}
        />
      )}
      <h2>All Notes</h2>
      <div className="card-deck">
        {notes.map((note) => (
          <div className="card" key={note._id}>
            <div className="card-body">
              <h3 className="card-title">{note.title}</h3>
              <p className="card-text">{note.description}</p>
              <p className="card-text">
                Date: {new Date(note.date).toLocaleString()}
              </p>
              <div className="card-text">
                <strong>Tags:</strong>
                <ul className="list-unstyled">
                  {note.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </div>
              {/* Buttons */}
              {/* update button */}
              <button
                className="btn btn-primary"
                onClick={() => handleEditNoteModal(note)} // Pass the note to handleEditNote
              >Update</button>
              {/* delete button */}
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteNoteById(note._id)}
              > Delete</button>
              {/* update page button */}
              <button
                className="btn btn-secondary"
                onClick={() => handleUpdateNotePage(note._id)}
              >
                Update in a separate page
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
