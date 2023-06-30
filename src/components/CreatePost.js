import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { db } from "../firebase";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("");
  const [redirect, setRedirect] = useState(false);

  
  function createNewPost(e) {
    e.preventDefault();
    if (title === "" || description === "" || level === "" || content === "") {
      alert("All fields must be filled!");
    } else {
      db.collection("topics").add({
        title: title,
        description: description,
        content: content,
        level: level,
      });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="create-post container">
      <h3>Create new post for users</h3>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="bg-dark2"
          name=""
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          id=""
        >
          <option value="Select level">Select level</option>
          <option value="beginner">Beginner</option>
          <option value="elementary">Elementary</option>
          <option value="pre-intermediate">Pre-intermediate</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="ielts">Ielts</option>
        </select>
        <ReactQuill
          className="form-quill"
          value={content}
          onChange={(newVal) => setContent(newVal)}
          modules={modules}
          formats={formats}
        />
        <button type="submit" className="accent-btn create-btn">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
