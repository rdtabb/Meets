import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'

import { useToast } from '@components/ui/useToast'
import { firebaseErrors, FirebaseErrorsCodes } from '@constants/firebase-errors'
import { isAuthLoadingAtom } from '@features/index'
import {
    Input,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Button
} from '@ui/index'

import { auth } from '../../../firebase-config'

import { FormValues, loginFormSchema } from './login-form-schema'

export const LoginForm = () => {
    const setIsAuthLoading = useSetAtom(isAuthLoadingAtom)
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange'
    })

    const login = useCallback(
        async (values: FormValues): Promise<void> => {
            try {
                setIsAuthLoading(true)
                await signInWithEmailAndPassword(auth, values.email, values.password)
                toast({
                    title: 'You have logged in',
                    description: `Your email: ${values.email}`
                })
                setIsAuthLoading(false)
            } catch (error) {
                setIsAuthLoading(false)
                const { title, description } =
                    firebaseErrors[(error as FirebaseError).code as FirebaseErrorsCodes]
                toast({
                    title,
                    description
                })
            }
        },
        [toast]
    )

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="grid gap-1">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email: </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter email..."
                                    {...field}
                                    className="bg-black"
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
                                <Input
                                    placeholder="Enter password..."
                                    {...field}
                                    type="password"
                                    className="bg-black"
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
                    Login
                </Button>
            </form>
        </Form>
    )
}
