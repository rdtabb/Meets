import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="header header-profile">
        <img src="src/assets/meets-logo.svg" alt="Meets-logo" className="header__logo"></img>
        <Link className="header__search" to='/usersearch'>
          <img className="header__search-icon" src="src/assets/icons8-search.svg" alt="search-icon" />
          Search
        </Link>
    </header>
  )
}

export default Header
