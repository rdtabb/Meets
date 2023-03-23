import { useContext, useEffect } from "react"
import { ChatContext } from '../../../context/ChatContext'
import { auth } from "../../../firebase-config"
import { useLocation } from "react-router-dom"
import { FieldValue, serverTimestamp } from "firebase/firestore"

type PropsType = {
  username: string
}

const SubmitMessage = ({ username }: PropsType) => {
  const { setNewMessage, newMessage, handleSubmit }: any = useContext(ChatContext)

  const image: string | null | undefined = auth.currentUser?.photoURL
  const { state } = useLocation()
  const name = state?.name
  const timestamp: FieldValue = serverTimestamp()

  const normaluserpair: string = `${username}-${name}`
  const reverseduserpair: string = `${name}-${username}`

  useEffect(() => {
    localStorage.setItem("userpair", normaluserpair)
    localStorage.setItem("reversed", reverseduserpair)
  })

  return (
    <section className="chat__form">
      <form 
        onSubmit={(e) => handleSubmit(e, username, image, newMessage, timestamp, normaluserpair)}
      >
        <input placeholder="Type your message here..." type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
        <img src="src/assets/sendm.svg" alt="" className="form__img" />
      </form>
    </section>
  )
}

export default SubmitMessage
