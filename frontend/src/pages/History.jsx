import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ChevronRight, 
  History as HistoryIcon, 
  Search, 
  Calendar,
  Activity,
  FileText,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

const History = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/ai/history`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setHistory(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [user.token]);

    const filteredHistory = history.filter(item => 
        item.userInput.toLowerCase().includes(filter.toLowerCase()) || 
        item.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container app-wrapper">
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
               <button 
                  onClick={() => navigate('/dashboard')} 
                  style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer' }}
               >
                  <ChevronLeft size={24} />
               </button>
               <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Your Activity</h2>
            </header>

            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <Search size={20} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Search your history..." 
                  style={{ paddingLeft: '48px' }}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '60px 0' }}>
                    <Loader2 size={32} className="spin" color="var(--primary)" />
                    <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Loading records...</p>
                </div>
            ) : filteredHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredHistory.map((item, index) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="card"
                          style={{ 
                            margin: 0,
                            padding: '16px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px',
                            cursor: 'pointer',
                            justifyContent: 'space-between',
                            border: '1px solid #f1f5f9'
                          }}
                          onClick={() => navigate(`/record/${item._id}`)}
                        >
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ 
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px', 
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Activity size={24} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
                                        {item.category}
                                    </span>
                                    <h3 style={{ fontSize: '15px', color: 'var(--text-main)', margin: '2px 0', fontWeight: '700' }}>
                                        {item.userInput.length > 40 ? item.userInput.substring(0, 40) + '...' : item.userInput}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={12} />
                                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight size={20} color="#cbd5e1" />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <div style={{ background: '#f8fafc', width: '80px', height: '80px', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#cbd5e1' }}>
                       <HistoryIcon size={40} />
                    </div>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No records found</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>You haven't made any health inquiries yet.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Ask Your First Question</button>
                </div>
            )}
        </div>
    );
};

export default History;
