import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './components/ProtectedLayout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import History from './pages/History';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedLayout><Orders /></ProtectedLayout>} />
        <Route path="/history" element={<ProtectedLayout><History /></ProtectedLayout>} />
        <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
