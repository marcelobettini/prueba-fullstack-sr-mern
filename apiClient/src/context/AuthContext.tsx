import { createContext, useContext, ReactNode } from 'react';
import { useToken } from '../hooks/useToken';
import { iUser, userRole } from '../types/types';

interface AuthContextType {
    token: string | null;
    user: iUser | null;
    role: userRole | null,
    login: (token: string, user: iUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { token, user, saveTokenToLocalStorage, removeTokenFromLocalStorage } = useToken();

    const login = (userToken: string, userInfo: iUser) => {
        saveTokenToLocalStorage(userToken, userInfo);
    };

    const logout = () => {
        removeTokenFromLocalStorage();
    };

    return (
        <AuthContext.Provider value={{ token, user, role: user?.role ?? null, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
};
