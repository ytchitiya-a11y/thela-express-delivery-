import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toggleAvailability } from '../api/client';

const TopBar = () => {
  const { partner, setPartner, logout } = useAuth();
  const [updating, setUpdating] = useState(false);

  const isOnline = partner?.status !== 'offline';

  const handleToggle = async () => {
    setUpdating(true);
    const newStatus = isOnline ? 'offline' : 'available';
    try {
      const { data } = await toggleAvailability(newStatus);
      setPartner(data.partner);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <header className="bg-tandoor text-paper px-5 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        <p className="font-display italic text-lg leading-none">Thela Express</p>
        <p className="font-body text-xs text-paper/50 mt-0.5">{partner?.name}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={updating}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs font-semibold transition ${
            isOnline ? 'bg-chutney text-paper' : 'bg-clay/30 text-paper/70'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-paper' : 'bg-paper/50'}`} />
          {isOnline ? 'Online' : 'Offline'}
        </button>
        <button onClick={logout} className="text-paper/50 text-xs font-body">Logout</button>
      </div>
    </header>
  );
};

export default TopBar;
