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
import SignoutConfirm from "../Signout/SignoutConfirm";

import { useMemo, memo } from "react";
import { useSelector } from "react-redux";
import { selectOpenPopupType } from "../../features/modal/modalSlice";

const Profile = () => {
  const memoizedOpenPopupType = useMemo(selectOpenPopupType, []);

  const openPopupType = useSelector(memoizedOpenPopupType);

  return (
    <Container>
      <Header />
      <main className="main">
        <Desc />
        <ErrorBoundary>
          <Posts />
        </ErrorBoundary>
      </main>
      <Footer />
      <>{openPopupType === "edit" && <Popup />}</>
      <>{openPopupType === "add" && <AddPost />}</>
      <>{openPopupType === "image" && <ImagePopup />}</>
      <>{openPopupType === "icon" && <IconPopup />}</>
      <>{openPopupType === "confirm" && <SignoutConfirm />}</>
    </Container>
  );
};

export default memo(Profile);
