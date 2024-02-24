import React from 'react'

import { useAtomValue } from 'jotai'

import { Post as TPost, QueryKeys } from '@constants/index'
import { userIdAtom } from '@features/index'
import { useLikeMutations, useModal } from '@hooks/index'

interface PostProps {
    post: TPost
    posts: TPost[]
    target_id?: string
}

export const Post = ({ post, posts, target_id }: PostProps): JSX.Element => {
    const userId = useAtomValue(userIdAtom)
    const { openImagePopup } = useModal()

    const { isLiked, currentMutation } = useLikeMutations({
        post,
        queryKey: QueryKeys.AUSER
    })

    return (
        <article className="card">
            <div className="card__imgwrapper">
                <img
                    onClick={() => openImagePopup(post, true)}
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
                        className={isLiked ? 'card__like--active' : 'card__like'}
                        onClick={() =>
                            currentMutation({
                                post_id: post.id,
                                user_id: target_id,
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
        </article>
    )
}
