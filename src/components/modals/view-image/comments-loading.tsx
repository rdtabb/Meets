import React from 'react'

export const CommentsLoading = () => (
    <li className="comment comment--empty">
        <article>
            <div className="comment__info">
                <p className="comment__creator"></p>
                <p className="comment__date"></p>
            </div>
            <p className="comment__message"></p>
        </article>
    </li>
)
