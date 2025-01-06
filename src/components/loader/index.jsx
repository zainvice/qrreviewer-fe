import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-white">
            <div className="relative flex items-center justify-center">
                {/* Icon */}
                <img
                    src="/favicon.png"
                    alt="Icon"
                    className="absolute animate-ping w-20 h-20 opacity-50"
                />
                {/* Logo */}
                <img
                    src="/logo-z.png"
                    alt="Logo"
                    className="relative animate-bounce w-64"
                />
            </div>
        </div>
    );
};

export default Loader;
