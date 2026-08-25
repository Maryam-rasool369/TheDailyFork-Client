import { z } from "zod";

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number");

export const signupSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required").max(50),
    lastName: z.string().trim().max(50).optional(),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
})
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const forgetPasswordSchema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
    newPassword: passwordSchema,

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;