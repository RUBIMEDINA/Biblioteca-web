import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogo from './pages/Catalogo';
import MisPrestamos from './pages/MisPrestamos';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas USER + ADMIN */}
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['USER','ADMIN']}>
              <Catalogo />
            </ProtectedRoute>
          } />
          <Route path="/mis-prestamos" element={
            <ProtectedRoute allowedRoles={['USER','ADMIN']}>
              <MisPrestamos />
            </ProtectedRoute>
          } />

          {/* Solo ADMIN */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 