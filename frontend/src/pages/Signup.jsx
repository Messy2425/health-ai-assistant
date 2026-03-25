import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, AlertCircle, Activity, ChevronRight } from 'lucide-react';
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
        <div className="container auth-page">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="auth-header"
            >
                <div className="auth-logo">
                    <Activity size={32} />
                </div>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Create Account</h1>
                <p style={{ color: 'var(--text-muted)' }}>Start your health journey today</p>
            </motion.div>

            {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card" 
                  style={{ background: '#fff1f2', border: '1px solid #fda4af', padding: '12px', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px' }}
                >
                    <AlertCircle size={18} color="#e11d48" />
                    <span style={{ fontSize: '14px', color: '#be123c', fontWeight: '500' }}>{error}</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                    <User size={20} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Full Name" 
                      style={{ paddingLeft: '48px' }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                </div>

                <div style={{ position: 'relative' }}>
                    <Mail size={20} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-muted)' }} />
                    <input 
                      type="email" 
                      className="input-field" 
                      placeholder="Email Address" 
                      style={{ paddingLeft: '48px' }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                </div>

                <div style={{ position: 'relative' }}>
                    <Lock size={20} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-muted)' }} />
                    <input 
                      type="password" 
                      className="input-field" 
                      placeholder="Password" 
                      style={{ paddingLeft: '48px' }}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                </div>

                <div style={{ position: 'relative' }}>
                    <Lock size={20} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-muted)' }} />
                    <input 
                      type="password" 
                      className="input-field" 
                      placeholder="Confirm Password" 
                      style={{ paddingLeft: '48px' }}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ marginTop: '8px' }}
                >
                    {loading ? 'Creating account...' : 'Sign Up'}
                    <ChevronRight size={20} />
                </button>
            </form>

            <div style={{ margin: '32px 0', position: 'relative', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)' }}></div>
                <span style={{ position: 'relative', background: 'var(--background)', padding: '0 16px', fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>OR</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <GoogleLogin 
                  onSuccess={handleGoogleSuccess} 
                  onError={() => setError('Google Sign-In failed')}
                  shape="rectangular"
                  width="100%"
                />
            </div>

            <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Log In</Link>
            </p>
        </div>
    );
};

export default Signup;
