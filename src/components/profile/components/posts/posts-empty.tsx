import React from 'react'

interface PostsEmptyProps {
    message: string
}

export const PostsEmpty = ({ message }: PostsEmptyProps): JSX.Element => (
    <section className="cards cards--empty">
        <article className="card card--empty"></article>
        <article className="card card--empty"></article>
        <article className="card card--empty"></article>
        <div className="cards--empty__wrapper">
            <h1 className="cards--empty__header">{message}</h1>
        </div>
    </section>
)
