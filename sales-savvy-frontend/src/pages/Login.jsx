import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Mail, User as UserIcon, Loader2, ArrowLeft, Fingerprint } from 'lucide-react';
import { Button, Input } from '../components/ui';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '', fullName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const res = await api.auth.login({ username: formData.username, password: formData.password });
        setAuthToken(res.data.token);
        navigate('/');
      } else {
        await api.auth.signup(formData);
        setIsLogin(true);
        setError('Registered successfully! Please login.');
      }
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]"></div>

      <div className="max-w-md w-full relative z-10 p-10 lg:p-12 border border-gray-100 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl shadow-accent/5">
        <div className="text-center mb-12">
           <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 relative group overflow-hidden">
              <Fingerprint className="w-10 h-10 text-accent group-hover:scale-125 transition-transform" />
           </div>
           <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-3 leading-none underline decoration-accent decoration-8 underline-offset-8">
             {isLogin ? 'Sign In' : 'Join Us'}
           </h1>
           <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black mt-6">
             {isLogin ? 'Welcome back to Sales Savvy' : 'Create your premium account'}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="space-y-2 text-left">
                <label className="font-semibold text-gray-800 ml-2">Full Name</label>
                <Input 
                  placeholder="Enter your full name" 
                  className="h-14 bg-white border-gray-400 px-8"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="font-semibold text-gray-800 ml-2">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="h-14 bg-white border-gray-400 px-8"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </>
          )}

          <div className="space-y-2 text-left">
            <label className="font-semibold text-gray-800 ml-2">Username</label>
            <Input 
              type="text" 
              placeholder="Username" 
              className="h-14 bg-white border-gray-400 px-8"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="font-semibold text-gray-800 ml-2">Password</label>
            <Input 
              type="password" 
              placeholder="Password" 
              className="h-14 bg-white border-gray-400 px-8"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && <p className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest bg-red-50 py-3 rounded-xl">{error}</p>}

          <Button 
            type="submit" 
            disabled={loading}
            className="hero-btn w-full h-16 text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-accent/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (isLogin ? 'Authorize Entry' : 'Create Account')}
          </Button>
        </form>

        <div className="mt-12 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-accent transition-colors"
          >
            {isLogin ? "New Customer? Register Here" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
