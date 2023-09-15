import React from "react";

type AvatarImageProps= {
  userPicture: string;
};

const AvatarImage = ({ userPicture }: AvatarImageProps) => {
  const handleIconPopup = () => {
    const popup = document.querySelector(".popup--icon");
    const visibility = popup?.getAttribute("data-visible");
    if (visibility == "false") {
      popup?.classList.add("popup_opened");
      popup?.setAttribute("data-visible", "true");
    } else {
      popup?.classList.remove("popup_opened");
      popup?.setAttribute("data-visible", "false");
    }
  };

  return (
    <div className="avatar-wrapper">
      <img
        aria-controls="popup--icon"
        onClick={handleIconPopup}
        src={userPicture}
        alt="Avatar"
        className="profile__avatar"
      />
      <img className="avatar-wrapper__icon" src="src/assets/editPopupIcon.svg" alt="edit profile icon" />
    </div>
  );
};

export default React.memo(AvatarImage);
