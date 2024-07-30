import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import axios from 'axios';

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/auth/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Property Management System
                </Typography>
                <Box>
                    <Button color="inherit" component={RouterLink} to="/dashboard">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/properties">
                        Properties
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/tenants">
                        Tenants
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/maintenance">
                        Maintenance
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;