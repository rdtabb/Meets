import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

type AuthProps = {
    setIsAuth: any,
    setUsername: any,
    setUserPicture: any
}

export const Auth = ({setIsAuth, setUsername, setUserPicture}: AuthProps) => {
    const cookies = new Cookies()
    const usersDataRef = collection(db, "users")

    const signin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            cookies.set("auth-token", response.user.refreshToken)
            const name: string | null = response.user.displayName
            const imgurl: string | null = response.user.photoURL


            localStorage.setItem("userpicture", `${imgurl}`)
            localStorage.setItem("username", `${name}`)

            await addDoc(usersDataRef, {
                name: name,
                imgurl: imgurl,
                posts: [],
                status: ""
            })

            setIsAuth(true)
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <main className="auth">
            <div className="img-container">
                <img className="auth__logo" src="../../public/meets-logo.svg" alt="meets-logo" />
            </div>
            <h1 className="auth__header">Sign in with Google</h1>
            <button onClick={signin} className="auth__signin">
                <img className="signin-icon" src="../../public/google-icon.svg" alt="" />
                Sign in
            </button>
        </main>
    )
}