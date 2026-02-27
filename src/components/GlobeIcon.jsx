import React from 'react';

const GlobeIcon = ({ size = 20, color = "currentColor", style = {} }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        stroke={color}
        strokeWidth="20"
        style={style}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="256" cy="256" r="240" />
        <ellipse cx="256" cy="256" rx="100" ry="240" />
        <line x1="16" y1="256" x2="496" y2="256" />
        <line x1="60" y1="130" x2="452" y2="130" />
        <line x1="60" y1="382" x2="452" y2="382" />
        <line x1="256" y1="16" x2="256" y2="496" />
    </svg>
);

export default GlobeIcon;
