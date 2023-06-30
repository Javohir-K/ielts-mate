import React, { useEffect, useState } from "react";
import { useStateValue } from "../AdminContext";
import { auth, db } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

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

function AdminPage() {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("topics")
      .orderBy("title", "asc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

    auth.onAuthStateChanged((authUser) => {
      // console.log("user is", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  function deleteDoc(docs) {
    db.collection("topics").doc(docs.id).delete();
    popup();
  }

  if (!user) {
    return (
      <div className="not-admin-page">
        <h2 className="accent-color"> Login as an admin </h2>
      </div>
    );
  }

  return (
    <div className="admin-page container">
      <div className="ap-nav container">
        <div className="ap-nav-inner bg-dark2">
          <h3>All posts</h3>
          <Link to={"/create-post"} className="accent-bg">
            {" "}
            <FontAwesomeIcon icon={faPlus} />
            {"Create new post"}
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <Loading />
      ) : (
        <div className="ap-post-list bg-dark2">
          {posts.map((post, index) => (
            <AdminPostCard
              _id={post.id}
              index={index++}
              title={post.data.title}
              delFunc={() => deleteDoc(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const AdminPostCard = ({ _id, title, index, delFunc }) => {
  return (
    <div className="ap-card">
      <div className="ap-card-info">
        <h4>{index + 1}.</h4>
        <p className="accent-color">#{_id}</p>
        <h4>{title}</h4>
      </div>
      <div className="ap-card-actions">
        <Link to={`/edit-post/${_id}`}>
          <FontAwesomeIcon icon={faPen} />
          <p>Edit</p>
        </Link>
        <div onClick={popup}>
          <div className="delBtn">
            <FontAwesomeIcon icon={faTrash} />
            <p>Delete</p>
          </div>
        </div>
      </div>
      <div className="dn" id="popupDel">
        <div className="popup-container">
          <div className="bg-dark">
            <h2>Do you want to delete this post?</h2>
            <p style={{ color: "yellow" }}>
              You are deleting post [#{_id}] <br />
              Warning: This post will be deleted permanently!
            </p>
            <div>
              <button className="accent-btn" onClick={delFunc}>
                Yes, delete it!
              </button>
              <button className="cancel-btn" onClick={popup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
