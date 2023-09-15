import { memo } from "react";
import LoadingImage from "../LoadingStates/LoadingImage";

type DescProps = {
  username: string;
  status: string;
  userPicture: string;
  loading: boolean;
};

const LikedDesc = ({ userPicture, username, status, loading }: DescProps) => {
  return (
    <section className="profile">
      <div className="profile__wrapper">
        {loading ? (
          <LoadingImage />
        ) : (
          <img
            className="profile__avatar"
            src={userPicture}
            alt="Аватар пользователя"
          ></img>
        )}
        <div className="profile__info">
          <div className="profile__info-wrapper">
            {loading ? (
                <h1 className="profile__header">Loading...</h1>
            ) : (
                <h1 className="profile__header">{username}</h1>
            )}
          </div>
          {loading ? (
            <p className="profile__description">Loading...</p>
          ) : (
            <p className="profile__description">{status}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(LikedDesc);
