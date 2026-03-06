import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Loader2, Sparkles } from 'lucide-react';

const AuthSection = ({
    authMode,
    setAuthMode,
    authData,
    handleAuthInputChange,
    handleLogin,
    handleRegister,
    loading
}) => {
    return (
        <motion.div
            key="auth"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto relative group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-gray-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="glass-panel rounded-2xl p-8 relative">

                {/* Auth Tabs */}
                <div className="flex p-1 mb-8 bg-white/5 rounded-xl">
                    <button
                        onClick={() => setAuthMode('login')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${authMode === 'login' ? 'bg-emerald-500 shadow-lg text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setAuthMode('register')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${authMode === 'register' ? 'bg-emerald-500 shadow-lg text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-5">
                    <AnimatePresence>
                        {authMode === 'register' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text" name="name" value={authData.name} onChange={handleAuthInputChange}
                                    className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                                    placeholder="Full Name" required={authMode === 'register'}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="email" name="email" value={authData.email} onChange={handleAuthInputChange}
                            className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                            placeholder="Email Address" required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="password" name="password" value={authData.password} onChange={handleAuthInputChange}
                            className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                            placeholder="Password" required
                        />
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-gray-500 hover:from-emerald-600 hover:to-gray-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group mt-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                {authMode === 'login' ? 'Sign In' : 'Create Account'}
                                <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AuthSection;
