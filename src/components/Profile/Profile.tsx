import Header from "./Header";
import Desc from "./Desc";
import Footer from "./Footer";
import Popup from "./Popup";
import AddPost from "./AddPost";
import ImagePopup from "./ImagePopup";
import IconPopup from "./IconPopup";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Posts from "./Posts";

type ProfileProps = {
  username: string;
  userPicture: string;
  status: string;
};

const Profile = ({
  username,
  userPicture,
  status,
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
      <AddPost />
      <ImagePopup />
      <IconPopup />
    </div>
  );
};

export default Profile;
