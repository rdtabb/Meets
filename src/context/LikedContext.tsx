import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore";

const LikedContext = createContext({});

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const DataProvider = ({ children }: ChildrenType): ReactElement => {
  const [likedPosts, setLikedPosts] = useState<any>([]);
  const uid: any = localStorage.getItem("uid");

  const getLikedPosts = useCallback(async () => {
    try {
      const userdoc: any = doc(db, "users", uid);
      const dataSnap: any = await getDoc(userdoc);
      const dataset: any = await dataSnap.data();
      const likedPosts = dataset.liked;
      return likedPosts;
    } catch (err) {
      console.log(`error in LikedContext: ${err}`);
    }
  }, []);

  useEffect(() => {
    getLikedPosts().then(setLikedPosts);
  }, [getLikedPosts]);

  const handleLike = async (name: string, src: string, username: string) => {
    const id: string = likedPosts.length
      ? likedPosts[likedPosts.length - 1].id + 1
      : 1;
    const likedpost: object = {
      id,
      city: name,
      imgsrc: src,
      creator: username,
    };
    const newPosts = [...likedPosts, likedpost];
    const updateLiked = {
      liked: newPosts,
    };
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, updateLiked);
    getLikedPosts().then(setLikedPosts);
  };

  const handleDelete = async (id: string) => {
    const newPosts = likedPosts.filter((post: any) => 
      post.id != id
    )
    const updateLiked = {
      liked: newPosts
    }
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, updateLiked);
    getLikedPosts().then(setLikedPosts);
  }

  const explosives = document.querySelectorAll('.card__like--auser')
  explosives.forEach(explosive => {
    explosive.addEventListener('click', () => {
      explosive.classList.remove('explosive')
      explosive.classList.add('explosive')
      setTimeout(() => {
        explosive.classList.remove('explosive')
      }, 500)
    })
  })

  return (
    <LikedContext.Provider value={{handleLike, setLikedPosts, likedPosts, handleDelete}}>
      {children}
    </LikedContext.Provider>
  );
};

export default LikedContext;
