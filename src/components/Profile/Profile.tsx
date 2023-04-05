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

const Posts = React.lazy(() => import("./Posts"))

type ProfileProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userPicture: string;
  posts: Array<newPostsType>;
  handleLike: (id: number) => Promise<void>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setNewPostTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewPostImage: React.Dispatch<React.SetStateAction<string>>;
  newPostImage: string;
  newPostTitle: string;
  handleNewPost: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
};

const Profile = ({
  username,
  userPicture,
  posts,
  handleLike,
  status,
  setNewPostImage,
  setNewPostTitle,
  newPostImage,
  newPostTitle,
  handleNewPost,
  handleDelete,
}: ProfileProps) => {
  return (
    <div className="container">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main className="main">
        <Desc
          status={status}
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
      <IconPopup />
    </div>
  );
};

export default Profile;
