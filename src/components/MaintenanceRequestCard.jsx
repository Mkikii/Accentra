import React from 'react';
import './MaintenanceRequestCard.css';

const MaintenanceRequestCard = ({ request }) => {
  const { id, name, unit, contact, description, dateRequested, status } = request;

  return (
    <div className="maintenance-card">
      <h3>Request ID: {id}</h3>
      <p><strong>Tenant Name:</strong> {name}</p>
      <p><strong>Unit:</strong> {unit}</p>
      <p><strong>Contact:</strong> {contact}</p>
      <p><strong>Issue:</strong> {description}</p>
      <p><strong>Date Requested:</strong> {dateRequested}</p>
      <p><strong>Status:</strong> <span className={`status-${status.toLowerCase()}`}>{status}</span></p>
    </div>
  );
};

export default MaintenanceRequestCard;
