import SubmitMessage from "./components/SubmitMessage"
import ErrorBoundary from "../error/ErrorBoundary"
import React, { Suspense, useContext } from "react"

const Messages = React.lazy(() => import("./components/Messages"))

type PropsType = {
  username: string
}

const Chat = ({username}: PropsType) => {
  return (
    <main className="chat container">
        <ErrorBoundary>
            <Suspense fallback={<p>Loading...</p>}>
                <Messages />
            </Suspense>
        </ErrorBoundary>
        <SubmitMessage username={username} />
    </main>
  )
}

export default Chat
