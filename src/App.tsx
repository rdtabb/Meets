import { useState, useCallback } from "react";
import { Auth } from "./components/Auth";
import Profile from "./components/Profile/Profile";
import Usersearch from "./components/Userlist/Usersearch";
import Auser from "./components/AnotherUser/Auser";
import LikedPosts from "./components/LikedPosts/LikedPosts";
import Chat from "./components/Chat/Chat";
import Cookies from "universal-cookie";
import {
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase-config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import useGeneralContext from "./hooks/useGeneralContext";

export const cookies = new Cookies();

export type HandleNewPostData = {
  url: string,
  place: string
}

const App = () => {
  const [username, setUsername] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [status, setStatus] = useState("Add status to profile");

  const { isAuth } = useGeneralContext()

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
  }, [username, status])

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

  if (!isAuth) {
    return (
      <ErrorBoundary>
        <Auth
          setStatus={setStatus}
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
                status={status}
                username={username}
                userPicture={userPicture}
              />
            }
          />
          <Route path="/usersearch" element={<Usersearch />} />
          <Route path="/user/:id" element={<Auser/>} />
          <Route path="/likedposts" element={<LikedPosts 
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
