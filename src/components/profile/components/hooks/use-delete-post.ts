import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { QueryKeys } from '@constants/queryKeys'
import { DeletePostMutationProps } from '@constants/types'
import { userIdAtom } from '@features/index'
import { deletePost } from '@methods/index'

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    const userId = useAtomValue(userIdAtom)

    const deleteMutation = useMutation({
        mutationFn: async (values: Omit<DeletePostMutationProps, 'user_id'>) => {
            deletePost({
                ...values,
                user_id: userId
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POSTS]
            })
        }
    })

    return deleteMutation.mutate
}
