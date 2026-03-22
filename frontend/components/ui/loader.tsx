import React from 'react';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
    size = 'medium', 
    color = '#FFE600' 
}) => {
    const sizeMap = {
        small: '24px',
        medium: '40px',
        large: '56px',
    };

    return (
        <div
            style={{
                display: 'inline-block',
                width: sizeMap[size],
                height: sizeMap[size],
                border: `3px solid rgba(0, 0, 0, 0.1)`,
                borderTop: `3px solid ${color}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }}
        >
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};