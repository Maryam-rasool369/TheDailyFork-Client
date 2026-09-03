export type Gender = "MALE" | "FEMALE";

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    profileImage: string | null;
    bio: string | null;
    gender: Gender | null;
    birthday: string | null;
    phoneNumber: string | null;
    isVerified: boolean;
}