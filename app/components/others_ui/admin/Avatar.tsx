"use client";

import React, { useState, useEffect } from 'react';

interface AvatarProps {
    src?: string | null;
    name: string;
    className?: string; // e.g. "w-16 h-16 text-[24px]"
}

export default function Avatar({ src, name, className = "w-10 h-10 text-[16px]" }: AvatarProps) {
    const [imageError, setImageError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getInitial = () => {
        if (!name) return '?';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length > 1 && parts[0] && parts[1]) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    const getBgColorClass = () => {
        const initial = getInitial();
        if (initial === '?') return 'bg-gray-200 text-gray-500';

        const charCode = initial.charCodeAt(0) + (initial.charCodeAt(1) || 0);
        const colors = [
            'bg-[#A20601] text-white',
            'bg-[#0B153D] text-white',
            'bg-[#00B230] text-white',
            'bg-[#FFB800] text-[#0B153D]',
            'bg-[#3E86F5] text-white',
        ];
        return colors[charCode % colors.length];
    };

    if (!mounted) {
        return <div className={`shrink-0 rounded-full flex items-center justify-center font-black ${className} bg-gray-100`}></div>;
    }

    if (src && !imageError) {
        return (
            <div className={`shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 ${className}`}>
                <img 
                    src={src} 
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)} 
                />
            </div>
        );
    }

    return (
        <div className={`shrink-0 rounded-full flex items-center justify-center font-black shadow-inner ${getBgColorClass()} ${className}`}>
            <span className="opacity-95 leading-none mt-[1px]">{getInitial()}</span>
        </div>
    );
}
