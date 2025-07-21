import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserSignIn from './pages/user/SignIn';
import UserHome from './pages/user/Home';
import AdminSignIn from './pages/admin/SignIn';
import AdminHome from './pages/admin/Home';
import MerchantHome from './pages/merchant/Home'
import AdminLayout from './layout/admin/Layout';
import UserLayout from './layout/user/Layout'
import { AdminKitToaster } from './components/Toast';
import SignUp from './pages/user/SignUp';
import Activity from './pages/user/Activity';
import MerchantLayout from './layout/merchant/Layout';
import MerchantCreate from './pages/merchant/Create'
import MerchantProfile from './pages/merchant/Profile'

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return (user.role_id == 3) ? (
      <Navigate to="/" replace />
    ) : (user.role_id == 2) ? (
      <Navigate to="/merchant" replace />
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

  if (allowedRoles && !allowedRoles.includes(Number(user.role_id))) {
  if (user.role_id == null) {
    return <Navigate to="/activity" replace />;
  }

  return [2, 3].includes(Number(user.role_id)) ? (
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
        <Route path='/sign-up' element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/admin/sign-in" element={<PublicRoute><AdminSignIn /></PublicRoute>}/>
        <Route path="activity" element={<Activity />} />
        
        

        <Route path="/merchant" element={
          <ProtectedRoute allowedRoles={[2]}>
              <MerchantLayout />
          </ProtectedRoute>
        }>
          <Route index element={<MerchantHome />} />
          <Route path='create' element={<MerchantCreate />} />
          <Route path='marketplace/:id' element={<MerchantProfile />} />
        </Route>

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[1]}>
            <AdminLayout />
          </ProtectedRoute>}>
          <Route index element={<AdminHome />} />
        </Route>
        
        <Route path="/"  element={ 
          <ProtectedRoute allowedRoles={[3]}>
            <UserLayout />
          </ProtectedRoute>}>
          <Route index element={<UserHome />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
