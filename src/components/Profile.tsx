import Header from "./Header";
import Desc from "./Desc";
import Posts from "./Posts";
import Footer from "./Footer";
import Popup from "./Popup";
import AddPost from "./AddPost";

type ProfileProps = {
  username: string;
  setUsername: any;
  userPicture: string;
  posts: any;
  handleLike: any;
  handlePopup: any;
  status: string;
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
        <Posts handleLike={handleLike} posts={posts} handleDelete={handleDelete} />
      </main>
      <Footer />
      <Popup
        status={status}
        setStatus={setStatus}
        setUsername={setUsername}
        username={username}
      />
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
