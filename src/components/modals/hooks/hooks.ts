import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type EditIconMutationProps, QueryKeys } from '@constants/index'
import { UseModal, useModal } from '@hooks/index'
import { updateProfileIcon } from '@methods/index'

export const useChangeAvatarMutation = () => {
    const queryClient = useQueryClient()
    const { closePopup }: UseModal = useModal()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: updateProfileIcon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
        }
    })

    const changeAvatar = async (variables: EditIconMutationProps, popup: HTMLDivElement | null) => {
        await mutateAsync(variables)
        closePopup(popup)
    }

    return {
        isPending,
        changeAvatar
    }
}
