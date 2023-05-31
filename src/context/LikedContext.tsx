import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import type { LikedPost, DeleteLikedMutation } from "../types/Types";

type LikedContextType = {
  handleLike: (e: {
    target: HTMLButtonElement;
  }, name: string, src: string, username: string) => Promise<void>
  setLikedPosts: React.Dispatch<any>,
  likedPosts: LikedPost[],
}

const LikedContext = createContext<LikedContextType>({
  handleLike: async () => {},
  likedPosts: [],
  setLikedPosts: () => {}
});

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const DataProvider = ({ children }: ChildrenType): ReactElement => {
  const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);
  const uid = localStorage.getItem("uid")!;

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

  const handleLike = async (e: {target: HTMLButtonElement}, name: string, src: string, username: string) => {
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
    getLikedPosts().then(setLikedPosts);
  };

  return (
    <LikedContext.Provider value={{handleLike, setLikedPosts, likedPosts}}>
      {children}
    </LikedContext.Provider>
  );
};

export default LikedContext;
