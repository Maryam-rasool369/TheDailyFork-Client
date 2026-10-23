// export interface SignupRequest {
//     firstName: string;
//     lastName:string;
//     email: string;
//     password: string;
// }
export interface AuthUser {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    profileImage?: string | null;
    roleId?: number;
}
export interface ApiUser {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: ApiUser;
}