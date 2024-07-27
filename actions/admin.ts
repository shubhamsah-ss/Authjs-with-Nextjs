"use server"

import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export const admin = async () => {
    const role = await currentRole()

    if(role === UserRole.ADMIN) {
        return { success: "ALLOWED SERVER ACTION"}
    }

    return { error: "FORBIDDEN SERVER ACTION"}
}