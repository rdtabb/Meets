import React, { useRef, memo, useEffect } from 'react'

import { type Comment } from '@constants/index'

type CommentsSectionProps = {
    comments: Comment[] | undefined
}

export const CommentsSection = memo(({ comments }: CommentsSectionProps): JSX.Element => {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [comments])

    return (
        <>
            {comments?.map((comment) => (
                <li key={comment.id} className="comment">
                    <img className="comment__icon" src={comment.img} alt={comment.message} />
                    <article>
                        <div className="comment__info">
                            <p className="comment__creator">{comment.creator}</p>
                            <p className="comment__date">{comment.createdAt}</p>
                        </div>
                        <p className="comment__message">{comment.message}</p>
                    </article>
                </li>
            ))}
            <div ref={scrollRef}></div>
        </>
    )
})
