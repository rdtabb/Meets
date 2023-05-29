import Header from "./Header";
import Desc from "./Desc";
import Footer from "./Footer";
import Popup from "./Popup";
import AddPost from "./AddPost";
import ImagePopup from "./ImagePopup";
import IconPopup from "./IconPopup";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Posts from "./Posts";
import Container from "../Container/Container";

const Profile = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main className="main">
        <Desc />
        <ErrorBoundary>
          <Posts />
        </ErrorBoundary>
      </main>
      <Footer />
      <Popup />
      <AddPost />
      <ImagePopup />
      <IconPopup />
    </Container>
  );
};

export default Profile;
