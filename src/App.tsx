import { useState, useEffect } from "react";
import { Auth } from "./components/Auth";
import Profile from "./components/Profile";
import Cookies from "universal-cookie";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase-config";
const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [userPicture, setUserPicture] = useState(
    localStorage.getItem("userpicture") || ""
  );
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("Click edit button to add status")
 
  const [posts, setPosts] = useState([
    {
      imgsrc: "src/assets/lisboa.avif",
      city: "Lisboa",
      liked: false,
      id: 1,
    },
    {
      imgsrc: "src/assets/tokyo.avif",
      city: "Tokyo",
      liked: false,
      id: 2,
    },
    {
      imgsrc: "src/assets/chicago.avif",
      city: "Chicago",
      liked: false,
      id: 3,
    },
    {
      imgsrc: "src/assets/fortaleza.avif",
      city: "Fortaleza",
      liked: false,
      id: 4,
    },
    {
      imgsrc: "src/assets/istanbul.avif",
      city: "Istanbul",
      liked: false,
      id: 5,
    },
    {
      imgsrc: "src/assets/bali.avif",
      city: "Bali",
      liked: false,
      id: 6,
    },
  ]);

  const handleLike = (id: number) => {
    const newPosts = posts.map((post) =>
      post.id == id ? { ...post, liked: !post.liked } : post
    );
    setPosts(newPosts);
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

  const close = document.querySelector(".popup__close");
  close?.addEventListener("click", () => {
    const popup = document.querySelector(".popup");
    popup?.classList.remove("popup_opened");
    popup?.setAttribute("data-visible", "false");
  });

  const usersDataRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data: any = await getDocs(usersDataRef);
      setUsers(data.docs.map((doc: any) => ({ ...doc.data() })));
    };
    getUsers();
  }, [isAuth]);

  if (!isAuth) {
    return (
      <div className="app">
        <Auth
          setIsAuth={setIsAuth}
          setUsername={setUsername}
          setUserPicture={setUserPicture}
        />
      </div>
    );
  }

  return (
    <Profile
      setStatus={setStatus}
      status={status}
      handleLike={handleLike}
      username={username}
      userPicture={userPicture}
      posts={posts}
      handlePopup={handlePopup}
      setUsername={setUsername}
    />
  );
};

export default App;
