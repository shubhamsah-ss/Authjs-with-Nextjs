"use client"
import { reset } from '@/actions/reset'
import Cardwrapper from '@/components/auth/Cardwrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { ResetSchema } from '@/schemas'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"

const ResetForm = () => {
    const [isLoading, startLoading] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })
    type ResetResponse = {
        error?: string;
        success?: string;
    };
    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")
        startLoading(() => {
            reset(values)
                .then((data: ResetResponse) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }


    return (
        <Cardwrapper
            headerLabel='Forgot your password'
            backButtonHref='/auth/login'
            backButtonLabel="Back to login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isLoading}
                        type='submit'
                        className='w-full'
                    >Send reset email</Button>
                </form>
            </Form>
        </Cardwrapper>
    )
}

export default ResetForm