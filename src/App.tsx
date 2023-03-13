import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { Auth } from "./components/Auth";
import Profile from "./components/Profile/Profile";
import Usersearch from "./components/userlist/Usersearch";
import Auser from "./components/anotheruserpage/Auser";
import LikedPosts from "./components/likedposts/LikedPosts";
import Cookies from "universal-cookie";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/error/ErrorBoundary";
const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [users, setUsers] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [username, setUsername] = useState("");
  const [userPicture, setUserPicture] = useState(localStorage.getItem("userpicture") || "");
  const [status, setStatus] = useState("Add status to profile");
  const [posts, setPosts] = useState<any>([]);

  const getPosts = useCallback(async () => {
    try {
      const userdoc: any = doc(db, "users", uid);
      const dataSnap = getDoc(userdoc);
      const dataset: any = (await dataSnap).data();
      const posts: any = await dataset.newPosts;
      return posts
    } catch (err) {
      console.error(err);
    }
  }, [])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [getPosts]);

  useEffect(() => {
    const getSetNameStatus = async () => {
      try {
        const userdoc: any = doc(db, "users", uid);
        const dataSnap = getDoc(userdoc);
        const dataset: any = (await dataSnap).data();
        const status = await dataset.newStatus;
        const name = await dataset.name;
        setUsername(name);
        setStatus(status);
      } catch (err) {
        console.error(err);
      }
    };
    getSetNameStatus();
  }, [username, status]);

  const uid: any = localStorage.getItem("uid");

  const handleLike = async (id: number) => {
    const newPosts: any = posts.map((post: any) =>
      post.id == id ? { ...post, liked: !post.liked } : post
    );
    const newpostsdb = {
      newPosts: newPosts,
    };
    const userdoc = doc(db, "users", `${uid}`);
    await updateDoc(userdoc, newpostsdb);
    getPosts().then(setPosts)
  };

  const handlePopup = () => {
    const popup = document.querySelector(".popup");
    const visibility = popup?.getAttribute("data-visible");
    if (visibility == "false") {
      popup?.classList.add("popup_opened");
      popup?.setAttribute("data-visible", "true");
    } else {
      popup?.classList.remove("popup_opened");
      popup?.setAttribute("data-visible", "false");
    }
  };

  const close = document.querySelectorAll(".popup__close");
  close.forEach((close) => {
    close.addEventListener("click", () => {
      const popups = document.querySelectorAll(".popup");
      popups.forEach((popup) => {
        popup?.classList.remove("popup_opened");
        popup?.setAttribute("data-visible", "false");
      });
    });
  });

  const addButton = document.querySelector(".profile__add-button");
  addButton?.addEventListener("click", () => {
    const addPost = document.querySelector(".popup-add-post");
    const visibility = addPost?.getAttribute("data-visible");
    if (visibility == "true") {
      addPost?.classList.remove("popup_opened");
      addPost?.setAttribute("data-visible", "false");
    } else {
      addPost?.classList.add("popup_opened");
      addPost?.setAttribute("data-visible", "false");
    }
  });

  const usersDataRef = collection(db, "users");

  const handleNewPost = async () => {
    if (newPostTitle == "" && newPostImage == "") {
      return;
    }

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
      city: `${newPostTitle}`,
      id,
      imgsrc: `${newPostImage}`,
      liked: false,
    };
    const newPosts: any = [...posts, newPost];

    const addPostPopup = document.querySelector(".popup-add-post");
    addPostPopup?.setAttribute("data-visible", "false");
    addPostPopup?.classList.remove("popup_opened");
    setNewPostImage("");
    setNewPostTitle("");

    const newpostsdb = {
      newPosts: newPosts,
    };
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, newpostsdb);
    getPosts().then(setPosts)
  };

  const handleDelete = async (id: any) => {
    const newPosts = posts.filter((post: any) => post.id != id);
    const newpostsdb = {
      newPosts: newPosts,
    };
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, newpostsdb);
    getPosts().then(setPosts)
  };

  useEffect(() => {
    const getUsers = async () => {
      const data: any = await getDocs(usersDataRef);
      setUsers(data.docs.map((doc: any) => ({ ...doc.data() })));
    };
    getUsers();
  }, [isAuth]);

  if (!isAuth) {
    return (
      <ErrorBoundary>
        <div className="app">
          <Auth
            setPosts={setPosts}
            setStatus={setStatus}
            setIsAuth={setIsAuth}
            setUsername={setUsername}
            setUserPicture={setUserPicture}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Profile
                setStatus={setStatus}
                status={status}
                handleLike={handleLike}
                username={username}
                userPicture={userPicture}
                posts={posts}
                handlePopup={handlePopup}
                setUsername={setUsername}
                setNewPostTitle={setNewPostTitle}
                setNewPostImage={setNewPostImage}
                newPostImage={newPostImage}
                newPostTitle={newPostTitle}
                handleNewPost={handleNewPost}
                handleDelete={handleDelete}
              />
            }
          />
          <Route path="/usersearch" element={<Usersearch users={users} />} />
          <Route path="/user/:id" element={<Auser users={users} />} />
          <Route path="/likedposts" element={<LikedPosts />}/>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
