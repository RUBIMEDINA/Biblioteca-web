import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!token || !user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />; // o una página 403
  }

  return children;
};

export default ProtectedRoute; 