import { format } from 'date-fns'
import {
    doc,
    deleteDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc
} from 'firebase/firestore'

import { Collections } from '@constants/collections'
import { FetchChatMessagesParams, IHandleSubmitMessageParams, SnapType } from '@constants/types'

import { db } from '../../firebase-config'

export const deleteChatMessage = async (id: string): Promise<void> => {
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
        snaps.forEach((snap) => {
            messages.push(snap.data() as SnapType)
        })
        return messages
    } catch (error) {
        throw `Error in fetchChatMessages: ${error}`
    }
}

export const createChatMessage = async ({
    creator,
    image,
    message,
    timestamp,
    userpair
}: IHandleSubmitMessageParams) => {
    try {
        const docref = collection(db, Collections.MESSAGES)
        const displayDate: string = `${format(new Date(), 'MMMM dd, yyyy pp')}`
        await addDoc(docref, {
            creator,
            image,
            message,
            timestamp,
            userpair,
            displayDate,
            id: ''
        })
    } catch (error) {
        console.error(`Error in createChatMessage: ${error}`)
    }
}
