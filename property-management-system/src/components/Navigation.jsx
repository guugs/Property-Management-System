import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/tenants">Tenants</Link></li>
                <li><Link to="/maintenance">Maintenance</Link></li>
                <li><Link to="/login">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;