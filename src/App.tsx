import { useState, useEffect } from "react";
import { Auth } from "./components/Auth";
import Profile from "./components/Profile";
import Cookies from "universal-cookie";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config";
const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [users, setUsers] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostImage, setNewPostImage] = useState("")
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [userPicture, setUserPicture] = useState(
    localStorage.getItem("userpicture") || ""
  );

  const [status, setStatus] = useState(
    localStorage.getItem("status") || "Add status to profile"
  );
  
  const [posts, setPosts] = useState(
   JSON.parse(localStorage.getItem("posts")!) || []
  );

  const handleLike = async (id: number) => {
    const newPosts = posts.map((post: any) =>
      post.id == id ? { ...post, liked: !post.liked } : post
    );
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));

    const newpostsdb = {
      newPosts: newPosts
    }
    const userdoc = doc(db, "users", "xZGOnuUFGdDETxFc68uu")
    await updateDoc(userdoc, newpostsdb)
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
  close.forEach(close => {
    close.addEventListener("click", () => {
      const popups = document.querySelectorAll(".popup");
      popups.forEach(popup => {
        popup?.classList.remove("popup_opened");
        popup?.setAttribute("data-visible", "false");
      })
    });
  })

  const addButton = document.querySelector(".profile__add-button")
  addButton?.addEventListener('click', () => {
    const addPost = document.querySelector('.popup-add-post')
    const visibility = addPost?.getAttribute('data-visible')
    if (visibility == 'true') {
      addPost?.classList.remove('popup_opened')
      addPost?.setAttribute('data-visible', 'false')
    } else {
      addPost?.classList.add('popup_opened')
      addPost?.setAttribute('data-visible', 'false')
    }
  })

  const usersDataRef = collection(db, "users");

  const handleNewPost = async () => {
    if (newPostTitle == "" && newPostImage == "") {
      return
    }

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const newPost = {
      city: `${newPostTitle}`,
      id, 
      imgsrc: `${newPostImage}`,
      liked: false
    }
    const newPosts = [...posts, newPost]
    setPosts(newPosts)
    localStorage.setItem("posts", JSON.stringify(newPosts))

    const addPostPopup = document.querySelector('.popup-add-post')
    addPostPopup?.setAttribute('data-visible', 'false')
    addPostPopup?.classList.remove('popup_opened')
    setNewPostImage("")
    setNewPostTitle("")

    const newpostsdb = {
      newPosts: newPosts
    }
    const userdoc = doc(db, "users", "xZGOnuUFGdDETxFc68uu")
    await updateDoc(userdoc, newpostsdb)
  }

  const handleDelete = async (id: any) => {
    const newPosts = posts.filter((post: any) => (
      post.id != id 
    ))
    setPosts(newPosts)
    localStorage.setItem("posts", JSON.stringify(newPosts))

    const newpostsdb = {
      newPosts: newPosts
    }
    const userdoc = doc(db, "users", "xZGOnuUFGdDETxFc68uu")
    await updateDoc(userdoc, newpostsdb)
  }

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
      setNewPostTitle={setNewPostTitle}
      setNewPostImage={setNewPostImage}
      newPostImage={newPostImage}
      newPostTitle={newPostTitle}
      handleNewPost={handleNewPost}
      handleDelete={handleDelete}
    />
  );
};

export default App;
