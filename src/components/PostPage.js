import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Page404 from "./Page404";

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    db.collection("topics")
      .doc(id)
      .get()
      .then((res) => {
        setPostInfo(res.data());
      });
    
  }, []);

  // console.log(postInfo);
  

  if (postInfo === undefined) {
    return <Page404 />;
  } else if (!postInfo) {
    return <Loading />;
  }

  return (
    <div className="post-page container">
      <div className="top-nav bg-dark2">
        <Link to={"/"} className="accent-color">
          <FontAwesomeIcon icon={faAngleLeft} size="1x" />
          Back
        </Link>
        <h3>{postInfo.title}</h3>
        <div>
          <p>Level: </p>
          <p className="accent-color">#{postInfo.level}</p>
        </div>
      </div>
      <div className="post-page-main">
        <div className="post-page-main-desc">
          <p>
            {" "}
            <span className="accent-color">
              {" "}
              Short description about this topic:{" "}
            </span>{" "}
            {postInfo.description}
          </p>
        </div>
        <div className="post-page-main-content">
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
