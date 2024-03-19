import React from 'react'

import { type SnapType } from '@constants/index'

import { useDeleteMessage } from '../_hooks/use-delete-message'

interface MessageProps {
    messages?: SnapType[]
}

export const MessagesList = ({ messages }: MessageProps) => {
    const deleteMessage = useDeleteMessage()

    return (
        <>
            {messages?.length ? (
                messages.map((message, index) => (
                    <li key={index} className="item">
                        <div className="item__wrapper">
                            <img src={message.image} alt="mes.message" className="item__icon" />
                            <article className="item__info-wrapper">
                                <div className="item__row-one">
                                    <p className="item__creator">{message.creator}</p>
                                    <p className="item__time">{message.displayDate}</p>
                                </div>
                                <p className="item__message">{message.message}</p>
                            </article>
                        </div>
                        <button
                            onClick={() => deleteMessage(message.id)}
                            className="item__delete"
                        ></button>
                    </li>
                ))
            ) : (
                <p className="chat__empty">You have no messages with that user!</p>
            )}
        </>
    )
}
