import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Properties
                        </Typography>
                        <Button component={RouterLink} to="/properties" variant="contained" color="primary">
                            Manage Properties
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Tenants
                        </Typography>
                        <Button component={RouterLink} to="/tenants" variant="contained" color="primary">
                            Manage Tenants
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Leases
                        </Typography>
                        <Button component={RouterLink} to="/leases" variant="contained" color="primary">
                            Manage Leases
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Maintenance
                        </Typography>
                        <Button component={RouterLink} to="/maintenance" variant="contained" color="primary">
                            Manage Maintenance
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <Typography variant="h6" gutterBottom>
                            Reports
                        </Typography>
                        <Button component={RouterLink} to="/reports" variant="contained" color="primary">
                            View Reports
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;