import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { partner, logout } = useAuth();

  return (
    <div className="px-4 py-5 pb-24">
      <h1 className="font-display text-xl text-ink mb-4">Profile</h1>

      <div className="bg-white rounded-lg border border-clay/15 p-4 space-y-3">
        <div>
          <p className="font-body text-xs text-clay">Name</p>
          <p className="font-body text-sm text-ink">{partner?.name}</p>
        </div>
        <div>
          <p className="font-body text-xs text-clay">Phone</p>
          <p className="font-body text-sm text-ink">{partner?.phone || '—'}</p>
        </div>
        <div>
          <p className="font-body text-xs text-clay">Vehicle</p>
          <p className="font-body text-sm text-ink capitalize">{partner?.vehicle_type}</p>
        </div>
        <div>
          <p className="font-body text-xs text-clay">Status</p>
          <p className="font-body text-sm text-ink capitalize">{partner?.status}</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-5 w-full py-3 rounded-md font-body text-sm font-medium border border-chili text-chili"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
