import React, { useEffect, useState } from "react";
import { useStateValue } from "../AdminContext";
import { auth, db } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

function AdminPage() {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [searchField, setSearchField] = useState("");

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

  const filteredPosts = posts.filter((post) => {
    return post.data.title.toLowerCase().includes(searchField.toLowerCase());
  });

  function searchList() {
    return <SearchList filteredPosts={filteredPosts} />;
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
          <div className="search bg-dark2" style={{ border: "1px solid #333" }}>
            <div className="search-wrapper">
              <form action="">
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setSearchField(e.target.value)}
                  className="light-color"
                  placeholder="Search post"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="1x"
                  color="gray"
                />
              </form>
            </div>
          </div>
          <Link to={"/create-post"} className="accent-bg">
            <FontAwesomeIcon icon={faPlus} />
            <span>Create new post</span>
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <Loading />
      ) : (
        <div className="ap-post-list bg-dark2">{searchList()}</div>
      )}
    </div>
  );
}
function SearchList({ filteredPosts }) {
  const posts = filteredPosts.map((post, index) => (
    <AdminPostCard
      _id={post.id}
      index={index++}
      title={post.data.title}
      level={post.data.level}
    />
  ));
  return posts;
}

const AdminPostCard = ({ _id, title, index, level }) => {
  return (
    <div className="ap-card">
      <div className="ap-card-info">
        <h4>{index + 1}.</h4>
        <p className="accent-color">#{_id}</p>
        <h4>{title}</h4>
      </div>
      <div className="ap-card-actions">
        <p className="accent-color">#{level}</p>
        <Link to={`/edit-post/${_id}`}>
          <FontAwesomeIcon icon={faPen} />
          <p>Edit</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
