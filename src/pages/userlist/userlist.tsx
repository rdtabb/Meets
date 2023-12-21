/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { UserlistLoading, User } from '@components/userlist'
import { QueryKeys } from '@constants/queryKeys'
import { getUsers } from '@methods/methods'

export const Userlist = () => {
    const usersQuery = useQuery({
        queryFn: getUsers,
        queryKey: [QueryKeys.USERLIST]
    })

    return (
        <main className="search">
            <ul className="search__userlist">
                {usersQuery.isLoading ? (
                    <UserlistLoading />
                ) : (
                    usersQuery.data?.map((user: any, index: number) => (
                        <User key={index} user={user} />
                    ))
                )}
            </ul>
        </main>
    )
}

export default Userlist
