import { useState, useEffect } from 'react'
import { Auth } from './components/Auth'
import Profile from './components/Profile'
import Cookies from 'universal-cookie'
import { collection, getDocs, addDoc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from './firebase-config'
const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [username, setUsername] = useState(localStorage.getItem("username") || "")
  const [userPicture, setUserPicture] = useState(localStorage.getItem("userpicture") || "")
  const [users, setUsers] = useState([])

  const usersDataRef = collection(db, "users")

  useEffect(() => {
    const getUsers = async () => {
      const data: any = await getDocs(usersDataRef)
      setUsers(data.docs.map((doc: any) => ({...doc.data()})))
    }
    getUsers()
  }, [isAuth])

  if (!isAuth) {
    return (
    <div className="app">
      <Auth
       setIsAuth={setIsAuth}
       setUsername={setUsername}
       setUserPicture={setUserPicture}
      />
    </div>
    )
  }
  
  return (
    <Profile 
      username={username}
      userPicture={userPicture}
    />
  )

  // return (
  //   <>
  //     <header>Hello, {username}</header>
  //     <img src={userPicture} alt="" />
  //   </>
  // )

  // return (
  //   <>
  //     <div>
  //       {users.map((user: any) => {
  //         return (
  //           <>
  //             <h1>{user.name}</h1>
  //             <img src={user.imgurl} alt="" />
  //           </>
  //         )
  //       })}
  //     </div>
  //   </>
  // )

}

export default App
