import useGeneralContext from "../../hooks/useContextHooks/useGeneralContext";

type PropsType = {
  userPicture: string;
};

const AvatarImage = ({ userPicture }: PropsType) => {
  const { handleIconPopup } = useGeneralContext()

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

export default AvatarImage;
