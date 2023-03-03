import Header from "./Header";
import Desc from "./Desc";
import Posts from "./Posts";
import Footer from "./Footer";
import Popup from "./Popup";

type ProfileProps = {
  username: string;
  setUsername: any;
  userPicture: string;
  posts: any;
  handleLike: any;
  handlePopup: any;
  status: string
  setStatus: any
};

const Profile = ({ username, userPicture, posts, handleLike, handlePopup, setUsername, status, setStatus }: ProfileProps) => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Desc status={status} handlePopup={handlePopup} username={username} userPicture={userPicture} />
        <Posts handleLike={handleLike} posts={posts} />
      </main>
      <Footer />
      <Popup
      status={status}
        setStatus={setStatus}
        setUsername={setUsername}
        username={username}
      />
    </div>
  );
};

export default Profile;
