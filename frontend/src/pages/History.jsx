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
  Trash2,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const History = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/ai/history', {
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
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '900px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Previous History</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Review your past healthcare inquiries and AI guidance.</p>
                </div>
                <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '50px', display: 'flex', alignItems: 'center' }}>
                    <Search size={22} color="#94a3b8" />
                    <input 
                      type="text" 
                      placeholder="Search history..." 
                      style={{ border: 'none', background: 'transparent', padding: '0.5rem 1rem', width: '250px' }}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <div className="spin" style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid var(--primary)', borderRadius: '50%', margin: '0 auto' }}></div>
                    <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading history records...</p>
                </div>
            ) : filteredHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {filteredHistory.map((item, index) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="card"
                          style={{ 
                            padding: '1.5rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1.5rem',
                            cursor: 'pointer',
                            justifyContent: 'space-between'
                          }}
                          onClick={() => navigate(`/record/${item._id}`)}
                        >
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ 
                                    padding: '0.75rem', 
                                    borderRadius: '12px', 
                                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                    color: 'var(--primary)'
                                }}>
                                    <Activity size={24} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
                                        {item.category}
                                    </span>
                                    <h3 style={{ fontSize: '1.2rem', marginTop: '0.25rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                        {item.userInput.length > 60 ? item.userInput.substring(0, 60) + '...' : item.userInput}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        <div className="flex-center" style={{ gap: '6px' }}>
                                            <Calendar size={14} />
                                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex-center" style={{ gap: '6px' }}>
                                            <FileText size={14} />
                                            <span>Analysis Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight size={24} color="#cbd5e1" />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="card" style={{ textAlign: 'center', padding: '5rem', border: '2px dashed #e2e8f0', backgroundColor: 'transparent' }}>
                    <div style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}><HistoryIcon size={64} /></div>
                    <h3>No records found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>You haven't made any healthcare inquiries yet.</p>
                    <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/dashboard')}>Ask Your First Question</button>
                </div>
            )}
        </div>
    );
};

export default History;
