import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Properties
                        </Typography>
                        <Button component={Link} to="/properties" variant="contained" color="primary">
                            Manage Properties
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Tenants
                        </Typography>
                        <Button component={Link} to="/tenants" variant="contained" color="primary">
                            Manage Tenants
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Maintenance
                        </Typography>
                        <Button component={Link} to="/maintenance" variant="contained" color="primary">
                            View Maintenance Requests
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;