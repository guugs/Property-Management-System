import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const ReportPDF = ({ occupancyReport, maintenanceReport }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Property Management Report</Text>
        
        <Text style={styles.subtitle}>Occupancy Report</Text>
        <Text style={styles.text}>Total Properties: {occupancyReport.totalProperties}</Text>
        <Text style={styles.text}>Occupied Properties: {occupancyReport.occupiedProperties}</Text>
        <Text style={styles.text}>Vacant Properties: {occupancyReport.vacantProperties}</Text>
        <Text style={styles.text}>Occupancy Rate: {occupancyReport.occupancyRate}%</Text>
        
        <Text style={styles.subtitle}>Property Types</Text>
        {Object.entries(occupancyReport.propertyTypes).map(([type, count]) => (
          <Text key={type} style={styles.text}>{type}: {count}</Text>
        ))}
        
        <Text style={styles.subtitle}>Maintenance Report</Text>
        <Text style={styles.text}>Total Requests: {maintenanceReport.totalRequests}</Text>
        <Text style={styles.text}>Pending Requests: {maintenanceReport.pendingRequests}</Text>
        <Text style={styles.text}>In-Progress Requests: {maintenanceReport.inProgressRequests}</Text>
        <Text style={styles.text}>Completed Requests: {maintenanceReport.completedRequests}</Text>
      </View>
    </Page>
  </Document>
);

export default ReportPDF;