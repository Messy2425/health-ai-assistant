import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const stats = [
    { label: 'Member Since', value: new Date(user.createdAt || Date.now()).toLocaleDateString(), icon: <Calendar size={20} /> },
    { label: 'Account Type', value: user.googleId ? 'Google Verified' : 'Standard', icon: <Shield size={20} /> },
  ];

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '800px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}
      >
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary)' }} 
            />
          ) : (
            <div 
              style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#f1f5f9', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #e2e8f0' }}
            >
              <User size={64} />
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '5px', right: '5px', backgroundColor: '#10b981', width: '24px', height: '24px', borderRadius: '50%', border: '3px solid white' }}></div>
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{user.name}</h1>
        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Mail size={16} /> {user.email}
        </p>

        <div className="grid grid-cols-1 grid-cols-2" style={{ marginTop: '3rem', gap: '1rem' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '16px', textAlign: 'left' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: '#eff6ff', color: 'var(--primary)' }}><Shield size={20} /></div>
            <span style={{ fontWeight: 600 }}>Security Settings</span>
          </div>
          <ChevronRight size={20} color="#94a3b8" />
        </button>

        <button 
          onClick={logout} 
          className="card" 
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #fee2e2', color: '#ef4444' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: '#fef2f2' }}><LogOut size={20} /></div>
            <span style={{ fontWeight: 600 }}>Logout from Account</span>
          </div>
          <ChevronRight size={20} />
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        HealthAI v1.0.0 • Your data is encrypted and secure.
      </p>
    </div>
  );
};

export default Profile;
