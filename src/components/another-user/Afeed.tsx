import React, { memo, useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type Post, QueryKeys } from '@constants/index'
import { useModal } from '@hooks/use-modal'
import { unlikePost, likePost } from '@methods/methods'

interface AfeedProps {
    posts: Post[]
    username?: string
    uid?: string
}

export const Afeed = memo(({ posts, uid: target_id }: AfeedProps): JSX.Element => {
    const queryClient = useQueryClient()
    const uid: string = localStorage.getItem('uid')!
    const { openImagePopup } = useModal()

    const likeMutation = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.AUSER])
        }
    })

    const unlikeMutation = useMutation({
        mutationFn: unlikePost,
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.AUSER])
        }
    })

    const isLiked = useCallback(
        (post: Post) => {
            if (!post.likes.length) return false

            return post.likes.some((like) => like.user_id === uid)
        },
        [uid]
    )

    return (
        <section className="cards">
            {posts.map((post) => (
                <article key={post.id} className="card">
                    <div className="card__imgwrapper">
                        <img
                            onClick={() => openImagePopup(post)}
                            src={post.imgsrc}
                            alt={post.city}
                            className="card__image"
                        />
                    </div>
                    <div className="card__action">
                        <h2 className="card__description">{post.city}</h2>
                        <div className="card__like-count">
                            <button
                                type="button"
                                className={isLiked(post) ? 'card__like--active' : 'card__like'}
                                onClick={
                                    isLiked(post)
                                        ? () =>
                                              unlikeMutation.mutate({
                                                  post_id: post.id,
                                                  user_id: target_id,
                                                  target_post: post,
                                                  posts,
                                                  like: {
                                                      user_id: uid
                                                  }
                                              })
                                        : () =>
                                              likeMutation.mutate({
                                                  post_id: post.id,
                                                  user_id: target_id,
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
                </article>
            ))}
        </section>
    )
})
