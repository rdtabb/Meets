import { Link } from "react-router-dom"

const ChatHeader = () => {
  return (
    <header className="header header-profile">
      <img
        src="../../../public/meets-logop.svg"
        alt="Meets-logo"
        className="header__logo"
      ></img>
      <div className="icons-wrapper">
        <Link to="/">
          <img
            className="header__icon"
            src="../../../public/profile-icon.svg"
            alt=""
          />
        </Link>
        <Link to="/usersearch">
          <img
            className="header__icon"
            src="../../../public/icons8-search.svg"
            alt=""
          />
        </Link>
      </div>
    </header>
  )
}

export default ChatHeader
