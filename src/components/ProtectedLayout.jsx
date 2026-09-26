import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

const ProtectedLayout = ({ children }) => {
  const { firebaseUser, loading } = useAuth();

  if (loading) return <p className="font-body text-clay p-6">Loading…</p>;
  if (!firebaseUser) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen">
      <TopBar />
      {children}
      <BottomNav />
    </div>
  );
};

export default ProtectedLayout;
