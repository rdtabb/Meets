import React, { memo, useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'

import { Post } from '@constants/index'
import { selectedPostSelector, setOpenPopupType, setSelectedPost } from '@features/index'
import { likePost, unlikePost, deletePost } from '@methods/methods'

type FeedProps = {
    posts: Post[]
}

export const Feed = memo(({ posts }: FeedProps) => {
    const uid: string = localStorage.getItem('uid')!
    const selectedPost = useSelector(selectedPostSelector)

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const likeMutation = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries(['postsdata'])
        }
    })

    const unlikeMutation = useMutation({
        mutationFn: unlikePost,
        onSuccess: () => {
            queryClient.invalidateQueries(['postsdata'])
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries(['postsdata'])
        }
    })

    const handleImagePopup = (post: Post): void => {
        dispatch(setOpenPopupType('image'))

        if (selectedPost?.id !== post.id) dispatch(setSelectedPost(post))
    }

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
                            onClick={() => handleImagePopup(post)}
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
                                              unlikeMutation.mutate({
                                                  post_id: post.id,
                                                  user_id: uid,
                                                  target_post: post,
                                                  posts,
                                                  like: {
                                                      user_id: uid
                                                  }
                                              })
                                        : () =>
                                              likeMutation.mutate({
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
                            deleteMutation.mutate({
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
