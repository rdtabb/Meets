import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'

import { useToast } from '@components/ui/useToast'
import { firebaseErrors, FirebaseErrorsCodes } from '@constants/firebase-errors'
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
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange'
    })

    const login = useCallback(
        async (values: FormValues): Promise<void> => {
            try {
                const result = await signInWithEmailAndPassword(auth, values.email, values.password)
                console.log(result)
                toast({
                    title: 'You have logged in',
                    description: `Your email: ${values.email}`
                })
                console.log(values)
            } catch (error) {
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
                                    className="bg-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="secondary" className="w-min">
                    Login
                </Button>
            </form>
        </Form>
    )
}
