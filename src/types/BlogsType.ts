export interface Author {
    id: string;
    name: string;
    avatar: string;
}

export type BlogCategory = | "Fashion" | "Food" | "Health" | "History" | "Politics" | "Tech" | "Travel";

export interface Blog {
    id: string;

    title: string;

    description: string;
    
    content: string;

    image: string;

    category: BlogCategory;

    author: Author;

    publishedDate: string;

    likes: number;
}