import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Activity, User, History as HistoryIcon, LayoutDashboard, LogIn, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)', textDecoration: 'none' }}>
          <Activity size={32} />
          <span>HealthAI</span>
        </Link>

        {user ? (
          <div className="nav-links">
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HistoryIcon size={20} />
              <span>History</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} />
              <span>Profile</span>
            </NavLink>
            <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="flex-center" style={{ gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                 {user.profilePicture ? (
                   <img src={user.profilePicture} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--primary)' }} />
                 ) : (
                   <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e2e8f0' }} className="flex-center"><User size={20} /></div>
                 )}
                 <span style={{ fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/login" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.95rem' }}>
              <LogIn size={18} />
              <span>Log In</span>
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.95rem', boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)' }}>
              <span>Get Started</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
