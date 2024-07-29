import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navigation = () => {
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
                    <Button color="inherit" component={RouterLink} to="/login">
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;