import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Toast = ({ error, success }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="bg-red-500/10 border border-red-500/20 backdrop-blur-md text-red-400 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
                    >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md text-emerald-400 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        {success}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
