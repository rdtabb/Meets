import Header from "./Header";
import Desc from "./Desc";
import Footer from "./Footer";
import Popup from "./Popup";
import AddPost from "./AddPost";
import React, { Suspense } from "react";
import ErrorBoundary from "../error/ErrorBoundary";

const Posts = React.lazy(() => import("./Posts"))

type ProfileProps = {
  username: string;
  setUsername: any;
  userPicture: string;
  posts: any;
  handleLike: any;
  handlePopup: any;
  status: any;
  setStatus: any;
  setNewPostTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewPostImage: React.Dispatch<React.SetStateAction<string>>;
  newPostImage: any;
  newPostTitle: any;
  handleNewPost: any;
  handleDelete: any
};

const Profile = ({
  username,
  userPicture,
  posts,
  handleLike,
  handlePopup,
  setUsername,
  status,
  setStatus,
  setNewPostImage,
  setNewPostTitle,
  newPostImage,
  newPostTitle,
  handleNewPost,
  handleDelete
}: ProfileProps) => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Desc
          status={status}
          handlePopup={handlePopup}
          username={username}
          userPicture={userPicture}
        />
        <ErrorBoundary>
          <Suspense fallback={<p>Loading...</p>}>
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
    </div>
  );
};

export default Profile;
