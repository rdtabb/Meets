import { Link } from "react-router-dom";
import MeetsLogo from "../../../assets/meets-logo.svg";
import ProfileIcon from "../../../assets/profile-icon.svg";
import IconSearch from "../../../assets/icons8-search.svg";

const ChatHeader = () => {
  return (
    <header className="header header-profile">
      <img src={MeetsLogo} alt="Meets-logo" className="header__logo"></img>
      <div className="icons-wrapper">
        <Link to="/">
          <img className="header__icon" src={ProfileIcon} alt="" />
        </Link>
        <Link to="/usersearch">
          <img className="header__icon" src={IconSearch} alt="" />
        </Link>
      </div>
    </header>
  );
};

export default ChatHeader;
