import { auth } from "../../firebase-config"
import { signOut } from "firebase/auth"
import { cookies } from "../../App"

type PropsType = {
    setIsAuth: React.Dispatch<any>
}

const Signout = ({ setIsAuth }: PropsType) => {
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
