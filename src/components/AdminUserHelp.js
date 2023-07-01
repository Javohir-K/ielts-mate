import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function AdminUserHelp() {
  const [userComments, setUserComments] = useState([]);
  const [clr, setClr] = useState([]);

  useEffect(() => {
    db.collection("help")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setUserComments(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    db.collection("help")
      .where("new", "==", false)
      .onSnapshot((snapshot) => {
        setClr(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });
  }, []);

  function readHelp(doc) {
    db.collection("help").doc(doc.id).update({
      new: false,
    });
  }

  function clearNotifications() {
    clr.map((item) => {
      db.collection("help").doc(item.id).delete();
    });
  }

  return (
    <div className="au-help container">
      <div className="au-wrapper">
        <h2 className="accent-color">Notifications</h2>
        <div className="au-notifications">
          {userComments.map((item, index) => (
            <div className="au-card bg-dark2">
              <div>
                <h4 className={!item.data.new ? "" : "accent-color"}>
                  {index + 1}. {item.data.owner} {!item.data.new ? "" : "[New]"}
                </h4>
                <div>
                  <p>{item.data.timestamp}</p>
                  {!item.data.new ? (
                    ""
                  ) : (
                    <button
                      onClick={() => readHelp(item)}
                      style={{
                        background: "transparent",
                        border: "2px  solid var(--accent)",
                        borderRadius: ".3rem",
                        outline: "none",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="accent-color"
                      />
                    </button>
                  )}
                </div>
              </div>
              <p>{item.data.comment}</p>
            </div>
          ))}
        </div>
        <div>
          {clr.length !== 0 ? (
            <button
              style={{
                marginTop: "1rem",
                padding: ".5rem 1rem",
                border: "none",
                outline: "none",
                fontSize: "1rem",
              }}
              className="bg-dark2"
              onClick={clearNotifications}
            >
              Clear notifications
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUserHelp;
