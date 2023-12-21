import React, { useEffect, useRef, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { FieldValue, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'

import {
    type IHandleSubmitMessageParams,
    QueryKeys,
    Collections,
    localStorageKeys
} from '@constants/index'

import { auth, db } from '../../firebase-config'
import { setLocalStorageItem } from '../../utils/utils'

type SubmitMessageProps = {
    username?: string
}

export const SubmitMessage = ({ username }: SubmitMessageProps) => {
    const [newMessage, setNewMessage] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const queryClient = useQueryClient()
    const { state } = useLocation()

    const image: string | null | undefined = auth.currentUser?.photoURL
    const name = state?.name
    const timestamp: FieldValue = serverTimestamp()

    const normaluserpair: string = `${username}-${name}`
    const reverseduserpair: string = `${name}-${username}`

    useEffect(() => {
        setLocalStorageItem(localStorageKeys.userpair, normaluserpair)
        setLocalStorageItem(localStorageKeys.reversed, reverseduserpair)
    }, [normaluserpair, reverseduserpair])

    const handleSubmit = async ({
        e,
        creator,
        image,
        message,
        timestamp,
        userpair
    }: IHandleSubmitMessageParams) => {
        e.preventDefault()
        try {
            const docref = collection(db, Collections.MESSAGES)
            const displayDate: string = `${format(new Date(), 'MMMM dd, yyyy pp')}`
            await addDoc(docref, {
                creator,
                image,
                message,
                timestamp,
                userpair,
                displayDate,
                id: ''
            })
            setNewMessage('')
        } catch (err) {
            console.log(`Error in ChatContext in handleSubmit: ${err}`)
        }
    }

    const submitMutation = useMutation({
        mutationFn: (variables: IHandleSubmitMessageParams) => handleSubmit(variables),
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.MESSAGES])
        }
    })

    return (
        <section className="chat__form">
            <form
                onSubmit={(e) =>
                    submitMutation.mutate({
                        e,
                        creator: username,
                        image,
                        message: newMessage,
                        timestamp,
                        userpair: normaluserpair
                    })
                }
            >
                <input
                    ref={inputRef}
                    className="chat__send"
                    placeholder="Type your message here..."
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
            </form>
        </section>
    )
}
