import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Mail, Shield, Save, Edit2, Loader2, CheckCircle } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';

const Profile = () => {
    const { user: authUser, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (authUser) {
            api.user.getProfile()
                .then(res => {
                    setProfile(res.data);
                    setFormData({ fullName: res.data.fullName || '', email: res.data.email || '' });
                })
                .catch(err => console.error("Failed to fetch profile", err))
                .finally(() => setLoading(false));
        }
    }, [authUser]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const res = await api.user.updateProfile(formData);
            setProfile(res.data);
            setIsEditing(false);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error("Failed to update profile", err);
            setMessage('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-accent animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black uppercase italic">Access Denied</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">Please sign in to view your premium profile dashboard.</p>
                    <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">Account Dashboard</h4>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-0">
                        Your <span className="text-gray-300">Profile.</span>
                    </h1>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} className="gap-2">
                        <Edit2 className="w-4 h-4" /> Edit Profile
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - User Info Card */}
                <Card className="md:col-span-1 flex flex-col items-center text-center p-10 bg-white shadow-xl shadow-gray-100 rounded-[2.5rem] border-none">
                    <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative group overflow-hidden border-2 border-gray-100">
                        <User className="w-16 h-16 text-gray-300 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-1">{profile.fullName || profile.username}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-6">Premium Member</p>
                    
                    <div className="w-full space-y-4 pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Shield className="w-4 h-4 text-gray-400" />
                            <span className="font-bold">ID: #{profile.id}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="font-bold truncate w-full">{profile.email}</span>
                        </div>
                    </div>

                    <Button variant="outline" onClick={logout} className="mt-10 w-full rounded-2xl text-[10px] uppercase font-black tracking-widest text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200">
                        Terminate Session
                    </Button>
                </Card>

                {/* Right Column - Details/Edit Form */}
                <Card className="md:col-span-2 p-10 md:p-12 bg-white shadow-xl shadow-gray-100 rounded-[2.5rem] border-none">
                    {message && (
                        <div className="mb-8 p-4 bg-green-50 text-green-600 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                            <CheckCircle className="w-5 h-5" /> {message}
                        </div>
                    )}

                    <form onSubmit={handleSave} className="space-y-8">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 block">Username (Immutable)</label>
                            <Input value={profile.username} disabled className="bg-gray-50 border-gray-100 text-gray-400 font-bold" />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800 mb-3 block">Full Name</label>
                            <Input 
                                value={formData.fullName} 
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                disabled={!isEditing}
                                placeholder="Enter your full name"
                                className={`text-gray-900 font-bold h-14 ${!isEditing ? 'bg-white border-transparent p-0' : 'bg-gray-50 border-gray-200 px-6'}`}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800 mb-3 block">Email Address</label>
                            <Input 
                                type="email"
                                value={formData.email} 
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                placeholder="Enter your email"
                                className={`text-gray-900 font-bold h-14 ${!isEditing ? 'bg-white border-transparent p-0' : 'bg-gray-50 border-gray-200 px-6'}`}
                            />
                        </div>

                        {isEditing && (
                            <div className="flex gap-4 pt-6">
                                <Button type="submit" disabled={saving} className="flex-1 h-14 gap-2 shadow-lg shadow-accent/20">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Changes
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="px-8 h-14 font-black uppercase text-[10px] tracking-widest">
                                    Discard
                                </Button>
                            </div>
                        )}
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
