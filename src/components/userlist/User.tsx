import { memo } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/profile-icon.svg";
import ChatIcon from "../../assets/chats.svg";

type UserProps = {
  user: any;
};

const User = ({ user }: UserProps) => {
  return (
    <li key={user.id} className="user">
      <div className="user__wrapper">
        <img className="user__picture" src={user.imgurl} alt="" />
        <article className="user__desc">
          <p className="user__heading">{user.name}</p>
          <p className="user__status">{user.newStatus}</p>
        </article>
      </div>
      <div className="user__icons">
        <Link to="/chat" state={{ name: user.name }}>
          <img
            className="user__chat"
            src={ChatIcon}
            alt={`Chat with ${user.name}`}
          />
        </Link>
        <Link to={`/user/${user.id}`}>
          <img className="user__icon" src={ProfileIcon} alt={`${user.name} `} />
        </Link>
      </div>
    </li>
  );
};

export default memo(User);
