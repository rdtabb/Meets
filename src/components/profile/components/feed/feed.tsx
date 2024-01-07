import React, { memo, useCallback } from 'react'

import { Post } from '@constants/index'
import { useModal } from '@hooks/use-modal'

import { useFeedMutations } from '../hooks/use-feed-mutations'

interface FeedProps {
    posts: Post[]
}

export const Feed = memo(({ posts }: FeedProps): JSX.Element => {
    const uid: string = localStorage.getItem('uid')!

    const { likePost, unlikePost, deletePost } = useFeedMutations()
    const { openImagePopup } = useModal()

    const isLiked = useCallback(
        (post: Post) => {
            if (!post.likes.length) return false
            return post.likes.some((like) => like.user_id === uid)
        },
        [uid]
    )

    return (
        <section className="cards">
            {posts.map((post: Post) => (
                <article key={post.id} className="card">
                    <div className="card__imgwrapper">
                        <img
                            onClick={() => openImagePopup(post)}
                            src={post.imgsrc}
                            alt={post.city}
                            className="card__image"
                        ></img>
                    </div>

                    <div className="card__action">
                        <h2 className="card__description">{post.city}</h2>
                        <div className="card__like-count">
                            <button
                                name="likePostButton"
                                type="button"
                                className={isLiked(post) ? 'card__like--active' : 'card__like'}
                                onClick={
                                    isLiked(post)
                                        ? () =>
                                              unlikePost({
                                                  post_id: post.id,
                                                  user_id: uid,
                                                  target_post: post,
                                                  posts,
                                                  like: {
                                                      user_id: uid
                                                  }
                                              })
                                        : () =>
                                              likePost({
                                                  post_id: post.id,
                                                  user_id: uid,
                                                  target_post: post,
                                                  posts,
                                                  like: {
                                                      user_id: uid
                                                  }
                                              })
                                }
                            ></button>
                            <p className="card__count">{post.likes.length}</p>
                        </div>
                    </div>
                    <button
                        name="deletePostButton"
                        onClick={() =>
                            deletePost({
                                id: post.id,
                                posts: posts
                            })
                        }
                        className="card__delete"
                    ></button>
                </article>
            ))}
        </section>
    )
})
