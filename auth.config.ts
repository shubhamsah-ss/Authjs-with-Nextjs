import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { compare } from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordMatched = await compare(password, user.password)

                    if (passwordMatched) {
                        return user;
                    }
                }
                return null;
            }
        })
    ],

} satisfies NextAuthConfig;