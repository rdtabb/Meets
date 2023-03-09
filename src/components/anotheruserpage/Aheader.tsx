import { Link } from "react-router-dom"

const Aheader = () => {
  return (
    <header className="header header-profile">
        <img src="../../../public/meets-logop.svg" alt="Meets-logo" className="header__logo"></img>
        <div className="icons-wrapper">
          <Link to="/"><img className="header-profile__link" src="../../../public/profile-icon.svg" alt="" /></Link>
          <Link to="/usersearch"><img className="header-profile__link" src="../../../public/icons8-search.svg" alt="" /></Link>
        </div>
    </header>
  )
}

export default Aheader
