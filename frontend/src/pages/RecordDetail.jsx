import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChevronLeft, Info, HelpCircle, CheckCircle, AlertTriangle, Heart, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RecordDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/ai/history/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setRecord(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecord();
    }, [id, user.token]);

    if (loading) return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}><Loader2 className="spin" size={48} color="var(--primary)" /><p>Loading Record...</p></div>;
    if (!record) return <div>Record Not Found</div>;

    return (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '850px' }}>
            <button onClick={() => navigate('/history')} className="btn btn-outline" style={{ marginBottom: '2rem', border: 'none' }}>
                <ChevronLeft size={20} /> Back to History
            </button>
            <h1 style={{ marginBottom: '0.5rem' }}>{record.category} Analysis</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Analyzed on {new Date(record.createdAt).toLocaleString()}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="card" style={{ borderLeft: '5px solid var(--primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><Info size={24} color="var(--primary)" /><h3>Summary</h3></div>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>{record.aiResponse.summary}</p>
                </div>

                <div className="grid grid-cols-1 grid-cols-2" style={{ gap: '2rem' }}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><HelpCircle size={22} color="#f59e0b" /><h4>Possible Reasons</h4></div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {record.aiResponse.possibleReasons.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>• {item}</li>)}
                        </ul>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><CheckCircle size={22} color="var(--success)" /><h4>Healthy Habits</h4></div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {record.aiResponse.healthyHabits.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>• {item}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="card" style={{ backgroundColor: '#fff5f5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><AlertTriangle size={24} color="#f56565" /><h3>Warning Signs</h3></div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {record.aiResponse.warningSigns.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>• {item}</li>)}
                    </ul>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><Heart size={22} color="var(--primary)" /><h4>Questions for Doctor</h4></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {record.aiResponse.doctorQuestions.map((item, i) => <div key={i} className="flex-center" style={{ padding: '0.5rem 1rem', borderRadius: '50px', backgroundColor: '#eff6ff', border: '1px solid #dbeafe', color: '#1e40af', fontSize: '0.85rem' }}>{item}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordDetail;
