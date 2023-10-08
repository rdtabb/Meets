import { Link } from "react-router-dom";
import Signout from "../Signout/Signout";
import MeetsLogoIcon from "../../assets/meets-logo.svg";
import LikeWhite from "../../assets/likew.svg";
import SearchIcon from "../../assets/icons8-search.svg";
import { memo } from "react";

const Header = () => {
  return (
    <header className="header header-profile">
      <img src={MeetsLogoIcon} alt="Meets-logo" className="header__logo"></img>
      <div className="header__routes">
        <Link className="header__search" to="/usersearch">
          <img className="header__icon" src={SearchIcon} alt="search-icon" />
        </Link>
        <Link className="header__liked" to="/likedposts">
          <img
            className="header__liked-icon header__icon"
            src={LikeWhite}
            alt="Liked posts"
          />
        </Link>
        <Signout />
      </div>
    </header>
  );
};

export default memo(Header);
