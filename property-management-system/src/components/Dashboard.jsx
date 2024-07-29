import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/properties">Properties</Link></li>
                    <li><Link to="/tenants">Tenants</Link></li>
                    <li><Link to="/maintenance">Maintenance</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;