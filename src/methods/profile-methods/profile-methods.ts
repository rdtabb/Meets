import { doc, updateDoc } from 'firebase/firestore'

import { Collections } from '@constants/collections'
import { EditIconMutationProps, EditProfilePopupData } from '@constants/types'

import { db } from '../../firebase-config'

export const updateProfileIcon = async (variables: EditIconMutationProps): Promise<void> => {
    if (!variables.user_id) {
        throw new Error('Provide user_id for updateProfileIcon')
    }

    const userdoc = doc(db, Collections.USERS, variables.user_id)
    const updatedImage = {
        imgurl: variables.url
    }
    await updateDoc(userdoc, updatedImage)
}

export const editProfile = async (variables: EditProfilePopupData): Promise<void> => {
    if (!variables.user_id) {
        throw new Error('Provide user_id for editProfile ')
    }
    const newstatusdb = {
        name: variables.username,
        newStatus: variables.status
    }
    const userdoc = doc(db, Collections.USERS, variables.user_id)
    await updateDoc(userdoc, newstatusdb)
}
