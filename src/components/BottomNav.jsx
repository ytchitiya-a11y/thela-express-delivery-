import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'Orders', end: true },
  { to: '/history', label: 'History' },
  { to: '/profile', label: 'Profile' },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-clay/15 flex z-30">
    {tabs.map((tab) => (
      <NavLink
        key={tab.to}
        to={tab.to}
        end={tab.end}
        className={({ isActive }) =>
          `flex-1 text-center py-3 font-body text-sm font-medium ${isActive ? 'text-chili' : 'text-clay'}`
        }
      >
        {tab.label}
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
