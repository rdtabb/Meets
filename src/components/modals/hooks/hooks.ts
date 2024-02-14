import { useMemo } from 'react'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { AddCommentMutationProps, QueryKeys } from '@constants/index'
import { userIdAtom } from '@features/index'
import {
    updateProfileIcon,
    createPost,
    editProfile,
    fetchComments,
    createComment
} from '@methods/index'

import { type CreatePostFormValues } from '../add-post/form-schema'
import { ChangeAvatarFormValues } from '../change-avatar/form-schema'
import { EditProfileFormValues } from '../edit-profile/form-schema'

export const useChangeAvatarMutation = () => {
    const queryClient = useQueryClient()
    const uid = useAtomValue(userIdAtom)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (values: ChangeAvatarFormValues) => {
            await updateProfileIcon({
                ...values,
                user_id: uid
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
        }
    })

    return useMemo(
        () => ({
            isPending,
            changeAvatar: mutateAsync
        }),
        [mutateAsync, isPending]
    )
}

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient()
    const uid = useAtomValue(userIdAtom)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: CreatePostFormValues) => {
            await createPost({
                ...variables,
                user_id: uid
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.POSTS] })
        }
    })

    return useMemo(
        () => ({
            addPost: mutateAsync,
            isPending
        }),
        [mutateAsync, isPending]
    )
}

export const useEditProfileMutation = () => {
    const queryClient = useQueryClient()
    const uid = useAtomValue(userIdAtom)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (variables: EditProfileFormValues) => {
            await editProfile({
                ...variables,
                user_id: uid
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
        }
    })

    return useMemo(
        () => ({
            editProfile: mutateAsync,
            isPending
        }),
        [mutateAsync, isPending]
    )
}

export const useCommentsMutation = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: AddCommentMutationProps) => {
            await createComment(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.COMMENTS]
            })
        }
    })

    return useMemo(
        () => ({
            createComment: mutateAsync,
            isPending
        }),
        [mutateAsync, isPending]
    )
}

export const useCommentsQuery = ({
    post_owner_id,
    post_id
}: {
    post_owner_id?: string
    post_id?: number
}) => {
    const { data } = useQuery({
        queryKey: ['comments', post_owner_id, post_id],
        queryFn: () => fetchComments({ uid: post_owner_id, post_id })
    })

    return data
}
