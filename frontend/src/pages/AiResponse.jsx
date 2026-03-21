import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Send, 
  ChevronLeft, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  HelpCircle, 
  Heart,
  Loader2,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://health-ai-assistant-cgttwghev-attendence-apps-projects.vercel.app');

const AiResponse = () => {
    const { state } = useLocation();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(state?.question || '');
    const [category, setCategory] = useState(state?.category || 'General Health');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (state?.question) {
            handleInquiry(state.question);
        }
    }, [state]);

    const handleInquiry = async (customQuestion) => {
        const q = customQuestion || question;
        if (!q.trim()) return;

        setLoading(true);
        setError('');
        setResponse(null);

        try {
            const res = await axios.post(`${API_BASE}/api/ai/ask`, 
              { question: q, category },
              { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setResponse(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong while communicating with AI.');
        } finally {
            setLoading(false);
        }
    };

    const sectionVariant = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '850px' }}>
            <button 
                onClick={() => navigate('/dashboard')} 
                className="btn btn-outline" 
                style={{ marginBottom: '2rem', border: 'none', padding: '0.5rem 0' }}
            >
                <ChevronLeft size={20} />
                <span>Back to Dashboard</span>
            </button>

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{category}</h1>
                <p style={{ color: 'var(--text-muted)' }}>Get educational insights and general health awareness suggestions.</p>
            </header>

            {!response && (
                <div 
                    className="card" 
                    style={{ 
                        padding: '2rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.5rem', 
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' 
                    }}
                >
                    <div className="form-group">
                        <label style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'block' }}>
                            Describe your concern:
                        </label>
                        <textarea 
                            rows="4" 
                            className="input" 
                            placeholder="Ex: I feel constant fatigue despite sleeping 8 hours..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '1.25rem', 
                                border: '1.5px solid #e2e8f0', 
                                borderRadius: '16px',
                                fontSize: '1.05rem',
                                resize: 'none',
                                fontFamily: 'inherit'
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleInquiry()}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                            className="btn btn-primary" 
                            style={{ padding: '0.8rem 2.5rem', borderRadius: '50px' }}
                            onClick={() => handleInquiry()}
                            disabled={loading || !question.trim()}
                        >
                            {loading ? <Loader2 size={22} className="spin" /> : <Send size={22} />}
                            <span style={{ marginLeft: '10px' }}>{loading ? 'Analyzing...' : 'Submit Inquiry'}</span>
                        </button>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {response && (
                    <motion.div 
                        initial="hidden" 
                        animate="visible" 
                        className="ai-response-container"
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                    >
                        {/* Summary Section */}
                        <motion.section variants={sectionVariant} className="card" style={{ borderLeft: '5px solid var(--primary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                <Info size={24} color="var(--primary)" />
                                <h3 style={{ fontSize: '1.4rem' }}>Summary</h3>
                            </div>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-main)' }}>{response.aiResponse.summary}</p>
                        </motion.section>

                        <div className="grid grid-cols-1 grid-cols-2" style={{ gap: '2rem' }}>
                            {/* Potential Reasons */}
                            <motion.section variants={sectionVariant} className="card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                    <HelpCircle size={22} color="#f59e0b" />
                                    <h4 style={{ fontWeight: 700 }}>Possible Reasons</h4>
                                </div>
                                <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {response.aiResponse.possibleReasons.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                            <div style={{ padding: '4px', borderRadius: '50%', backgroundColor: '#fef3c7' }}><div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f59e0b' }}></div></div>
                                            <span style={{ fontSize: '0.95rem' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>

                            {/* Habits TO Follow */}
                            <motion.section variants={sectionVariant} className="card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                    <CheckCircle size={22} color="var(--success)" />
                                    <h4 style={{ fontWeight: 700 }}>Healthy Habits</h4>
                                </div>
                                <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {response.aiResponse.healthyHabits.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                            <div style={{ padding: '4px', borderRadius: '50%', backgroundColor: '#d1fae5' }}><div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981' }}></div></div>
                                            <span style={{ fontSize: '0.95rem' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>
                        </div>

                        {/* Warning Signs */}
                        <motion.section variants={sectionVariant} className="card" style={{ backgroundColor: '#fff5f5', borderColor: '#feb2b2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                <AlertTriangle size={24} color="#f56565" />
                                <h3 style={{ fontSize: '1.3rem', color: '#c53030' }}>Warning Signs</h3>
                            </div>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {response.aiResponse.warningSigns.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#742a2a', fontWeight: 500 }}>
                                        <span style={{ fontSize: '1.1rem' }}>•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Questions for Doctor */}
                        <motion.section variants={sectionVariant} className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                <Heart size={22} color="var(--primary)" />
                                <h4 style={{ fontWeight: 700 }}>Questions to Ask Your Doctor</h4>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {response.aiResponse.doctorQuestions.map((item, i) => (
                                    <div key={i} style={{ padding: '0.5rem 1rem', borderRadius: '50px', backgroundColor: '#eff6ff', border: '1px solid #dbeafe', color: '#1e40af', fontSize: '0.85rem' }}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Disclaimer */}
                        <motion.section variants={sectionVariant} style={{ marginTop: '1rem', padding: '1.5rem', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.875rem', color: '#64748b', fontStyle: 'italic' }}>
                                <strong>Disclaimer:</strong> {response.aiResponse.disclaimer}
                            </p>
                        </motion.section>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button className="btn btn-outline" onClick={() => setResponse(null)}>Ask Another Question</button>
                            <button className="btn btn-primary" onClick={() => window.print()}><Share2 size={18} /> Print Record</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', textAlign: 'center' }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default AiResponse;
