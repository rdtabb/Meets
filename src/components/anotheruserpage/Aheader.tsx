import { Link } from "react-router-dom"

const Aheader = () => {
  return (
    <header className="header header-profile">
        <img src="src/assets/meets-logo.svg" alt="Meets-logo" className="header__logo"></img>
        <Link to="/">To profile</Link>
    </header>
  )
}

export default Aheader
