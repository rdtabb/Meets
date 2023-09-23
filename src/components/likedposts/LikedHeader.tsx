import { Link } from "react-router-dom";
import Signout from "../Signout/Signout";
import MeetsLogoIcon from '../../assets/meets-logo.svg'
import SearchIcon from '../../assets/icons8-search.svg'
import ProfileIcon from '../../../public/profile-icon.svg'

const LikedHeader = () => {
  return (
    <header className="header header-profile">
      <img
        src={MeetsLogoIcon}
        alt="Meets-logo"
        className="header__logo"
      ></img>
      <div className="header__routes">
        <Link className="header__search" to="/usersearch">
          <img
            className="header__search-icon header__icon"
            src={SearchIcon}
            alt="search-icon"
          />
        </Link>
        <Link to="/">
          <img
            className="header__icon"
            src={ProfileIcon}
            alt="ProfileIcoon"
          />
        </Link>
        <Signout />
      </div>
    </header>
  );
};

export default LikedHeader;
