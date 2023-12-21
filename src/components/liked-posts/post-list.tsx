/* eslint-disable react/prop-types */
import React, { memo } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../firebase-config'
import { LikedPost, DeleteLikedMutation } from '../../constants/types'
import { ErrorBoundary } from '../error-boundary/error-boundary'

interface IPostListProps {
    posts: LikedPost[]
}

export const PostList = memo(({ posts }: IPostListProps): JSX.Element => {
    const handleDelete = async (props: DeleteLikedMutation) => {
        const uid = localStorage.getItem('uid')!
        const newPosts = posts.filter((post: LikedPost) => post.id != props.id)
        const updateLiked = {
            liked: newPosts
        }
        const userdoc = doc(db, 'users', uid)
        await updateDoc(userdoc, updateLiked)
    }
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: handleDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['userdataset'])
        }
    })

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
                            onClick={() => deleteMutation.mutate({ id: post.id })}
                        ></button>
                    </article>
                ))}
            </ErrorBoundary>
        </section>
    )
})
