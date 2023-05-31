import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import type { LikedPost } from "../types/Types";

type LikedContextType = {
  handleLike: (e: any, name: string, src: string, username: string | undefined) => Promise<void>
  setLikedPosts: React.Dispatch<any>,
  likedPosts: LikedPost[],
}

const LikedContext = createContext<LikedContextType>({
  handleLike: async () => {},
  likedPosts: [],
  setLikedPosts: () => {}
});

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const DataProvider = ({ children }: ChildrenType) => {
  const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);
  const uid = localStorage.getItem("uid")!;

  const getLikedPosts = useCallback(async () => {
    try {
      const userdoc = doc(db, "users", uid);
      const dataSnap = await getDoc(userdoc);
      const dataset = dataSnap.data();
      const likedPosts = dataset?.liked;
      return likedPosts;
    } catch (err) {
      console.log(`error in LikedContext: ${err}`);
    }
  }, []);

  const handleLike = async (e: any, name: string, src: string, username: string | undefined) => {
    e.target.classList.remove('explosive')
    e.target.classList.add('explosive')
    const id = likedPosts.length
      ? likedPosts[0].id + 1
      : 1;
    const likedpost = {
      id,
      city: name,
      imgsrc: src,
      creator: username,
    };
    const newPosts = [likedpost, ...likedPosts];
    const updateLiked = {
      liked: newPosts,
    };
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, updateLiked);
  };

  return (
    <LikedContext.Provider value={{handleLike, setLikedPosts, likedPosts}}>
      {children}
    </LikedContext.Provider>
  );
};

export default LikedContext;
