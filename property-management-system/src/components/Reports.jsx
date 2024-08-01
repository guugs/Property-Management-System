import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import ReportPDF from './ReportPDF';

const Reports = () => {
  const [occupancyReport, setOccupancyReport] = useState(null);
  const [maintenanceReport, setMaintenanceReport] = useState(null);
  const [summaryReport, setSummaryReport] = useState(null);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [occupancy, maintenance, summary] = await Promise.all([
        axios.get('http://localhost:5000/api/reports/occupancy', { headers }),
        axios.get('http://localhost:5000/api/reports/maintenance', { headers }),
        axios.get('http://localhost:5000/api/reports/summary', { headers }),
      ]);

      setOccupancyReport(occupancy.data);
      setMaintenanceReport(maintenance.data);
      setSummaryReport(summary.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to fetch reports. Please try again.');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Reports</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Property Occupancy Report</Typography>
            {occupancyReport ? (
              <List>
                <ListItem>
                  <ListItemText primary={`Total Properties: ${occupancyReport.totalProperties}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Occupied Properties: ${occupancyReport.occupiedProperties}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Vacant Properties: ${occupancyReport.vacantProperties}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Occupancy Rate: ${occupancyReport.occupancyRate}%`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Property Types:" />
                  <List>
                    {Object.entries(occupancyReport.propertyTypes).map(([type, count]) => (
                      <ListItem key={type}>
                        <ListItemText primary={`${type}: ${count}`} />
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              </List>
            ) : (
              <Typography>Loading occupancy report...</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Maintenance Requests Report</Typography>
            {maintenanceReport ? (
              <List>
                <ListItem>
                  <ListItemText primary={`Total Requests: ${maintenanceReport.totalRequests}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Pending Requests: ${maintenanceReport.pendingRequests}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`In-Progress Requests: ${maintenanceReport.inProgressRequests}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Completed Requests: ${maintenanceReport.completedRequests}`} />
                </ListItem>
              </List>
            ) : (
              <Typography>Loading maintenance report...</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Summary Dashboard</Typography>
            {summaryReport ? (
              <List>
                <ListItem>
                  <ListItemText primary={`Total Properties: ${summaryReport.totalProperties}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Occupancy Rate: ${summaryReport.occupancyRate}%`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Pending Maintenance Requests: ${summaryReport.pendingMaintenanceRequests}`} />
                </ListItem>
              </List>
            ) : (
              <Typography>Loading summary dashboard...</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Download Reports</Typography>
            {occupancyReport && maintenanceReport && summaryReport ? (
              <PDFDownloadLink
                document={<ReportPDF 
                  occupancyReport={occupancyReport} 
                  maintenanceReport={maintenanceReport}
                  summaryReport={summaryReport}
                />}
                fileName="property_management_report.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Generating PDF...' : (
                    <Button variant="contained" color="primary">
                      Download PDF Report
                    </Button>
                  )
                }
              </PDFDownloadLink>
            ) : (
              <Typography>Loading reports...</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;