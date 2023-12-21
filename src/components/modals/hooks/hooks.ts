import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type EditIconMutationProps, QueryKeys } from '@constants/index'
import { UseModal, useModal } from '@hooks/index'
import { updateProfileIcon } from '@methods/methods'

export const useChangeAvatarMutation = () => {
    const queryClient = useQueryClient()
    const { closePopup }: UseModal = useModal()

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: updateProfileIcon,
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.USER])
        }
    })

    const changeAvatar = async (variables: EditIconMutationProps, popup: HTMLDivElement | null) => {
        await mutateAsync(variables)
        closePopup(popup)
    }

    return {
        isLoading,
        changeAvatar
    }
}
