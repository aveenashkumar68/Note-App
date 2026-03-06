import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        </div>
    );
};

export default Background;
