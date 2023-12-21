import React from 'react'

import { ErrorBoundary, Messages, SubmitMessage } from '@components/index'
import { useUserQuery } from '@hooks/index'

export const Chat = (): JSX.Element => {
    const { username } = useUserQuery()

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
