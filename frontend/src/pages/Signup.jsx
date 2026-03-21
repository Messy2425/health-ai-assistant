import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, AlertCircle, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const { signup, googleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const res = await signup(formData.name, formData.email, formData.password);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const res = await googleLogin(credentialResponse.credential);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="auth-container" style={{ padding: '2rem 0' }}>
            <div className="card auth-card">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Activity size={36} color="var(--secondary)" />
                    </div>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join us to start tracking your health journey.</p>
                </div>

                {error && (
                    <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input 
                              type="text" 
                              placeholder="John Doe" 
                              style={{ paddingLeft: '40px' }} 
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input 
                              type="email" 
                              placeholder="johndoe@email.com" 
                              style={{ paddingLeft: '40px' }} 
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input 
                              type="password" 
                              placeholder="••••••••" 
                              style={{ paddingLeft: '40px' }} 
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input 
                              type="password" 
                              placeholder="••••••••" 
                              style={{ paddingLeft: '40px' }} 
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                              required
                            />
                        </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-gradient" 
                      style={{ width: '100%', padding: '0.875rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
                      disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Start Now'}
                        <UserPlus size={20} />
                    </button>
                </form>

                <div style={{ position: 'relative', margin: '2rem 0', textAlign: 'center' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#e2e8f0', zIndex: 0 }}></div>
                    <span style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', padding: '0 1rem', fontSize: '0.85rem', color: '#94a3b8' }}>OR JOIN WITH</span>
                </div>

                <div className="flex-center" style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <GoogleLogin 
                      onSuccess={handleGoogleSuccess} 
                      onError={() => setError('Google Sign-In failed')} 
                      text="signup_with"
                      shape="pill"
                      width="350px"
                    />
                </div>

                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
