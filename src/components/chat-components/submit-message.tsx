import React, { useEffect, useRef, useState } from 'react'

import { FieldValue, serverTimestamp } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'

import { localStorageKeys } from '@constants/index'
import { setLocalStorageItem } from '@utils/utils'

import { auth } from '../../firebase-config'

import { useCreateMessage } from './hooks/use-create-message'

interface SubmitMessageProps {
    username?: string
}

export const SubmitMessage = ({ username }: SubmitMessageProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [message, setMessage] = useState<string>('')
    const { state } = useLocation()

    const normaluserpair: string = `${username}-${state?.name}`
    const reverseduserpair: string = `${state?.name}-${username}`

    const submitMessage = useCreateMessage()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const image: string | null | undefined = auth.currentUser?.photoURL
        const timestamp: FieldValue = serverTimestamp()

        await submitMessage({
            creator: username,
            image,
            message,
            timestamp,
            userpair: normaluserpair
        })
        setMessage('')
    }

    useEffect(() => {
        setLocalStorageItem(localStorageKeys.userpair, normaluserpair)
        setLocalStorageItem(localStorageKeys.reversed, reverseduserpair)
    }, [normaluserpair, reverseduserpair])

    return (
        <section className="chat__form">
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    className="chat__send"
                    placeholder="Type your message here..."
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </form>
        </section>
    )
}
