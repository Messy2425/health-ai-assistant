import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, LogOut, ChevronRight, Activity, Bell, Moon, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const stats = [
    { label: 'Member Since', value: new Date(user.createdAt || Date.now()).toLocaleDateString(), icon: <Calendar size={20} /> },
    { label: 'Account', value: user.googleId ? 'Google' : 'Standard', icon: <Shield size={20} /> },
  ];

  return (
    <div className="container app-wrapper">
      <header style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
         <button 
            onClick={() => navigate('/dashboard')} 
            style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer' }}
         >
            <ChevronLeft size={24} />
         </button>
         <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Your Profile</h2>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card"
        style={{ padding: '32px 24px', textAlign: 'center', marginBottom: '24px', border: 'none', background: 'white' }}
      >
        <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 16px' }}>
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              style={{ width: '100%', height: '100%', borderRadius: '32px', objectFit: 'cover', border: '3px solid var(--primary)' }} 
            />
          ) : (
            <div 
              style={{ width: '100%', height: '100%', borderRadius: '32px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <User size={48} />
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#10b981', width: '24px', height: '24px', borderRadius: '12px', border: '3px solid white' }}></div>
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>{user.name}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>{user.email}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '32px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', textAlign: 'left' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>{stat.label}</div>
              <div style={{ fontSize: '14px', fontFormat: '700' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '800', margin: '12px 0 4px', color: 'var(--text-muted)' }}>Settings</h4>
        
        <SettingsItem icon={<Bell size={20} />} label="Notifications" color="#6366f1" />
        <SettingsItem icon={<Moon size={20} />} label="Dark Mode" color="#1e293b" />
        <SettingsItem icon={<Shield size={20} />} label="Privacy & Security" color="#10b981" />
        
        <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }}></div>
        
        <button 
          onClick={logout} 
          className="card" 
          style={{ 
            margin: 0,
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            cursor: 'pointer', 
            border: 'none', 
            background: '#fff1f2',
            color: '#be123c',
            padding: '16px 20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(225, 29, 72, 0.1)' }}><LogOut size={20} /></div>
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Logout</span>
          </div>
          <ChevronRight size={20} />
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>
        HealthAI Assistant v1.2.0 • Build ID #9921
      </p>
    </div>
  );
};

const SettingsItem = ({ icon, label, color }) => (
  <button className="card" style={{ margin: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #f1f5f9', padding: '16px 20px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: `${color}15`, color }}>{icon}</div>
      <span style={{ fontWeight: '700', fontSize: '15px' }}>{label}</span>
    </div>
    <ChevronRight size={20} color="#cbd5e1" />
  </button>
);

export default Profile;
