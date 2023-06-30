import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="page-404">
      <div>
        <Link style={{ textDecoration: "underline" }} to={"/"}>
          {" "}
          <FontAwesomeIcon icon={faAngleLeft} /> Go back to homepage
        </Link>
        <h1>Oops... The page not found!</h1>
        <h2 className="accent-color">Code: 404</h2>
      </div>
    </div>
  );
}

export default Page404;
