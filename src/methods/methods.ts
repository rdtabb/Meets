/* eslint-disable @typescript-eslint/no-explicit-any */
import format from 'date-fns/format'
import {
    doc,
    updateDoc,
    getDoc,
    DocumentData,
    getDocs,
    collection,
    deleteDoc,
    orderBy,
    query,
    where
} from 'firebase/firestore'

import {
    User,
    Post,
    Comment,
    AddCommentMutationProps,
    DeletePostMutationProps,
    EditProfilePopupData,
    AddPostData,
    EditIconMutationProps,
    HandleLikeMutationParams,
    SnapType,
    FetchChatMessagesParams,
    Collections
} from '@constants/index'

import { db, auth } from '../firebase-config'

/**
 * ID of the current user
 * */
const uid = localStorage.getItem('uid')!

export const getPosts = async (): Promise<Post[]> => {
    const userdoc = doc(db, Collections.USERS, uid)
    const dataSnap = await getDoc(userdoc)
    const dataset = dataSnap.data()
    const posts: Post[] = await dataset?.newPosts
    return posts
}

export const getUsers = async (): Promise<any> => {
    const usersDataRef = collection(db, Collections.USERS)
    const data: any = await getDocs(usersDataRef)
    return data.docs.map((doc: any) => ({ ...doc.data() }))
}

export const fetchPosts = async (): Promise<Post[]> => {
    const userdoc = doc(db, Collections.USERS, uid)
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
    const newpostsdb = {
        newPosts
    }
    const userdoc = doc(db, Collections.USERS, variables.user_id)
    await updateDoc(userdoc, newpostsdb)
}

export const unlikePost = async (variables: HandleLikeMutationParams): Promise<void> => {
    if (!variables.user_id) throw new Error('Provide correct user_id for unlike mutation')

    const newLikes = variables.target_post.likes.filter((like) => {
        like.user_id === variables.like.user_id
    })
    const newPosts: Post[] = variables.posts.map((post) =>
        post.id === variables.post_id ? { ...post, likes: newLikes } : post
    )
    const newpostsdb = {
        newPosts
    }
    const userdoc = doc(db, Collections.USERS, variables.user_id)
    await updateDoc(userdoc, newpostsdb)
}

export const fetchUserDataset = async (): Promise<User> => {
    const userdoc = doc(db, Collections.USERS, uid)
    const dataSnap = await getDoc(userdoc)
    const user: DocumentData | undefined = dataSnap.data()
    return user as User
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

    const newpostsdb = {
        newPosts: newPosts
    }
    await updateDoc(userdoc, newpostsdb)
}

export const deletePost = async (variables: DeletePostMutationProps): Promise<void> => {
    const newPosts = variables.posts.filter((post) => post.id != variables.id)
    const newpostsdb = {
        newPosts: newPosts
    }
    const userdoc = doc(db, Collections.USERS, uid)
    await updateDoc(userdoc, newpostsdb)
}

export const updateProfileIcon = async (variables: EditIconMutationProps): Promise<void> => {
    const userdoc = doc(db, Collections.USERS, uid)
    const updatedImage = {
        imgurl: variables.url
    }
    await updateDoc(userdoc, updatedImage)
}

export const createComment = async ({
    comment: message,
    post,
    id: userid
}: AddCommentMutationProps): Promise<void> => {
    if (typeof userid === 'undefined') throw new Error('You cannot provide uid of type undefined')
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

export const deleteChatMessage = async (id: string) => {
    const docref = doc(db, Collections.MESSAGES, id)
    await deleteDoc(docref)
}

export const fetchChatMessages = async ({
    userpair,
    reversed
}: FetchChatMessagesParams): Promise<SnapType[]> => {
    try {
        const messagedoc = collection(db, Collections.MESSAGES)
        const querymessages = query(
            messagedoc,
            where('userpair', 'in', [`${userpair}`, `${reversed}`]),
            orderBy('timestamp')
        )
        const snaps = await getDocs(querymessages)
        const messages: SnapType[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- unknown type of snap
        snaps.forEach((snap: any) => {
            messages.push(snap.data())
        })
        return messages
    } catch (err) {
        throw `${err} in the ChatContext in getMessages()`
    }
}

export const editProfile = async (variables: EditProfilePopupData): Promise<void> => {
    const newstatusdb = {
        name: variables.username,
        newStatus: variables.status
    }
    const userdoc = doc(db, Collections.USERS, uid)
    await updateDoc(userdoc, newstatusdb)
}

export const handlePopup = (
    popup: HTMLDivElement,
    operation: 'open' | 'close'
): Promise<unknown> | undefined => {
    if (operation === 'close') {
        popup.setAttribute('data-visible', 'false')
        return new Promise((res) =>
            setTimeout(() => {
                popup.classList.remove('popup_opened')
                res(200)
            }, 200)
        )
    } else {
        popup.setAttribute('data-visible', 'true')
        popup.classList.add('popup_opened')
    }
}
