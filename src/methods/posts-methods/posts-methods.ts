import { doc, getDoc, updateDoc } from 'firebase/firestore'

import {
    Post,
    Collections,
    HandleLikeMutationParams,
    AddPostData,
    DeletePostMutationProps,
    DeleteLikedMutation,
    LikedPost
} from '@constants/index'

import { db } from '../../firebase-config'

export const getPosts = async (user_id?: string): Promise<Post[]> => {
    if (!user_id) throw new Error('Provide correct user_id for getPosts')

    const userdoc = doc(db, Collections.USERS, user_id)
    const dataSnap = await getDoc(userdoc)
    const dataset = dataSnap.data()
    const posts: Post[] = await dataset?.newPosts
    return posts
}

export const likePost = async (variables: HandleLikeMutationParams): Promise<void> => {
    if (!variables.user_id) throw new Error('Provide correct user_id for like mutation')

    const newLikes = [...variables.target_post.likes, variables.like]
    const newPosts: Post[] = variables.posts.map((post) =>
        post.id === variables.post_id ? { ...post, likes: newLikes } : post
    )

    const userdoc = doc(db, Collections.USERS, variables.user_id)
    await updateDoc(userdoc, {
        newPosts
    })
}

export const unlikePost = async (variables: HandleLikeMutationParams): Promise<void> => {
    if (!variables.user_id) throw new Error('Provide correct user_id for unlike mutation')

    const newLikes = variables.target_post.likes.filter((like) => {
        return like.user_id !== variables.like.user_id
    })
    const newPosts: Post[] = variables.posts.map((post) =>
        post.id === variables.post_id ? { ...post, likes: newLikes } : post
    )

    const userdoc = doc(db, Collections.USERS, variables.user_id)
    await updateDoc(userdoc, {
        newPosts
    })
}

export const createPost = async (variables: AddPostData): Promise<void> => {
    if (!variables.user_id) {
        throw new Error('Provide user_id for createPost')
    }

    const userdoc = doc(db, Collections.USERS, variables.user_id)
    const dataSnap = await getDoc(userdoc)
    const dataset = dataSnap.data()
    const nposts = await dataset?.newPosts

    const id = nposts.length ? nposts[0].id + 1 : 1
    const newPost = {
        city: variables.place,
        id,
        imgsrc: variables.url,
        liked: false,
        comments: [],
        likes: []
    }
    const newPosts = [newPost, ...nposts]

    await updateDoc(userdoc, {
        newPosts: newPosts
    })
}

export const deletePost = async (values: DeletePostMutationProps): Promise<void> => {
    if (!values.user_id) {
        throw new Error('Provide user_id fro deletePost')
    }

    const newPosts = values.posts.filter((post) => post.id != values.id)
    const userdoc = doc(db, Collections.USERS, values.user_id)
    await updateDoc(userdoc, {
        newPosts: newPosts
    })
}

export const deleteLikedPost = async (values: DeleteLikedMutation): Promise<void> => {
    if (!values.user_id) {
        throw new Error('Provide user_id fro deleteLikedPost')
    }

    const newPosts = values.posts.filter((post: LikedPost) => post.id != values.id)
    const userdoc = doc(db, Collections.USERS, values.user_id)
    await updateDoc(userdoc, {
        liked: newPosts
    })
}
