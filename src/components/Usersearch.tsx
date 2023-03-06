import { Link } from "react-router-dom"

type searchprops ={
    users: any
}

const Usersearch = ({users}: searchprops) => {
  return (
    <>
        <form action="">
            <input type="text" placeholder="Search for users"/>
        </form>
        <ul>
        {users.map((user: any) => (
            <li>
                <p>{user.name}</p>
                <img src={user.imgurl} alt="" />
                <p>{user.newStatus}</p>
            </li>
        ))}
        </ul>
        <Link to='/'>To profile</Link>
    </>
    
  )
}

export default Usersearch
