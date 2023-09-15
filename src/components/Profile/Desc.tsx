import React from "react";
import useUserData from "../../hooks/useQueryHooks/useUserData";
import AvatarImage from "./AvatarImage";
import LoadingImage from "../LoadingStates/LoadingImage";

const Desc = () => {
  const userSet = useUserData();

  const handleAddPostButton = () => {
    const addPost = document.querySelector(".popup-add-post");
    addPost?.classList.add("popup_opened");
    addPost?.setAttribute("data-visible", "true");
  };

  const handlePopup = () => {
    const popup = document.querySelector(".popup");
    const visibility = popup?.getAttribute("data-visible");
    if (visibility == "false") {
      popup?.classList.add("popup_opened");
      popup?.setAttribute("data-visible", "true");
    } else {
      popup?.classList.remove("popup_opened");
      popup?.setAttribute("data-visible", "false");
    }
  };

  if (userSet.isError) console.log(userSet.error);

  return (
    <section className="profile">
      <div className="profile__wrapper">
        {userSet.isLoading ? (
          <LoadingImage />
        ) : (
          <AvatarImage userPicture={userSet.data?.imgurl} />
        )}
        <div className="profile__info">
          <div className="profile__info-wrapper">
            {userSet.isLoading ? (
              <h1 className="profile__header">Loading...</h1>
            ) : (
              <h1 className="profile__header">{userSet.data?.name}</h1>
            )}
            <button
              onClick={handlePopup}
              type="button"
              className="profile__edit-button"
            ></button>
          </div>
          {userSet.isLoading ? (
            <h1 className="profile__description">Loading...</h1>
          ) : (
            <p className="profile__description">{userSet.data?.newStatus}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleAddPostButton}
        type="button"
        className="profile__add-button"
      ></button>
    </section>
  );
};

export default React.memo(Desc);
