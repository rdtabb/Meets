import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@constants/index'
import { fetchChatMessages } from '@methods/methods'

import { MessagesList } from './messages-list'
import { MessagesLoading } from './messages-loading'

export const Messages = (): JSX.Element => {
    const [userpair] = useState<string>(localStorage.getItem('userpair') || '')
    const [reversed] = useState<string>(localStorage.getItem('reversed') || '')

    const messagesQuery = useQuery({
        queryKey: [QueryKeys.MESSAGES],
        queryFn: () => fetchChatMessages({ userpair, reversed })
    })

    return (
        <ul className="chat__meslist">
            {messagesQuery.isLoading ? (
                <MessagesLoading />
            ) : (
                <MessagesList messages={messagesQuery.data} />
            )}
        </ul>
    )
}
