import { z } from "zod";
import { passwordSchema } from "./common.validation";

export const updateProfileSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required").max(50).optional(),
    lastName: z.string().trim().max(50).optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    birthday: z.string().optional(), // plain date input string, e.g. "1999-05-20"
    phoneNumber: z
        .string()
        .trim()
        .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
        .optional()
        .or(z.literal("")),
    bio: z.string().trim().max(300, "Bio must be under 300 characters").optional(),
});

export const verifyPasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
});

export const changePasswordSchema = z
    .object({
        newPassword: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type VerifyPasswordFormData = z.infer<typeof verifyPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;