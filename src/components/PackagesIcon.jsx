import React from 'react';

const PackagesIcon = ({ size = 24, color = "currentColor", strokeWidth = 1.5, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <line x1="3" y1="6.5" x2="10" y2="6.5" />
        <line x1="14" y1="6.5" x2="21" y2="6.5" />
        <line x1="3" y1="17.5" x2="10" y2="17.5" />
        <line x1="14" y1="17.5" x2="21" y2="17.5" />
        <line x1="6.5" y1="3" x2="6.5" y2="5" />
        <line x1="17.5" y1="3" x2="17.5" y2="5" />
        <line x1="6.5" y1="14" x2="6.5" y2="16" />
        <line x1="17.5" y1="14" x2="17.5" y2="16" />
    </svg>
);

export default PackagesIcon;
