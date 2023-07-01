import React, { useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function Help() {
  const [owner, setOwner] = useState("");
  const [comment, setComment] = useState("");

  function createComment(e) {
    e.preventDefault();
    if (owner.length === 0 || comment.length === 0) {
      alert("All fields must be filled");
    } else {
      alert("Thank you for your feedback! We will contact you later!");
      db.collection("help").add({
        owner: owner,
        comment: comment,
        new: true,
        timestamp:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
      });
      setComment("");
      setOwner("");
    }
  }

  return (
    <div className="comments container">
      <div className="comments-wrapper container">
        <div className="cw-top">
          <Link to={"/"}>
            <FontAwesomeIcon icon={faAngleLeft} /> <h4>Back</h4>
          </Link>
          <p>Developer: Javohir Komiljonov</p>
        </div>
        <h2 className="accent-color">
          Write your email and problem you are facing in our website. We will
          help you as soon as possible
        </h2>
        <div className="add-comment">
          <h2>Add comment</h2>
          <form action="" onSubmit={createComment}>
            <input
              type="email"
              name=""
              id=""
              placeholder="Write your email"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <textarea
              placeholder="Write your comment here..."
              name=""
              id=""
              cols="40"
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="accent-bg">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Help;
