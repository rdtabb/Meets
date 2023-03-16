import { useContext, useEffect } from "react"
import { ChatContext } from '../../../context/ChatContext'
import { auth } from "../../../firebase-config"
import { useLocation } from "react-router-dom"
import { FieldValue, serverTimestamp } from "firebase/firestore"

type PropsType = {
  username: string
}

const SubmitMessage = ({ username }: PropsType) => {
  const { setNewMessage, newMessage, handleSubmit, setReversed, setUserpair, reversed, userpair }: any = useContext(ChatContext)

  const image: string | null | undefined = auth.currentUser?.photoURL
  const { state } = useLocation()
  const name = state?.name
  const timestamp: FieldValue = serverTimestamp()

  const normaluserpair: string = `${username}-${name}`
  const reverseduserpair: string = `${name}-${username}`

  // useEffect(() => {
  //   console.log(`This is const NORMALUSERPAIT before setting state: ${normaluserpair}`)
  //   console.log(`This is const REVERSEDUSERPAIR before setting state: ${reverseduserpair}`)
  //   setReversed(reverseduserpair)
  //   setUserpair(normaluserpair)
  //   console.log(`This is USERPAIR state itself: ${userpair}`)
  //   console.log(`This is REVERSED state itself: ${reversed}`)
  // }, [])

  return (
    <section className="chat__form">
      <form 
        onSubmit={(e) => handleSubmit(e, username, image, newMessage, timestamp, normaluserpair)}
      >
        <input placeholder="Type your message here..." type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
      </form>
    </section>
  )
}

export default SubmitMessage
