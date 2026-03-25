import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Activity, 
  User, 
  History as HistoryIcon, 
  LayoutDashboard, 
  PlusCircle,
  Home,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Only show nav if user is logged in
  if (!user) return null;

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    
    return (
      <NavLink to={to} className={`nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">
          <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        <span>{label}</span>
        {isActive && (
          <motion.div 
            layoutId="nav-active"
            className="nav-active-indicator"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Desktop Sidebar / Top Nav */}
      <nav className="desktop-nav">
         <div className="container nav-content">
            <div className="nav-brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
               <div className="brand-logo">
                  <Activity size={24} />
               </div>
               <span>HealthAI</span>
            </div>
            
            <div className="desktop-links">
               <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
               <NavItem to="/history" icon={HistoryIcon} label="History" />
               <NavItem to="/profile" icon={User} label="Profile" />
               <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={20} />
               </button>
            </div>
         </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="bottom-nav">
        <NavItem to="/dashboard" icon={Home} label="Home" />
        <NavItem to="/history" icon={HistoryIcon} label="Activity" />
        
        {/* Floating Action Button for AI Ask */}
        <div className="fab-container">
           <button 
             className="fab-main" 
             onClick={() => navigate('/dashboard')}
             style={{
               background: 'var(--primary)',
               color: 'white',
               width: 56,
               height: 56,
               borderRadius: 28,
               border: 'none',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               boxShadow: '0 8px 16px rgba(99, 102, 241, 0.4)',
               marginTop: -30
             }}
           >
             <PlusCircle size={32} />
           </button>
        </div>

        <NavItem to="/profile" icon={User} label="Profile" />
        <button onClick={handleLogout} className="nav-item logout-nav-item" style={{ border: 'none', background: 'none' }}>
           <div className="nav-icon">
              <LogOut size={24} />
           </div>
           <span>Logout</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .desktop-nav {
          display: none;
          height: 72px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
            align-items: center;
          }
        }

        .desktop-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 20px;
          color: var(--text-main);
        }

        .logout-btn {
          background: #f1f5f9;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #fee2e2;
          color: var(--accent);
        }

        .nav-active-indicator {
          position: absolute;
          bottom: -20px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary);
        }

        .fab-container {
          position: relative;
          z-index: 1001;
        }

        .logout-nav-item {
          cursor: pointer;
        }
      `}} />
    </>
  );
};

export default Navbar;
