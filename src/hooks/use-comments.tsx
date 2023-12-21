/* eslint-disable react-hooks/rules-of-hooks */
import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
    UseQueryResult
} from '@tanstack/react-query'

import { AddCommentMutationProps, Comment } from '@constants/index'
import { createComment, fetchComments } from '@methods/methods'

type UseCommentType = 'query' | 'mutation'

export type CommentQueryHandler = 'query'
export type CommentMutationHandler = 'mutation'

function useComments(
    type: 'mutation'
): UseMutationResult<void, unknown, AddCommentMutationProps, unknown>
function useComments(
    type: 'query',
    id?: string,
    post_id?: number
): UseQueryResult<Comment[] | undefined, unknown> | undefined
function useComments(
    type: UseCommentType,
    id?: string,
    post_id?: number
):
    | UseMutationResult<void, unknown, AddCommentMutationProps, unknown>
    | UseQueryResult<Comment[] | undefined, unknown>
    | undefined {
    const queryClient = useQueryClient()

    if (type === 'mutation') {
        return useMutation({
            mutationFn: (data: AddCommentMutationProps) => createComment(data),
            onSuccess: () => {
                queryClient.invalidateQueries(['comments'])
            }
        })
    }

    if (type === 'query') {
        return useQuery({
            queryKey: ['comments', id, post_id],
            queryFn: () => fetchComments({ uid: id, post_id })
        })
    }
}

export default useComments
