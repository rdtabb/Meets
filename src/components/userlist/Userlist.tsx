import { Link } from "react-router-dom"

type userlistprops = {
    users: any
}

const Userlist = ({users}: userlistprops) => {
  return (
    <main className="search">
        <header className="header header--search">
            <img src="src/assets/meets-logo.svg" alt="Meets-logo" className="header__logo"></img>
            <div className="header__routes">
                <Link to="/">
                    <img
                        className="header__icon"
                        src="../../../public/profile-icon.svg"
                        alt=""
                    />
                </Link>
            </div>
        </header>
        <ul className="search__userlist">
            {users.map((user: any) => (
                <li key={user.id} className="user">
                    <div className="user__wrapper">
                        <img className="user__picture" src={user.imgurl} alt="" />
                        <article className="user__desc">
                            <p className="user__heading">{user.name}</p>
                            <p className="user__status">{user.newStatus}</p>
                        </article>
                    </div>
                    <div className="user__icons">
                        <Link to="/chat" state={{ name: user.name }}><img className="user__chat" src="src/assets/chats.svg" alt="" /></Link>
                        <Link to={`/user/${user.id}`}><img className="user__icon" src="src/assets/profile-icon.svg" alt="" /></Link>
                    </div>
                </li>
            ))}
        </ul>
    </main>
  )
}

export default Userlist
