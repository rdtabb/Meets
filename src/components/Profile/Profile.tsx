import Header from "./Header";
import Desc from "./Desc";
import Footer from "./Footer";
import Popup from "./Popup";
import AddPost from "./AddPost";
import ImagePopup from "./ImagePopup";
import IconPopup from "./IconPopup";
import Loading from "../loading/Loading";
import React, { Suspense } from "react";
import ErrorBoundary from "../error/ErrorBoundary";
import { newPostsType } from "../../context/GeneralContext";
import type { HandleNewPostData } from "../../App";
import Posts from "./Posts";

type ProfileProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userPicture: string;
  posts: Array<newPostsType>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  handleNewPost: (variables: HandleNewPostData) => Promise<void>;
};

const Profile = ({
  username,
  userPicture,
  posts,
  status,
  handleNewPost,
}: ProfileProps) => {
  return (
    <div className="container">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main className="main">
        <Desc status={status} username={username} userPicture={userPicture} />
        <ErrorBoundary>
          <Posts />
        </ErrorBoundary>
      </main>
      <Footer />
      <Popup />
      <AddPost handleNewPost={handleNewPost} />
      <ImagePopup />
      <IconPopup />
    </div>
  );
};

export default Profile;
