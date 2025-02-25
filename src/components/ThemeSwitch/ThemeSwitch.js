import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeSwitch.css';

const ThemeSwitch = ({ isDark, onToggle }) => {
    return (
        <button 
            className="theme-switch" 
            onClick={onToggle}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDark ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default ThemeSwitch; 