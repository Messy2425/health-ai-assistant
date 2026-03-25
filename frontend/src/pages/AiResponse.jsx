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
  Share2,
  Activity,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

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
        <div className="container app-wrapper">
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
                <button 
                    onClick={() => navigate('/dashboard')} 
                    style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer' }}
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{category}</h2>
            </header>

            {!response && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card fade-in" 
                    style={{ padding: '24px', position: 'relative' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                       <Sparkles size={20} color="var(--primary)" />
                       <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--primary)' }}>Healthcare AI</span>
                    </div>
                    
                    <textarea 
                        rows="6" 
                        className="input-field" 
                        placeholder="Describe your health concern in detail..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        style={{ 
                            height: 'auto',
                            padding: '16px', 
                            fontSize: '16px',
                            resize: 'none',
                            fontFamily: 'inherit',
                            marginBottom: '20px'
                        }}
                    />
                    
                    <button 
                        className="btn btn-primary" 
                        onClick={() => handleInquiry()}
                        disabled={loading || !question.trim()}
                    >
                        {loading ? <Loader2 size={22} className="spin" /> : <Send size={22} />}
                        <span>{loading ? 'Analyzing...' : 'Ask Health Assistant'}</span>
                    </button>
                    
                    <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
                       Education purpose only. Not a medical diagnosis.
                    </p>
                </motion.div>
            )}

            <AnimatePresence>
                {response && (
                    <motion.div 
                        initial="hidden" 
                        animate="visible" 
                        style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '40px' }}
                    >
                        {/* Summary Section */}
                        <motion.section variants={sectionVariant} className="card" style={{ borderLeft: '4px solid var(--primary)', background: '#f5f7ff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Info size={20} color="var(--primary)" />
                                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Summary</h3>
                            </div>
                            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-main)' }}>{response.aiResponse.summary}</p>
                        </motion.section>

                        {/* Potential Reasons */}
                        <motion.section variants={sectionVariant} className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <HelpCircle size={20} color="#f59e0b" />
                                <h4 style={{ fontWeight: '800' }}>Possible Reasons</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {response.aiResponse.possibleReasons.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ minWidth: '6px', height: '6px', borderRadius: '3px', background: '#f59e0b', marginTop: '8px' }}></div>
                                        <span style={{ fontSize: '14px' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Habits TO Follow */}
                        <motion.section variants={sectionVariant} className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <CheckCircle size={20} color="var(--secondary)" />
                                <h4 style={{ fontWeight: '800' }}>Healthy Habits</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {response.aiResponse.healthyHabits.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ minWidth: '6px', height: '6px', borderRadius: '3px', background: 'var(--secondary)', marginTop: '8px' }}></div>
                                        <span style={{ fontSize: '14px' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Warning Signs */}
                        <motion.section variants={sectionVariant} className="card" style={{ background: '#fff1f2', border: '1px solid #fda4af' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <AlertTriangle size={20} color="#e11d48" />
                                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#be123c' }}>Warning Signs</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {response.aiResponse.warningSigns.map((item, i) => (
                                    <p key={i} style={{ fontSize: '14px', color: '#9f1239', fontWeight: '500' }}>• {item}</p>
                                ))}
                            </div>
                        </motion.section>

                        {/* Questions for Doctor */}
                        <motion.section variants={sectionVariant} className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <Heart size={20} color="var(--primary)" />
                                <h4 style={{ fontWeight: '800' }}>Ask Your Doctor</h4>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {response.aiResponse.doctorQuestions.map((item, i) => (
                                    <div key={i} style={{ padding: '8px 16px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #dbeafe', color: '#1e40af', fontSize: '13px', fontWeight: '600' }}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Disclaimer */}
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '0 20px', fontStyle: 'italic' }}>
                            {response.aiResponse.disclaimer}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                            <button className="btn btn-primary" onClick={() => window.print()} style={{ background: 'var(--text-main)', boxShadow: 'none' }}>
                               <Share2 size={20} />
                               <span>Save as PDF</span>
                            </button>
                            <button className="btn btn-secondary" onClick={() => setResponse(null)}>Ask New Question</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: '#fee2e2', color: '#b91c1c', textAlign: 'center', fontWeight: '600' }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default AiResponse;
