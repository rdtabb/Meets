import React from 'react'

import { ErrorBoundary } from '@components/index'
import { useCurrentUser } from '@hooks/index'

import { Messages } from './_components/messages'
import { SubmitMessage } from './_components/submit-message'

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
