import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (email: string,
    token: string
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: `${process.env.RESEND_FROM}`,
        to: email,
        subject: 'Verify your account',
        text: 'Please verify your account by clicking the link below',
        html: `<h2>Please verify your account by clicking the link below <br/><a href="${confirmLink}">Click here</a> to confirm email.</h2>`
    })
}

export const sendPasswordResetEmail = async (email: string,
    token: string
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: `${process.env.RESEND_FROM}`,
        to: email,
        subject: 'Reset your password',
        text: 'Reset your password',
        html: `<h2><br/><a href="${resetLink}">Click here</a> to reset your password.</h2>`
    })
}

export const sendTwoFactorTokenEmail = async(email:string, token:string) => {
    await resend.emails.send({
        from: `${process.env.RESEND_FROM}`,
        to: email,
        subject: '2FA Code',
        text: '2FA Code',
        html: `<p>Your 2FA code: ${token}</p>`
    })
}