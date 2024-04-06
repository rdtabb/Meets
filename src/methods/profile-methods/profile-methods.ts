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

export const generateProfileImage = async (prompt: string): Promise<void> => {
    try {
        const request = await fetch('https://api.edenai.run/v2/image/generation', {
            method: 'POST',
            headers: {
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTcyN2Y3YTAtN2FmZC00NjA2LThjNzQtZWM0Y2M4ZDQ3NjVlIiwidHlwZSI6ImFwaV90b2tlbiJ9.Q2OtFHWZTOOE0hOYHWAR35DPgxKYp7C0Kmo0igr2zGA',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                providers: 'openai',
                text: prompt,
                resolution: '256x256',
                fallback_providers: 'deepai'
            })
        })

        if (!request.ok) {
            throw new Error(`Request failed with status ${request.status}`)
        }

        const data = await request.json()
        console.log(data)
    } catch (error: unknown) {
        console.log('---------- Caught error ----------')
        console.error(error)
        console.log('----------------------------------')
    }
}
