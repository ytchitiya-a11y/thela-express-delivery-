import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [vehicleType, setVehicleType] = useState('bike');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password, name, vehicleType);
      }
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tandoor px-5">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h1 className="font-display italic text-2xl text-ink mb-1">Thela Express</h1>
        <p className="font-body text-sm text-clay mb-6">Delivery Partner</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <>
              <input
                type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full border border-clay/30 rounded-md px-3 py-2.5 font-body text-sm"
              />
              <select
                value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
                className="w-full border border-clay/30 rounded-md px-3 py-2.5 font-body text-sm bg-white"
              >
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="cycle">Cycle</option>
              </select>
            </>
          )}
          <input
            type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full border border-clay/30 rounded-md px-3 py-2.5 font-body text-sm"
          />
          <input
            type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
            className="w-full border border-clay/30 rounded-md px-3 py-2.5 font-body text-sm"
          />

          {error && <p className="text-chili font-body text-sm">{error}</p>}

          <button
            type="submit" disabled={submitting}
            className="w-full bg-tandoor text-paper font-body font-semibold py-3 rounded-md hover:bg-chili transition disabled:opacity-50"
          >
            {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="mt-4 text-sm font-body text-clay underline"
        >
          {mode === 'login' ? 'New partner? Sign up' : 'Already registered? Log in'}
        </button>
      </div>
    </div>
  );
};

export default Login;
