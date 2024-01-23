import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'

import { useToast } from '@components/ui/useToast'
import { firebaseErrors, type FirebaseErrorsCodes, Collections } from '@constants/index'
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

import { auth, db } from '../../../firebase-config'
import { createUser } from '../auth-utils'

import { FormValues, regFormSchema } from './reg-form-schema'

export const RegisterForm = () => {
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(regFormSchema),
        mode: 'onChange'
    })

    const register = useCallback(
        async ({ email, password }: FormValues): Promise<void> => {
            try {
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
                                <Input
                                    type="password"
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
                                <Input
                                    type="password"
                                    placeholder="Confirm password..."
                                    className="bg-black"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="secondary" className="w-min">
                    Register
                </Button>
            </form>
        </Form>
    )
}
