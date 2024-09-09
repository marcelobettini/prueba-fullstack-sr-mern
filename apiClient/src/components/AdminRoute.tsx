import { Navigate, Outlet } from 'react-router-dom';
import { useToken } from '../hooks/useToken';
export const AdminRoute = () => {
    const { token, user } = useToken();
    return token && user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};
