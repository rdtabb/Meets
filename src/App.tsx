import { useState, useEffect } from 'react'
import { Auth } from './components/Auth'
import Cookies from 'universal-cookie'
import { getAdditionalUserInfo } from "firebase/auth"
const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [username, setUsername] = useState("")
  const [userPicture, setUserPicture] = useState("")


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
    <>
      <header>Hello, {username}</header>
      <img src={userPicture} alt="" />
    </>
  )

}

export default App
