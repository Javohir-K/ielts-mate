import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container footer">
      <div className="footer-wrapper">
        <div className="logo">
          <span className="n1">ielts</span>
          <span className="n2">//mate.</span>
          <h3>#2023</h3>
        </div>
        <Link to={"/help"} style={{textDecoration:"underline"}} >Need Help?</Link>
      </div>
    </div>
  );
}

export default Footer;
