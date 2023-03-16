import { useContext } from "react"
import { ChatContext } from '../../../context/ChatContext'
import { auth } from "../../../firebase-config"
import { useLocation } from "react-router-dom"
import { FieldValue, serverTimestamp } from "firebase/firestore"

interface ContextPropsType {
  setNewMessage?: any
  newMessage?: string
  handleSubmit?: any
}

type PropsType = {
  username: string
}

const SubmitMessage = ({ username }: PropsType) => {
  const { setNewMessage, newMessage, handleSubmit }: any = useContext(ChatContext)

  const image: string | null | undefined = auth.currentUser?.photoURL
  const { state } = useLocation()
  const name = state?.name
  const timestamp: FieldValue = serverTimestamp()
  const userpair: string = `${username}-${name}`
  const loweruserpair: string = userpair.toLowerCase()

  return (
    <section className="chat__form">
      <form 
        onSubmit={(e) => handleSubmit(e, username, image, newMessage, timestamp, loweruserpair)}
      >
        <input placeholder="Type your message here..." type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
      </form>
    </section>
  )
}

export default SubmitMessage
