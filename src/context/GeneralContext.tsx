import { createContext, useState } from "react";
import { cookies } from "../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { HandleNewPostData } from "../App";
import { ChildrenType } from "../types/Types";

export type GeneralContextType = {
  isAuth: any;
  setIsAuth: React.Dispatch<any>;
  handleProfileIcon: (variables: HandleProfileIconType) => Promise<void>;
  handleNewPost: (variables: HandleNewPostData) => Promise<void>;
};

const initialState: GeneralContextType = {
  setIsAuth: () => {},
  isAuth: false,
  handleProfileIcon: async () => {},
  handleNewPost: async () => {},
};

export type UserLikedType = {
  city: string;
  creator: string;
  id: number;
  imgsrc: string;
};

const GeneralContext = createContext<GeneralContextType>(initialState);

type HandleProfileIconType = {
  url: string;
};

export const GeneralProvider = ({ children }: ChildrenType) => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const handleProfileIcon = async (variables: HandleProfileIconType) => {
    const uid = localStorage.getItem("uid")!;
    const userdoc = doc(db, "users", uid);
    const updatedImage = {
      imgurl: variables.url,
    };
    await updateDoc(userdoc, updatedImage);
  };

  const handleNewPost = async (variables: HandleNewPostData) => {
    const uid = localStorage.getItem("uid")!;
    const usedoc = doc(db, "users", uid);
    const dataSnap = await getDoc(usedoc);
    const dataset = dataSnap.data();
    const nposts = await dataset?.newPosts;

    const id = nposts.length ? nposts[0].id + 1 : 1;
    const newPost = {
      city: variables.place,
      id,
      imgsrc: variables.url,
      liked: false,
      comments: [],
    };
    const newPosts = [newPost, ...nposts];

    const newpostsdb = {
      newPosts: newPosts,
    };
    const userdoc = doc(db, "users", uid);
    await updateDoc(userdoc, newpostsdb);
  };

  return (
    <GeneralContext.Provider
      value={{
        handleProfileIcon,
        isAuth,
        setIsAuth,
        handleNewPost,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
