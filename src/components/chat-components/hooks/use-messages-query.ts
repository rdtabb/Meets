import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@constants/queryKeys'
import { fetchChatMessages } from '@methods/index'

export const useMessagesQuery = () => {
    const [userpair] = useState<string>(localStorage.getItem('userpair') || '')
    const [reversed] = useState<string>(localStorage.getItem('reversed') || '')

    const messagesQuery = useQuery({
        queryKey: [QueryKeys.MESSAGES],
        queryFn: () => fetchChatMessages({ userpair, reversed })
    })

    return {
        messages: messagesQuery.data,
        isLoading: messagesQuery.isLoading
    }
}
