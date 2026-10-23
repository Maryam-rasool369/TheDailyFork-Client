import type { Category } from "./categoryType";

export interface BlogAuthor {
    id: number;
    firstName: string;
    lastName: string | null;
    email?: string;
    avatar: string;
}

export type BlogStatus = "PENDING" | "APPROVED" | "REJECTED";


export interface Blog {
    id: number;
    title: string;
    shortDescription: string;
    content: string;
    imageUrl: string;
    status: BlogStatus;
    categoryId: number;
    category: Category;
    authorId: number;
    author: BlogAuthor;
    createdAt: string;
    updatedAt: string;
}

