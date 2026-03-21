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
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        {
          id: 'symptom-checker',
          title: 'Symptom Checker',
          description: 'Identify potential issues based on symptoms.',
          icon: <Stethoscope size={32} color="#2563eb" />,
          category: 'Symptom Analysis',
          color: 'rgba(37, 99, 235, 0.1)'
        },
        {
          id: 'diet-recommendation',
          title: 'Diet Recommendation',
          description: 'Personalized nutrition and dietary advice.',
          icon: <Utensils size={32} color="#10b981" />,
          category: 'Diet Recommendation',
          color: 'rgba(16, 185, 129, 0.1)'
        },
        {
          id: 'lifestyle-advice',
          title: 'Lifestyle Advice',
          description: 'Tips for fitness, sleep, and mental wellness.',
          icon: <HeartPulse size={32} color="#ef4444" />,
          category: 'Lifestyle Improvement',
          color: 'rgba(239, 68, 68, 0.1)'
        },
        {
          id: 'medical-report',
          title: 'Report Explainer',
          description: 'Understand lab results in simple terms.',
          icon: <FileText size={32} color="#8b5cf6" />,
          category: 'Medical Report Explanation',
          color: 'rgba(139, 92, 246, 0.1)'
        },
        {
          id: 'doctor-questions',
          title: 'Doctor Questions',
          description: 'Get key questions for your next appointment.',
          icon: <HelpCircle size={32} color="#f59e0b" />,
          category: 'Doctor Question Generator',
          color: 'rgba(245, 158, 11, 0.1)'
        },
        {
          id: 'history',
          title: 'Previous History',
          description: 'Access your record of past inquiries.',
          icon: <HistoryIcon size={32} color="#64748b" />,
          category: 'history',
          color: 'rgba(100, 116, 139, 0.1)'
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
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '3rem' }}
            >
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user?.name}!</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    How can I assist you with your health awareness today?
                </p>
            </motion.div>

            <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
                {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="card"
                      style={{ 
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        border: '1px solid #e2e8f0'
                      }}
                      onClick={() => handleCardClick(item.category)}
                    >
                        <div style={{ padding: '0.5rem', borderRadius: '12px', width: 'fit-content', backgroundColor: item.color }}>
                            {item.icon}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.description}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <ArrowRight size={20} color="var(--primary)" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <section style={{ marginTop: '5rem' }}>
                <div 
                  className="card glass" 
                  style={{ 
                    padding: '2rem', 
                    borderRadius: '24px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '1.5rem',
                    border: '1px solid var(--primary)',
                    backgroundColor: 'rgba(37, 99, 235, 0.05)'
                  }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white' }}>
                            <Search size={32} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.75rem' }}>Ask Anything Else</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Type your query directly to our health assistant.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input 
                          type="text" 
                          placeholder="Ex: How to stay hydrated during workouts?" 
                          style={{ padding: '1rem', flexGrow: 1 }}
                          onKeyPress={(e) => e.key === 'Enter' && navigate('/ask', { state: { question: e.target.value } })}
                        />
                        <button 
                          className="btn btn-primary"
                          onClick={() => navigate('/ask')}
                        >
                            Ask Assistant
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <CheckCircle2 size={16} color="var(--success)" />
                            <span>Privacy guaranteed</span>
                        </div>
                        <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <Clock size={16} color="var(--primary)" />
                            <span>Instant analysis</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
