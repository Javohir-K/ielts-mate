import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchList from "./SearchList";
import Loading from "./Loading";
import Footer from "./Footer";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    db.collection("topics")
      .orderBy("title", "asc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    return (
      post.data.title.toLowerCase().includes(searchField.toLowerCase()) &&
      post.data.level.toLowerCase().includes(page.toLowerCase())
    );
  });

  function searchList() {
    return <SearchList filteredPosts={filteredPosts} />;
  }
  function switcher(e) {
    const x = document.querySelectorAll("#categoryBtn");
    for (let j = 0; j < x.length; j++) {
      x[j].classList.remove("active");
    }
    e.target.classList.add("active");
  }

  return (
    <div className="homepage">
      <div className="navbar bg-dark">
        <div className="navbar-wrapper container">
          <Link to={"/"}>
            <div className="logo">
              <span className="n1">ielts</span>
              <span className="n2">//mate.</span>
            </div>
          </Link>
          <div className="search bg-dark2">
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
          <h4>v1.0</h4>
        </div>
      </div>
      {posts.length === 0 ? (
        <Loading />
      ) : (
        <div className="homepage-wrapper container">
          <div className="category-changer">
            <p>Select your level:</p>
            <div className="category-list-wrapper">
              <div className="category-list">
                <button
                  onClick={(e) => {
                    setPage("");
                    switcher(e);
                  }}
                  className="active"
                  id="categoryBtn"
                >
                  All
                </button>
                <button
                  onClick={(e) => {
                    setPage("beginner");
                    switcher(e);
                  }}
                  id="categoryBtn"
                >
                  Beginner
                </button>
                <button
                  onClick={(e) => {
                    setPage("elementary");
                    switcher(e);
                  }}
                  id="categoryBtn"
                >
                  Elementary
                </button>
                <button
                  onClick={(e) => {
                    setPage("pre-intermediate");
                    switcher(e);
                  }}
                  id="categoryBtn"
                >
                  Pre-intermediate
                </button>
                <button
                  onClick={(e) => {
                    setPage("intermediate");
                    switcher(e);
                  }}
                  id="categoryBtn"
                >
                  Intermediate
                </button>
                <button
                  onClick={(e) => {
                    setPage("advanced");
                    switcher(e);
                  }}
                  id="categoryBtn"
                >
                  Advanced
                </button>
                <button
                  onClick={(e) => {
                    setPage("ielts");
                    switcher(e);
                  }}
                  id="categoryBtn"
                >
                  IELTS
                </button>
              </div>
            </div>
          </div>
          <div className="posts">
            {filteredPosts.length === 0
              ? "There are no posts for this level or title now!"
              : searchList()}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
