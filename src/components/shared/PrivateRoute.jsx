import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}