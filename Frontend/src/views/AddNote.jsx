import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../constants/secretes/baseUrl"
import addNoteApiService from "../services/apiServices/notesApis/addNoteApi";



const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: [],
    newTag: ""
  });
  // title change
  const handleTitleChange = (e) => {
    setNote({ ...note, title: e.target.value })
  };
  // description change
  const handleDescriptionChange = (e) => {
    setNote({ ...note, description: e.target.value })
  }
  // new tag change
  const handleTagChange = (e) => {
    setNote({ ...note, newTag: e.target.value });
  };
  // tags array 
  const handleAddTag = () => {
    if (note.newTag) {
      setNote({
        ...note,
        tags: [...note.tags, note.newTag],
        newTag: ""
      });
    }
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const addFormData = {
      title: note.title,
      description: note.description,
      tags: note.tags,
    }
    try {
      // Send a POST request to the specified URL
      // base url = http://192.168.100.9:8000/api/v1
      // let notesEndpoint = "/notes";
      // const response = await axios.post(`${BASE_URL}${notesEndpoint}`, addFormData);
      // Handle the response here (e.g., display a success message)
      // console.log("Note added successfully!");
      // console.log("Server response:", response.data);
      // setNote({
      //     title: "",
      //     description: "",
      //     tags: [],
      //     newTag: ""
      // });

      // week 5 updation - node crud topic
      const response = await addNoteApiService(addFormData);
      setNote({
        title: "",
        description: "",
        tags: [],
        newTag: ""
      });

    } catch (error) {
      // Handle any errors that occur during the request
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="container py-4 px-4 my-4 bg-dark text-white">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center text-warning">Add Note</h4>
          {/* title */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              name="title"
              value={note.title}
              onChange={handleTitleChange}
              required
            />
          </div>
          {/* description */}
          <div className="mb-3">
            <textarea
              className="form-control"
              id="description"
              rows={3}
              placeholder="Description"
              name="description"
              value={note.description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          {/* tags */}
          <div className="mb-3 input-group">
            <input
              type="text"
              className="form-control"
              id="tags"
              placeholder="Tags"
              name="tags"
              value={note.newTag}
              onChange={handleTagChange}
            />
            <button className="btn btn-outline-primary" type="button" onClick={handleAddTag}>
              Add Tag
            </button>
          </div>
          {/* Display added tags */}
          <div>
            Tags:
            <ul>
              {note.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
          {/* submit button */}
          <div className="mb-3 text-center">
            <button className="btn btn-primary form-control" type="submit" >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNote;
