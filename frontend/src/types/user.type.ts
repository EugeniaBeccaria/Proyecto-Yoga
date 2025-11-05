export interface User {
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    dni?: string;
    role?: 'admin' | 'professor' | 'client';
    createdAt?: string;
    updatedAt?: string;
}