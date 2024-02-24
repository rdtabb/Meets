import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

import { Collections, User } from '@constants/index'

import { db } from '../../firebase-config'

export const getUsers = async (): Promise<User[]> => {
    const usersDataRef = collection(db, Collections.USERS)
    const data = await getDocs(usersDataRef)
    return data.docs.map((doc) => ({ ...doc.data() })) as User[]
}

export const fetchUserDataset = async (uid?: string): Promise<User> => {
    if (!uid) {
        throw new Error('provide uid for fetchUserDataSet')
    }

    const userdoc = doc(db, Collections.USERS, uid)
    const dataSnap = await getDoc(userdoc)
    const user = dataSnap.data()
    return user as User
}
