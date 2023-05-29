import useGeneralContext from "../../hooks/useContext/useGeneralContext";
import useUserData from "../../hooks/useQuery/useUserData";
import AvatarImage from "./AvatarImage";
import LoadingImage from "../LoadingStates/LoadingImage";

const Desc = () => {
  const { handleAddPostButton, handlePopup } = useGeneralContext();
  const userSet = useUserData();

  if (userSet.isLoading) {
    console.log("loading");
  } else {
    console.log(userSet.data);
  }

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

export default Desc;
