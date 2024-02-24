import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { User, QueryKeys } from '@constants/index'
import { userIdAtom } from '@features/index'
import { fetchUserDataset } from '@methods/index'

export const useCurrentUser = () => {
    const uid = useAtomValue(userIdAtom)

    const { data, isLoading } = useQuery<User>({
        queryFn: () => fetchUserDataset(uid),
        queryKey: [QueryKeys.USER, uid]
    })

    return {
        username: data?.name,
        status: data?.newStatus,
        profileImageUrl: data?.imgurl,
        likedPosts: data?.liked,
        isLoading
    }
}
