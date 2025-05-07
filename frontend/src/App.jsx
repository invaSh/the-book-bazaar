import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserSignIn from './pages/user/SignIn';
import UserHome from './pages/user/Home';
import AdminSignIn from './pages/admin/SignIn';
import AdminHome from './pages/admin/Home';
import AdminLayout from './layout/admin/Layout';
import UserLayout from './layout/user/Layout'
import { AdminKitToaster } from './components/Toast';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return [4, 5].includes(user.role) ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/admin" replace />
    );
  }

  return children;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(Number(user.role))) {
    return [4, 5].includes(Number(user.role)) ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/admin" replace />
    );
  }

  return children;
};

function App() {
  return (
    <Router>
      <AdminKitToaster />
      <Routes>
        <Route path="/sign-in" element={<PublicRoute><UserSignIn /></PublicRoute>}/>
        <Route path="/admin/sign-in" element={<PublicRoute><AdminSignIn /></PublicRoute>}/>
        

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[1, 2, 3]}>
            <AdminLayout />
          </ProtectedRoute>}>
          <Route index element={<AdminHome />} />
        </Route>
        
        <Route path="/"  element={ 
          <ProtectedRoute allowedRoles={[4, 5]}>
            <UserLayout />
          </ProtectedRoute>}>
          <Route index element={<UserHome />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
