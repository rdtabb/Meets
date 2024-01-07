import React, { memo } from 'react'

import { LikedPost } from '@constants/index'

import { ErrorBoundary } from '../error-boundary/error-boundary'

import { useDeletePost } from './hooks/use-delete-post'

interface IPostListProps {
    posts: LikedPost[]
}

export const PostList = memo(({ posts }: IPostListProps): JSX.Element => {
    const { deletePost } = useDeletePost()

    return (
        <section className="cards">
            <ErrorBoundary>
                {posts.map((post) => (
                    <article key={post.id} className="card">
                        <img className="card__image" src={post.imgsrc} alt={post.city} />
                        <div className="card__action card__action--liked">
                            <h2 className="card__description">{post.city}</h2>
                            <p className="card__creator">by {post.creator}</p>
                        </div>
                        <button
                            className="card__delete"
                            onClick={() => deletePost({ id: post.id, posts })}
                        ></button>
                    </article>
                ))}
            </ErrorBoundary>
        </section>
    )
})
