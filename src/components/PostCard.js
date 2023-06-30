import React from "react";
import { Link } from "react-router-dom";

function PostCard({ _id, title, description, level }) {
  return (
    <div className="post-card bg-dark2">
      <div className="post-card-cover">
        <Link to={`/topic/${_id}`}>
          <div className="cover">
            <h1>{title}</h1>
          </div>
        </Link>
      </div>
      <div className="post-card-content">
        <div>
          <h2>{title}</h2>
          <h4>{description}</h4>
        </div>
        <p className="accent-color">#{level}</p>
      </div>
    </div>
  );
}

export default PostCard;
