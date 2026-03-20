import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute() {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return isAdmin
    ? <Outlet />
    : <Navigate to="/" replace />;
}