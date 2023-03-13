import Userlist from "./Userlist";

type searchprops ={
    users: any
}

const Usersearch = ({users}: searchprops) => {
  return (
    <Userlist users={users}/>
  )
}

export default Usersearch
