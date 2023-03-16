import SubmitMessage from "./components/SubmitMessage"
import ChatHeader from "./components/ChatHeader"
import ErrorBoundary from "../error/ErrorBoundary"
import React, { Suspense } from "react"

const Messages = React.lazy(() => import("./components/Messages"))

type PropsType = {
  username: string
}

const Chat = ({username}: PropsType) => {
  return (
    <div className="container">
      <ChatHeader />
      <main className="chat">
          <ErrorBoundary>
              <Suspense fallback={<p>Loading...</p>}>
                  <Messages />
              </Suspense>
          </ErrorBoundary>
          <SubmitMessage username={username} />
      </main>
    </div>
    
  )
}

export default Chat
