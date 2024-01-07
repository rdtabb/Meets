import { doc, updateDoc } from 'firebase/firestore'

import { Collections } from '@constants/collections'
import { EditIconMutationProps, EditProfilePopupData } from '@constants/types'

import { db } from '../../firebase-config'

const uid = localStorage.getItem('uid')!

export const updateProfileIcon = async (variables: EditIconMutationProps): Promise<void> => {
    const userdoc = doc(db, Collections.USERS, uid)
    const updatedImage = {
        imgurl: variables.url
    }
    await updateDoc(userdoc, updatedImage)
}

export const editProfile = async (variables: EditProfilePopupData): Promise<void> => {
    const newstatusdb = {
        name: variables.username,
        newStatus: variables.status
    }
    const userdoc = doc(db, Collections.USERS, uid)
    await updateDoc(userdoc, newstatusdb)
}
