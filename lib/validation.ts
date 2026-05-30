import { z } from 'zod';

export const messages = {
    usernameMinLength: 'O nome de usuário deve conter pelo menos 3 caracteres',
    usernameMaxLength: 'O nome de usuário deve conter no máximo 20 caracteres',
    invalidUsername: 'O nome de usuário deve conter apenas letras, números e _',
    requiredEmail: 'O email é obrigatório',
    invalidEmail: 'Email inválido',
    requiredPassword: 'A senha é obrigatória',
    passwordMinLength: 'A senha deve conter pelo menos 6 caracteres',
    confirmPassword: 'As senhas não coincidem',
} as const;

const usernameField = z
    .string()
    .min(3, messages.usernameMinLength)
    .max(20, messages.usernameMaxLength)
    .regex(/^[a-zA-Z0-9_ ]+$/, messages.invalidUsername)
    .transform((val) => val.trim())

const emailField = z
    .string()
    .min(1, messages.requiredEmail)
    .email(messages.invalidEmail)
    .transform((val) => val.trim());

const passwordField = z
    .string()
    .min(6, messages.passwordMinLength);

export const registerSchema = z.object({
    username: usernameField,
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, messages.confirmPassword)
}).refine((data) => data.password === data.confirmPassword, {
    message: messages.confirmPassword,
    path: ['confirmPassword'], 
});

export const loginSchema = z.object({
    email: emailField,
    password: z.string().min(1, messages.requiredPassword),
});

export type LoginFormData = z.input<typeof loginSchema>;
export type RegisterFormData = z.input<typeof registerSchema>;