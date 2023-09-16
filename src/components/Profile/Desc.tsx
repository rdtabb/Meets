import { memo } from "react";
import useUserData from "../../hooks/useQueryHooks/useUserData";
import AvatarImage from "./AvatarImage";
import LoadingImage from "../LoadingStates/LoadingImage";
import { useDispatch } from "react-redux";
import { setOpenPopupType } from "../../features/modal/modalSlice";

const Desc = () => {
  const userSet = useUserData();
  const dispatch = useDispatch();

  const handlePopup = (type: "edit" | "add") => {
    dispatch(setOpenPopupType(type));
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
              onClick={() => handlePopup("edit")}
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
        onClick={() => handlePopup("add")}
        type="button"
        className="profile__add-button"
      ></button>
    </section>
  );
};

export default memo(Desc);
