import { Link } from "react-router-dom";

const LikedHeader = () => {
  return (
    <header className="header header-profile">
      <img
        src="src/assets/meets-logo.svg"
        alt="Meets-logo"
        className="header__logo"
      ></img>
      <div className="header__routes">
        <Link className="header__search" to="/usersearch">
          <img
            className="header__search-icon header__icon"
            src="src/assets/icons8-search.svg"
            alt="search-icon"
          />
        </Link>
        <Link to="/">
          <img
            className="header__icon"
            src="../../../public/profile-icon.svg"
            alt=""
          />
        </Link>
      </div>
    </header>
  );
};

export default LikedHeader;
