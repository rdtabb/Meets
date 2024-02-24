import React from 'react'

import { ErrorBoundary, Messages, SubmitMessage } from '@components/index'
import { useCurrentUser } from '@hooks/index'

export const Chat = (): JSX.Element => {
    const { username } = useCurrentUser()

    return (
        <>
            <main className="chat">
                <ErrorBoundary>
                    <Messages />
                </ErrorBoundary>
            </main>
            <SubmitMessage username={username} />
        </>
    )
}
