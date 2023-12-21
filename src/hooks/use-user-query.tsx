import { useQuery } from '@tanstack/react-query'

import { User, QueryKeys } from '@constants/index'
import { fetchUserDataset } from '@methods/methods'

export const useUserQuery = () => {
    const { data, isLoading } = useQuery<User>({
        queryFn: fetchUserDataset,
        queryKey: [QueryKeys.USER]
    })

    return {
        username: data?.name,
        status: data?.newStatus,
        profileImageUrl: data?.imgurl,
        likedPosts: data?.liked,
        isLoading
    }
}
