import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'

import { useToast } from '@components/ui/useToast'
import { firebaseErrors, type FirebaseErrorsCodes, Collections } from '@constants/index'
import { isAuthLoadingAtom } from '@features/index'
import {
    Input,
    PasswordInput,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Button
} from '@ui/index'

import { auth, db } from '../../../firebase-config'
import { createUser } from '../auth-utils'

import { FormValues, regFormSchema } from './reg-form-schema'

export const RegisterForm = () => {
    const setIsAuthLoading = useSetAtom(isAuthLoadingAtom)
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(regFormSchema),
        mode: 'onChange'
    })

    const register = useCallback(
        async ({ email, password }: FormValues): Promise<void> => {
            try {
                setIsAuthLoading(true)
                const {
                    user: { uid }
                } = await createUserWithEmailAndPassword(auth, email, password)
                const documentReference = doc(db, Collections.USERS, uid)
                await createUser({
                    document: documentReference,
                    userId: uid,
                    name: email.split('@')[0],
                    imgurl: null
                })
                setIsAuthLoading(false)
                toast({
                    title: `You have registered as ${email.split('@')[0]}`
                })
            } catch (error) {
                setIsAuthLoading(false)
                const { title, description } =
                    firebaseErrors[(error as FirebaseError)?.code as FirebaseErrorsCodes]
                toast({
                    title: title ?? 'Something went wrong',
                    description: description ?? ''
                })
            }
        },
        [toast]
    )

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(register)} className="grid gap-1">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email: </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter email..."
                                    className="bg-black"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password: </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Enter password..."
                                    className="bg-black"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password: </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Confirm password..."
                                    className="bg-black"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={!form.formState.isValid}
                    type="submit"
                    variant="secondary"
                    className="w-min"
                >
                    Register
                </Button>
            </form>
        </Form>
    )
}
