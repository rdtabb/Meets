import { useState, useEffect, useCallback } from "react";
import { Auth } from "./components/Auth";
import Profile from "./components/Profile/Profile";
import Usersearch from "./components/userlist/Usersearch";
import Auser from "./components/anotheruserpage/Auser";
import LikedPosts from "./components/likedposts/LikedPosts";
import Chat from "./components/chat/Chat";
import Cookies from "universal-cookie";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase-config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/error/ErrorBoundary";
import { newPostsType } from "./components/anotheruserpage/Auser";

export const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [users, setUsers] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [username, setUsername] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [status, setStatus] = useState("Add status to profile");
  const [posts, setPosts] = useState<Array<newPostsType>>([]);

  const getPosts = useCallback(async () => {
    try {
      const userdoc = doc(db, "users", uid);
      const dataSnap = getDoc(userdoc);
      const dataset: any = (await dataSnap).data();
      const posts: any = await dataset.newPosts;
      return posts.reverse()
    } catch (err) {
      console.log(err);
    }
  }, [isAuth])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [getPosts]);

  const getSetNameStatus = useCallback(async () => {
    try {
      const userdoc: any = doc(db, "users", uid);
      const dataSnap = getDoc(userdoc);
      const dataset: any = (await dataSnap).data();
      const status = await dataset.newStatus;
      const name = await dataset.name;
      setUsername(name);
      localStorage.setItem("username", name)
      setStatus(status);
    } catch (err) {
      console.error(err);
    }
  }, [username, status, posts])

  const getUserPicture = useCallback(async () => {
    try {
      const userdoc: any = doc(db, "users", uid);
      const dataSnap = getDoc(userdoc);
      const dataset: any = (await dataSnap).data();
      const picture = await dataset.imgurl
      setUserPicture(picture)
    } catch (err) {
      console.error(err)
    }
  }, [isAuth])

  const uid = localStorage.getItem("uid")!;

  onSnapshot(doc(db, "users", `${uid}`), () => {
    getSetNameStatus()
    getUserPicture()
  })

  const handleLike = async (id: number) => {
    const newPosts: Array<newPostsType> = posts.map((post) =>
      post.id == id ? { ...post, liked: !post.liked } : post
    );
    const newpostsdb = {
      newPosts: newPosts.reverse(),
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

  const usersDataRef = collection(db, "users");

  const handleNewPost = async () => {
    if (newPostTitle == "" && newPostImage == "") {
      return;
    }

    const usedoc = doc(db, "users", uid);
    const dataSnap = getDoc(usedoc);
    const dataset: any = (await dataSnap).data();
    const nposts = await dataset.newPosts;

    const id = nposts.length ? nposts[nposts.length - 1].id + 1 : 1;
    const newPost = {
      city: `${newPostTitle}`,
      id,
      imgsrc: `${newPostImage}`,
      liked: false,
    };
    const newPosts: Array<newPostsType> = [...posts, newPost];

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

  const handleDelete = async (id: number) => {
    const newPosts = posts.filter((post) => post.id != id);
    const newpostsdb = {
      newPosts: newPosts.reverse(),
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
        <Auth
          setPosts={setPosts}
          setStatus={setStatus}
          setIsAuth={setIsAuth}
          setUsername={setUsername}
          setUserPicture={setUserPicture}
        />
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
                setIsAuth={setIsAuth}
              />
            }
          />
          <Route path="/usersearch" element={<Usersearch users={users} />} />
          <Route path="/user/:id" element={<Auser/>} />
          <Route path="/likedposts" element={<LikedPosts 
            setIsAuth={setIsAuth}
            userPicture={userPicture}
            username={username}
            status={status}
          />}/>
          <Route path="/chat" element={<Chat username={username} />}/>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
