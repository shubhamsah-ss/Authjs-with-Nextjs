"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOutIcon, User2 } from "lucide-react"
import { useCurrentUser } from '@/hooks/use-current-user'
import LogoutButton from './logout-button'

const UserButton = () => {
    const user = useCurrentUser()
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback className='bg-sky-500'>
                            <User2 className='text-white' />
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-40' align='end'>
                <LogoutButton>
                    <DropdownMenuItem>
                        <LogOutIcon className='w-4 h-4 mr-2' /> Logout
                    </DropdownMenuItem>
                </LogoutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserButton