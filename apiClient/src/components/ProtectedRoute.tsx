import { Navigate, Outlet } from 'react-router-dom';
import { useToken } from '../hooks/useToken';

export const ProtectedRoute = () => {
    const { token, user } = useToken();
    return token && (user?.role === 'reader' || user?.role === 'creator') ? <Outlet /> : <Navigate to="/" />;
};
