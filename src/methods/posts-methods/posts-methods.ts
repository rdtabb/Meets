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

const uid = localStorage.getItem('uid')!

export const getPosts = async (user_id?: string): Promise<Post[]> => {
    if (!user_id) throw new Error('Provide correct user_id for getPosts')

    const userdoc = doc(db, Collections.USERS, user_id)
    const dataSnap = await getDoc(userdoc)
    const dataset = dataSnap.data()
    console.log(dataset)
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
        like.user_id === variables.like.user_id
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
    const userdoc = doc(db, Collections.USERS, uid)
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

export const deletePost = async (variables: DeletePostMutationProps): Promise<void> => {
    const newPosts = variables.posts.filter((post) => post.id != variables.id)
    const userdoc = doc(db, Collections.USERS, uid)
    await updateDoc(userdoc, {
        newPosts: newPosts
    })
}

export const deleteLikedPost = async ({ posts, id }: DeleteLikedMutation): Promise<void> => {
    const newPosts = posts.filter((post: LikedPost) => post.id != id)
    const userdoc = doc(db, Collections.USERS, uid)
    await updateDoc(userdoc, {
        liked: newPosts
    })
}
