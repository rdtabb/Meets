import { Link } from "react-router-dom"
import Signout from "../signout/Signout"


const Header = () => {

  return (
    <header className="header header-profile">
        <img src="src/assets/meets-logo.svg" alt="Meets-logo" className="header__logo"></img>
        <div className="header__routes">
          <Link className="header__search" to='/usersearch'>
            <img className="header__icon" src="src/assets/icons8-search.svg" alt="search-icon" />
          </Link>
          <Link className="header__liked" to='/likedposts'>
            <img className="header__liked-icon header__icon" src="src/assets/likew.svg" alt="" />
          </Link>
          <Signout/>
        </div>
    </header>
  ) 
}

export default Header
