import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

import { User, QueryKeys } from '@constants/index'

import { db } from '../firebase-config'

const fetchUser = async (id?: string): Promise<User | undefined> => {
    if (!id) return

    const userdoc = doc(db, 'users', id)
    const data = await getDoc(userdoc)
    const docSnap = data.data()
    return docSnap as User | undefined
}

export const useAuserData = (id?: string) => {
    const { data, isLoading } = useQuery<User | undefined>({
        queryKey: [QueryKeys.AUSER, id],
        queryFn: () => fetchUser(id)
    })

    return {
        posts: data?.newPosts,
        username: data?.name,
        status: data?.newStatus,
        profileImageUrl: data?.imgurl,
        isLoading
    }
}
