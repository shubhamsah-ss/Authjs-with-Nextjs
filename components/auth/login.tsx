"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import LoginForm from '@/components/auth/LoginForm'

interface LoginProps {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean
}

const Login = ({
    children,
    asChild,
    mode = "redirect"
}: LoginProps) => {

    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    } 

    if(mode == "modal") {
        return(
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className='p-0 w-auto bg-transparent border-none'>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    )
}

export default Login