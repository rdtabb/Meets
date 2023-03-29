import Header from "./Header";
import Desc from "./Desc";
import Footer from "./Footer";
import Popup from "./Popup";
import AddPost from "./AddPost";
import ImagePopup from "./ImagePopup";
import Loading from "../loading/Loading";
import React, { Suspense } from "react";
import ErrorBoundary from "../error/ErrorBoundary";
import { newPostsType } from "../anotheruserpage/Auser";

const Posts = React.lazy(() => import("./Posts"))

type ProfileProps = {
  username: string;
  setUsername: any;
  userPicture: string;
  posts: Array<newPostsType>;
  handleLike: any;
  handlePopup: any;
  status: any;
  setStatus: any;
  setNewPostTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewPostImage: React.Dispatch<React.SetStateAction<string>>;
  newPostImage: any;
  newPostTitle: any;
  handleNewPost: any;
  handleDelete: any;
  setIsAuth: React.Dispatch<any>
};

const Profile = ({
  username,
  userPicture,
  posts,
  handleLike,
  handlePopup,
  status,
  setNewPostImage,
  setNewPostTitle,
  newPostImage,
  newPostTitle,
  handleNewPost,
  handleDelete,
  setIsAuth
}: ProfileProps) => {
  return (
    <div className="container">
      <ErrorBoundary>
        <Header setIsAuth={setIsAuth} />
      </ErrorBoundary>
      <main className="main">
        <Desc
          status={status}
          handlePopup={handlePopup}
          username={username}
          userPicture={userPicture}
        />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Posts handleLike={handleLike} posts={posts} handleDelete={handleDelete} />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <Popup />
      <AddPost
        setNewPostImage={setNewPostImage}
        setNewPostTitle={setNewPostTitle}
        newPostTitle={newPostTitle}
        newPostImage={newPostImage}
        handleNewPost={handleNewPost}
      />
      <ImagePopup />
    </div>
  );
};

export default Profile;
