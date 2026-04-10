export interface User {
    id?: string;
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    dni?: string;
    role?: 'admin' | 'professor' | 'client';
    createdAt?: string;
    updatedAt?: string;
}