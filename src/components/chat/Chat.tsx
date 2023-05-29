import SubmitMessage from "./components/SubmitMessage"
import ChatHeader from "./components/ChatHeader"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import { ChatContext } from "../../context/ChatContext"
import React, { Suspense, useRef, useEffect, useContext } from "react"
import LoadingMessages from "../LoadingStates/LoadingMessages"
import Container from "../Container/Container"
import useUserData from "../../hooks/useQuery/useUserData"
const Messages = React.lazy(() => import("./components/Messages"))

const Chat = () => {
  const { messages } = useContext(ChatContext)
  const scrollRef = useRef<HTMLDivElement>(null)
  const userSet = useUserData()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  return (
    <Container>
      <ChatHeader />
      <main className="chat">
          <ErrorBoundary>
              <Suspense fallback={<LoadingMessages />}>
                  <Messages />
              </Suspense>
          </ErrorBoundary>
          <div ref={scrollRef} className="dummyscroll"></div>
      </main>
      <SubmitMessage username={userSet.data?.name} />
    </Container>
    
  )
}

export default Chat
