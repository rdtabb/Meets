import { Link } from "react-router-dom"

type userlistprops = {
    users: any
}

const Userlist = ({users}: userlistprops) => {
  return (
    <main className="search">
        <form className="search__form" onSubmit={(e) => e.preventDefault()} action="">
            <input className="search__bar" type="text" placeholder="Search for users"/>
            <Link className="search__link" to='/'>Profile</Link>
        </form>
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
                        <img className="user__chat" src="src/assets/chats.svg" alt="" />
                        <Link to={`/user/${user.id}`}><img className="user__icon" src="src/assets/profile-icon.svg" alt="" /></Link>
                    </div>
                </li>
            ))}
        </ul>
    </main>
  )
}

export default Userlist
