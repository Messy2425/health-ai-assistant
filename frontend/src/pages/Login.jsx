import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ChevronRight, Activity, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await login(formData.email, formData.password);
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
                <div className="auth-logo" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' }}>
                    <Activity size={32} />
                </div>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome Back</h1>
                <p style={{ color: 'var(--text-muted)' }}>Sign in to continue your journey</p>
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

                <div style={{ textAlign: 'right', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Forgot Password?</span>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                    <LogIn size={20} />
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
                Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
