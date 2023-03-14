import SubmitMessage from "./components/SubmitMessage"
import ErrorBoundary from "../error/ErrorBoundary"
import React, { Suspense, useContext } from "react"

const Messages = React.lazy(() => import("./components/Messages"))

const Chat = () => {
  return (
    <main className="chat">
        <ErrorBoundary>
            <Suspense fallback={<p>Loading...</p>}>
                <Messages />
            </Suspense>
        </ErrorBoundary>
        <SubmitMessage />
    </main>
  )
}

export default Chat
