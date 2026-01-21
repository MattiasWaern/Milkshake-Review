import React from "react";

export default function Badge({children, variant = 'default'}){
    const styles = {
        default: {background: '#f3f4f6', color: '#374151'},
        annika: {background: '#fce7f3', color: '#db2777', border: '1px solid #fbcfe8'},
        mattias: {background: '#f3e8ff', color: '#7c3aed', border: '1px solid #ddd6fe'},
        price: {background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0'},
        top: {background: '#fef3c7', color: '#92400e', textShadow: '0 0 4px rgba(146, 64, 14, 0.6)', border: '1px solid #fde68a'},
        dogshit: {background : '#3b3313', color: '#a05118', border: '1px solid #44311c'}
    };


    const currentStyle = styles[variant] ||styles.default;

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: '15px',
            fontSize: '0.75rem',
            fontWeight: '600',
            ...currentStyle
        }}>
            {children}
        </span>
    );
}