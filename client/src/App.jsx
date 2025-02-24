import './App.css';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './config/oidcConfig';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <Router>
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
