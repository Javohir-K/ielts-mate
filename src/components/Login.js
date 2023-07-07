import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth, db } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        setRedirect(true);
      })
      .catch((error) => alert(error.message));
  };

  //   const register = (e) => {
  //     e.preventDefault();
  //     auth
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((auth) => {
  //         if (auth) {
  //           db.collection("users").doc(auth.user.uid).set({
  //             name: email,
  //           });
  //           setRedirect(true);
  //         }
  //       })
  //       .catch((error) => alert(error.message));
  //   };

  if (redirect) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div className="login">
      <div className="login_container bg-dark2">
        <h2 className="accent-color">Login as admin</h2>
        <form action="">
          <div>
            <p>E-mail</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id="emailInput"
            />
          </div>
          <div>
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id="passInput"
            />
          </div>
          <button
            type="submit"
            onClick={signIn}
            className="accent-bg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
