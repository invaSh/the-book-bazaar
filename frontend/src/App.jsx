import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/user/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
