import { Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import useGeneralContext from "./hooks/useContextHooks/useGeneralContext";
import Cookies from "universal-cookie";
import { Auth } from "./components/Auth";
import Profile from "./components/Profile/Profile";
import Usersearch from "./components/Userlist/Usersearch";
import Auser from "./components/AnotherUser/Auser";
import LikedPosts from "./components/LikedPosts/LikedPosts";
import Chat from "./components/Chat/Chat";
import ImagePopup from "./components/Profile/ImagePopup";

export const cookies = new Cookies();

export type HandleNewPostData = {
  url: string;
  place: string;
};

const App = () => {
  const { isAuth } = useGeneralContext();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  if (!isAuth) {
    return (
      <ErrorBoundary>
        <Auth />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Profile />} />
        <Route path="/usersearch" element={<Usersearch />} />
        <Route path="/user/:id" element={<Auser />} />
        <Route path="/likedposts" element={<LikedPosts />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/image/:id" element={<ImagePopup />} />
        </Routes>
      )}
    </ErrorBoundary>
  );
};

export default App;
