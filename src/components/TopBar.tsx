import { Search, Bell, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function TopBar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="glass-header flex justify-between items-center w-full px-8 py-3 border-b border-outline">
      <div className="flex items-center gap-8">
        <NavLink to="/" className="text-xl font-black tracking-tighter text-primary">
          Caderno Digital
        </NavLink>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) => `
              font-headline text-sm font-bold tracking-tight transition-colors duration-200
              ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}
            `}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/schedule"
            className={({ isActive }) => `
              font-headline text-sm font-bold tracking-tight transition-colors duration-200
              ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}
            `}
          >
            Schedule
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-surface-low border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary w-64 transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-secondary hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-secondary hover:text-primary transition-colors">
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="text-secondary hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
          <div className="w-8 h-8 rounded-full border border-outline overflow-hidden">
            <img
              src="https://picsum.photos/seed/student/100/100"
              alt="User profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
