import { useQueryClient, useMutation } from '@tanstack/react-query'

import { QueryKeys } from '@constants/queryKeys'
import { createChatMessage } from '@methods/index'

export const useCreateMessage = () => {
    const queryClient = useQueryClient()

    const submitMutation = useMutation({
        mutationFn: createChatMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.MESSAGES] })
        }
    })

    return submitMutation.mutateAsync
}
