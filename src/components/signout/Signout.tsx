import { auth } from "../../firebase-config"
import { signOut } from "firebase/auth"
import { cookies } from "../../App"
import { useContext } from "react"
import GeneralContext from "../../context/GeneralContext"

const Signout = () => {
    const { setIsAuth } = useContext(GeneralContext)

    const signout = async () => {
        await signOut(auth)
        cookies.remove("auth-token")
        setIsAuth(false)
    }

    return (
        <button onClick={signout} className='signout'>Sign Out</button>
    )
}

export default Signout
