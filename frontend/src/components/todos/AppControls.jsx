import React from 'react';
import { User, LogOut } from 'lucide-react';

const AppControls = ({ userName, activeTasksCount, handleLogout }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 glass-panel py-3 px-5 rounded-2xl gap-4 sm:gap-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-gray-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-display font-medium text-lg">
                    {userName ? userName.charAt(0).toUpperCase() : <User className="w-5 h-5 text-white" />}
                </div>
                <div className="flex flex-col">
                    <span className="text-slate-200 font-medium tracking-wide">{userName ? userName : 'User'}</span>
                    <span className="text-xs text-slate-400">{activeTasksCount} Active Tasks</span>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent rounded-xl transition-all"
            >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default AppControls;
