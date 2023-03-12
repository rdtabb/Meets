import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
import { collection, setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

type AuthProps = {
    setIsAuth: any,
    setUsername: any,
    setUserPicture: any
    setPosts: any
    setStatus: any
}

export const Auth = ({setIsAuth, setUsername, setPosts, setStatus}: AuthProps) => {
    const cookies = new Cookies()
    const usersDataRef = collection(db, "users")
    
    const signin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            cookies.set("auth-token", response.user.refreshToken)
            const name: string | null = response.user.displayName
            const imgurl: string | null = response.user.photoURL
            const id: any = response.user.uid
            const docref: any = doc(db, "users", `${id}`)
            const docSnap: any = await getDoc(docref)

            localStorage.setItem("userpicture", `${imgurl}`)
            localStorage.setItem("uid", `${id}`)

            if (docref.exists) {
                try {
                    const dataset: any = docSnap.data()
                    const posts = dataset.newPosts
                    const status = dataset.newStatus
                    const name = dataset.name
                    const likedPosts = dataset.liked
                    setPosts(posts)
                    setStatus(status)
                    setUsername(name)
                } catch (err) {
                    console.log(err)
                } finally {
                    setIsAuth(true)
                }
            }  

            if (!docref.exists) {
                try {
                    await setDoc(docref, {
                        name: name,
                        imgurl: imgurl,
                        id,
                        newPosts: [],
                        liked: []
                    })
                } catch (err) {
                    console.log(err)
                } finally {
                    setIsAuth(true)
                }
            }  

            //used to be docsna  
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <main className="auth">
            <div className="img-container">
                <img className="auth__logo" src="src/assets/meets-logo.svg" alt="meets-logo" />
            </div>
            <h1 className="auth__header">Sign in with Google</h1>
            <button onClick={signin} className="auth__signin">
                <img className="signin-icon" src="src/assets/google-icon.svg" alt="" />
                Sign in
            </button>
        </main>
    )
}