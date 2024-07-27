import { UserRole } from "@prisma/client"
import * as z from "zod"
export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
})


export const ResetSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
})

export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    name: z.string().min(1, { message: "Name is required" })
})

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
}).refine((data) => {
    if (data.password && !data.newPassword) return false

    return true
}, {
    message: "New password is required!",
    path: ["newPassword"]
}).refine((data) => {

    if (data.newPassword && !data.password) return false

    return true
}, {
    message: "Password is required!",
    path: ["password"]
})