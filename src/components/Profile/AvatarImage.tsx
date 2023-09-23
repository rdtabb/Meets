import { memo } from "react";
import { useDispatch } from "react-redux";
import { setOpenPopupType } from "../../features/modal/modalSlice";
import EditPopupIcon from '../../assets/editPopupIcon.svg'

type AvatarImageProps = {
  userPicture: string;
};

const AvatarImage = ({ userPicture }: AvatarImageProps) => {
  const dispatch = useDispatch();

  return (
    <div className="avatar-wrapper">
      <img
        aria-controls="popup--icon"
        onClick={() => dispatch(setOpenPopupType("icon"))}
        src={userPicture}
        alt="Avatar"
        className="profile__avatar"
      />
      <img
        className="avatar-wrapper__icon"
        src={EditPopupIcon}
        alt="edit profile icon"
      />
    </div>
  );
};

export default memo(AvatarImage);
