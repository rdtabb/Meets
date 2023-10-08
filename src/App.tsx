import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import useGeneralContext from "./hooks/useContextHooks/useGeneralContext";
import Cookies from "universal-cookie";
import { Auth } from "./components/Auth";
import Profile from "./components/Profile/Profile";
import Usersearch from "./components/Userlist/Usersearch";
import Auser from "./components/AnotherUser/Auser";
import LikedPosts from "./components/LikedPosts/LikedPosts";
import Chat from "./components/Chat/Chat";

export const cookies = new Cookies();

const App = () => {
  const { isAuth } = useGeneralContext();

  if (!isAuth) {
    return (
      <ErrorBoundary>
        <Auth />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/usersearch" element={<Usersearch />} />
        <Route path="/user/:id" element={<Auser />} />
        <Route path="/likedposts" element={<LikedPosts />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
