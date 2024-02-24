import { format } from 'date-fns'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Collections } from '@constants/collections'
import { AddCommentMutationProps, Post, Comment } from '@constants/types'

import { db, auth } from '../../firebase-config'

export const createComment = async ({
    comment: message,
    post,
    id: userid
}: AddCommentMutationProps): Promise<void> => {
    if (!userid) throw new Error('You cannot provide uid of type undefined')

    const userdoc = doc(db, Collections.USERS, userid)
    const dataSnap = await getDoc(userdoc)
    const dataset = dataSnap.data()
    const posts: Post[] = dataset?.newPosts
    const creator = dataset?.name

    const img = auth.currentUser?.photoURL ?? ''
    const createdAt: string = `${format(new Date(), 'MMMM dd, yyyy pp')}`

    const commentPost = posts.find((postf) => postf.id == post?.id)!
    const comments: Comment[] = commentPost?.comments

    const id: number = comments.length ? comments[comments.length - 1].id + 1 : 1
    const newcomment: Comment = {
        creator,
        message,
        createdAt,
        id,
        img
    }
    const newComments = [...comments, newcomment]
    const updatedPosts = posts.map((npost) =>
        npost.id == post?.id ? { ...npost, comments: newComments } : npost
    )
    const newpostsdb = {
        newPosts: updatedPosts
    }
    await updateDoc(userdoc, newpostsdb)
}

export const fetchComments = async ({
    uid,
    post_id
}: {
    uid: string | undefined
    post_id: number | undefined
}): Promise<Comment[] | undefined> => {
    if (!uid || !post_id) throw new Error('Provide correct uid and post_id to fetch comments')

    const userdoc = doc(db, Collections.USERS, uid)
    const dataSnap = await getDoc(userdoc)
    const dataset = dataSnap.data()

    const posts: Post[] = dataset?.newPosts
    const post = posts.find((post) => post.id === post_id)
    return post?.comments
}
