import { useQueryClient, useMutation } from '@tanstack/react-query'

import { QueryKeys } from '@constants/queryKeys'
import { deleteChatMessage } from '@methods/index'

export const useDeleteMessage = () => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteChatMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.MESSAGES] })
        }
    })

    return deleteMutation.mutate
}
