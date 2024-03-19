import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { QueryKeys } from '@constants/queryKeys'
import { DeleteLikedMutation } from '@constants/types'
import { userIdAtom } from '@features/index'
import { deleteLikedPost } from '@methods/index'

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    const userId = useAtomValue(userIdAtom)

    const deleteMutation = useMutation({
        mutationFn: async (values: Omit<DeleteLikedMutation, 'user_id'>) => {
            localStorage.removeItem('uid')
            await deleteLikedPost({
                ...values,
                user_id: userId
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.USER]
            })
        }
    })

    return {
        deletePost: deleteMutation.mutate
    }
}
