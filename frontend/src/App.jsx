import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/user/SignIn';
import Home from './pages/user/Home'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
