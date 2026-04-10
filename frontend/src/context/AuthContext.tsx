import { createContext} from 'react';

interface User {
    name: string;
    lastname?: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
