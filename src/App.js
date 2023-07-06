import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import HomePage from "./components/HomePage";
import PostPage from "./components/PostPage";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import { useStateValue } from "./AdminContext";
import Page404 from "./components/Page404";
import { useEffect } from "react";
import { auth } from "./firebase";
import Scroll from "./components/Scroll";
import Help from "./components/Help";
import AdminUserHelp from "./components/AdminUserHelp";
import ScrollToTop from "./components/ScrollTop";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
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

  return (
    <div className="App">
      <ScrollToTop/>
      <Routes>
        <Route element={<AdminPage />} path="/admin" />
        <Route
          element={!user ? <Page404 /> : <CreatePost />}
          path="/create-post"
        />
        <Route
          element={!user ? <Page404 /> : <EditPost />}
          path="/edit-post/:id"
        />
        <Route
          element={!user ? <Page404 /> : <AdminUserHelp />}
          path="/admin/user-help"
        />
        <Route element={<Help />} path="/help" />
        <Route element={<Login />} path="/login" />
        <Route element={<HomePage />} path="/" />
        <Route element={<PostPage />} path="/topic/:id" />
        <Route element={<Page404 />} path="*" />
      </Routes>
      <Scroll />
    </div>
  );
}

export default App;
