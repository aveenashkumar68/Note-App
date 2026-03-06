import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Header = ({ isAuthenticated }) => {
    return (
        <header className="text-center mb-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl glass-panel text-emerald-400"
            >
                <Sparkles className="w-8 h-8" />
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-gray-400"
            >
                TaskFlow
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="mt-3 text-slate-400 max-w-xl mx-auto text-lg"
            >
                {isAuthenticated ? 'Organize your day with elegance and speed.' : 'Sign in to access your beautiful workspace.'}
            </motion.p>
        </header>
    );
};

export default Header;
