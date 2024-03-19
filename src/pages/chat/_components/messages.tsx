import React from 'react'

import { useMessagesQuery } from '../_hooks/use-messages-query'

import { MessagesList } from './messages-list'
import { MessagesLoading } from './messages-loading'

export const Messages = (): JSX.Element => {
    const { messages, isLoading } = useMessagesQuery()

    return (
        <ul className="chat__meslist">
            {isLoading ? <MessagesLoading /> : <MessagesList messages={messages} />}
        </ul>
    )
}
