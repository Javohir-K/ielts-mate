import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
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

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    db.collection("topics")
      .doc(id)
      .get()
      .then((res) => {
        setTitle(res.data().title);
        setDescription(res.data().description);
        setLevel(res.data().level);
        setContent(res.data().content);
      });
  }, []);

  function deleteDoc(e) {
    e.preventDefault();
    db.collection("topics").doc(id).delete();
    setRedirect(true);
  }

  function popup() {
    var x = document.getElementById("popupDel");
    if (x.classList.contains("popup")) {
      x.classList.remove("popup");
      x.classList.add("dn");
    } else {
      x.classList.add("popup");
      x.classList.remove("dn");
    }
  }

  function updatePost(e) {
    e.preventDefault();
    if (title === "" || description === "" || level === "" || content === "") {
      alert("All fields must be filled!");
    } else {
      db.collection("topics").doc(id).update({
        title: title,
        description: description,
        content: content,
        level: level,
      });
      setRedirect(true);
    }
  }

  // console.log(title);

  if (redirect) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div className="create-post container">
      <h3>Edit post</h3>
      <form onSubmit={updatePost}>
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
          Update Post
        </button>
      </form>
      <button
        className="red-bg"
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          border: "none",
          borderRadius: ".5rem",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
        onClick={popup}
      >
        Delete
      </button>
      <div className="dn" id="popupDel">
        <div className="popup-container">
          <div className="bg-dark">
            <h2>Do you want to delete this post?</h2>
            <p style={{ color: "yellow" }}>
              Warning: This post will be deleted permanently!
            </p>
            <div>
              <button className="accent-btn" onClick={deleteDoc}>Yes, delete it!</button>
              <button className="cancel-btn" onClick={popup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
