import { createContext, ReactElement, useState } from "react";
import { cookies } from "../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import format from "date-fns/format";
import { HandleNewPostData } from "../App";
import type { ChildrenType, Comment, Post } from "../types/Types";

export type GeneralContextType = {
  openImagePopup: (
    imgsrc: string,
    city: string,
    id: number,
    comments: Comment[],
  ) => void;
  handleClose: () => void;
  isAuth: any;
  setIsAuth: React.Dispatch<any>;
  postId: number;
  handleComment: (
    e: any,
    message: string,
    uid: any,
    setCurrMessage: React.Dispatch<React.SetStateAction<string>>,
  ) => Promise<void>;
  comments: Comment[];
  cuid: string;
  handleProfileIcon: (variables: HandleProfileIconType) => Promise<void>;
  handleNewPost: (variables: HandleNewPostData) => Promise<void>;
};

const initialState: GeneralContextType = {
  openImagePopup: () => {},
  handleClose: () => {},
  setIsAuth: () => {},
  isAuth: false,
  postId: 0,
  handleComment: async () => {},
  comments: [],
  cuid: "",
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

export const GeneralProvider = ({ children }: ChildrenType): ReactElement => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [postId, setPostId] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const cuid: string = localStorage.getItem("uid")!;

  const handleProfileIcon = async (variables: HandleProfileIconType) => {
    const userdoc = doc(db, "users", cuid);
    const updatedImage = {
      imgurl: variables.url,
    };
    await updateDoc(userdoc, updatedImage);

    const popup = document.querySelector(".popup_opened");
    popup?.setAttribute("data-visible", "false");
    setTimeout(() => {
      popup?.classList.remove("popup_opened");
    }, 200);
  };

  const handleComment = async (
    e: any,
    message: string,
    uid: any,
    setCurrMessage: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    e.preventDefault();
    const userdoc = doc(db, "users", uid);
    const dataSnap = await getDoc(userdoc);
    const dataset = dataSnap.data();
    const posts: Post[] = dataset?.newPosts;
    const creator = dataset?.name;

    const img = auth.currentUser?.photoURL!;
    const createdAt: string = `${format(new Date(), "MMMM dd, yyyy pp")}`;

    const post = posts.find((postf) => postf.id == postId)!;
    const comments: Comment[] = post?.comments;

    const id: number = comments.length
      ? comments[comments.length - 1].id + 1
      : 1;
    const newcomment: Comment = {
      creator,
      message,
      createdAt,
      id,
      img,
    };
    const newComments = [...comments, newcomment];
    setComments(newComments);
    setCurrMessage("");

    const updatedPosts = posts.map((post) =>
      post.id == postId ? { ...post, comments: newComments } : post,
    );
    const newpostsdb = {
      newPosts: updatedPosts,
    };
    await updateDoc(userdoc, newpostsdb);
  };

  const openImagePopup = (
    imgsrc: string,
    city: string,
    id: number,
    comments: Comment[],
  ) => {
    const popupImageCont = document.querySelector(".popup--image");
    popupImageCont?.setAttribute("data-visible", "true");
    popupImageCont?.classList.add("popup_opened");
    const popupImage = document.querySelector(".popup__image");
    popupImage?.setAttribute("src", `${imgsrc}`);
    popupImage?.setAttribute("alt", `${city}`);
    const caption: Element = document.querySelector(".popup__caption")!;
    caption.innerHTML = `${city}`;
    setPostId(id);
    setComments(comments);
  };

  const handleClose = () => {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
      popup?.setAttribute("data-visible", "false");
      setTimeout(() => {
        popup?.classList.remove("popup_opened");
      }, 200);
    });
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

    const addPostPopup = document.querySelector(".popup-add-post");
    addPostPopup?.setAttribute("data-visible", "false");
    addPostPopup?.classList.remove("popup_opened");
  };

  return (
    <GeneralContext.Provider
      value={{
        handleProfileIcon,
        cuid,
        handleComment,
        openImagePopup,
        handleClose,
        isAuth,
        setIsAuth,
        postId,
        comments,
        handleNewPost,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
