import SubmitMessage from "./components/SubmitMessage"
import ChatHeader from "./components/ChatHeader"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import { ChatContext } from "../../context/ChatContext"
import React, { Suspense, useRef, useEffect, useContext } from "react"
import LoadingMessages from "../LoadingStates/LoadingMessages"
const Messages = React.lazy(() => import("./components/Messages"))


type PropsType = {
  username: string
}

const Chat = ({username}: PropsType) => {
  const { messages } = useContext(ChatContext)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  return (
    <div className="container">
      <ChatHeader />
      <main className="chat">
          <ErrorBoundary>
              <Suspense fallback={<LoadingMessages />}>
                  <Messages />
              </Suspense>
          </ErrorBoundary>
          <div ref={scrollRef} className="dummyscroll"></div>
      </main>
      <SubmitMessage username={username} />
    </div>
    
  )
}

export default Chat
