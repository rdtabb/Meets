import React, { memo } from 'react'

import { useAtomValue } from 'jotai'

import { Post as TPost, QueryKeys } from '@constants/index'
import { userIdAtom } from '@features/index'
import { useLikeMutations, useModal } from '@hooks/index'

import { useDeletePost } from '../_hooks/use-delete-post'

interface PostProps {
    posts: TPost[]
    post: TPost
    target_uid?: string
}

export const Post = memo(({ posts, post, target_uid }: PostProps): JSX.Element => {
    const userId = useAtomValue(userIdAtom)
    const { openImagePopup } = useModal()

    const { isLiked, currentMutation } = useLikeMutations({
        post,
        queryKey: QueryKeys.POSTS
    })

    const deletePost = useDeletePost()

    return (
        <article className="card">
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
                        name="likePostButton"
                        type="button"
                        className={isLiked ? 'card__like--active' : 'card__like'}
                        onClick={() =>
                            currentMutation({
                                post_id: post.id,
                                user_id: target_uid,
                                target_post: post,
                                posts,
                                like: {
                                    user_id: userId
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
    )
})
