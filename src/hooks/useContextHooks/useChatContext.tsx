import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"

const useChatContext = () => {
  return useContext(ChatContext)
}

export default useChatContext
