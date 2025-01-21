import React from 'react';
import './SharedComponents.css';

export const Button = ({ label, onClick }) => (
    <button className="shared-button" onClick={onClick}>
        {label}
    </button>
);

export const Header = ({ text }) => (
    <h2 className="shared-header">{text}</h2>
);
