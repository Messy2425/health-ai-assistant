import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Utensils, 
  HeartPulse, 
  FileText, 
  HelpCircle, 
  History as HistoryIcon,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Activity,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        {
          id: 'symptom-checker',
          title: 'Symptoms',
          icon: <Stethoscope size={28} />,
          category: 'Symptom Analysis',
          color: '#6366f1',
          bg: '#eef2ff'
        },
        {
          id: 'diet-recommendation',
          title: 'Nutrition',
          icon: <Utensils size={28} />,
          category: 'Diet Recommendation',
          color: '#10b981',
          bg: '#ecfdf5'
        },
        {
          id: 'lifestyle-advice',
          title: 'Lifestyle',
          icon: <HeartPulse size={28} />,
          category: 'Lifestyle Improvement',
          color: '#f43f5e',
          bg: '#fff1f2'
        },
        {
          id: 'medical-report',
          title: 'Reports',
          icon: <FileText size={28} />,
          category: 'Medical Report Explanation',
          color: '#8b5cf6',
          bg: '#f5f3ff'
        },
        {
          id: 'doctor-questions',
          title: 'Questions',
          icon: <HelpCircle size={28} />,
          category: 'Doctor Question Generator',
          color: '#f59e0b',
          bg: '#fffbeb'
        },
        {
          id: 'history',
          title: 'History',
          icon: <HistoryIcon size={28} />,
          category: 'history',
          color: '#64748b',
          bg: '#f8fafc'
        }
    ];

    const handleCardClick = (category) => {
        if (category === 'history') {
            navigate('/history');
        } else {
            navigate('/ask', { state: { category } });
        }
    };

    return (
        <div className="container app-wrapper">
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0' }}
            >
                <div>
                   <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Hello, {user?.name.split(' ')[0]} 👋</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>How are you feeling today?</p>
                </div>
                <div 
                  onClick={() => navigate('/profile')}
                  style={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden', border: '2px solid var(--primary)', cursor: 'pointer' }}
                >
                   {user?.profilePicture ? (
                     <img src={user.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   ) : (
                     <div style={{ background: '#e2e8f0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity size={24} color="var(--primary)" />
                     </div>
                   )}
                </div>
            </motion.div>

            {/* Main AI Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ask')}
              style={{ 
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                borderRadius: '24px',
                padding: '24px',
                color: 'white',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 20px 40px -12px rgba(99, 102, 241, 0.4)'
              }}
            >
                <div style={{ position: 'relative', zIndex: 1 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Sparkles size={20} />
                      <span style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', opacity: 0.9 }}>AI Assistant</span>
                   </div>
                   <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: '800' }}>Ask your health queston</h3>
                   <p style={{ opacity: 0.8, fontSize: '14px', marginBottom: '20px', maxWidth: '80%' }}>Get instant AI-powered health insights and recommendations.</p>
                   <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ opacity: 0.9 }}>Type anything here...</span>
                      <ArrowRight size={20} />
                   </div>
                </div>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '60px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ position: 'absolute', bottom: '-40px', right: '40px', width: '80px', height: '80px', borderRadius: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
            </motion.div>

            {/* Grid Menu */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="card"
                      style={{ 
                        margin: 0,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '12px',
                        cursor: 'pointer',
                        background: 'white',
                        border: '1px solid #f1f5f9'
                      }}
                      onClick={() => handleCardClick(item.category)}
                    >
                        <div style={{ 
                          width: '52px', 
                          height: '52px', 
                          borderRadius: '16px', 
                          background: item.bg, 
                          color: item.color,
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                            {item.icon}
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '16px' }}>{item.title}</span>
                    </motion.div>
                ))}
            </div>

            {/* Quick Stats / Info */}
            <div style={{ marginTop: '32px' }}>
               <h4 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: '800' }}>Health Insights</h4>
               <div className="health-stat-card" style={{ marginBottom: '12px' }}>
                  <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
                     <Clock size={24} />
                  </div>
                  <div>
                     <p style={{ fontSize: '14px', fontWeight: '700' }}>Stay Hydrated</p>
                     <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Drink at least 8 glasses of water today.</p>
                  </div>
               </div>
               <div className="health-stat-card">
                  <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                     <CheckCircle2 size={24} />
                  </div>
                  <div>
                     <p style={{ fontSize: '14px', fontWeight: '700' }}>Daily Exercise</p>
                     <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>30 mins of walking can improve heart health.</p>
                  </div>
               </div>
            </div>
        </div>
    );
};

export default Dashboard;
