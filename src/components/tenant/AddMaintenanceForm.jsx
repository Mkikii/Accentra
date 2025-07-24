import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Path: Accentra/src/context/AuthContext.jsx
import './AddMaintenanceForm.css'; // Path: Accentra/src/components/AddMaintenanceForm.css

const AddMaintenanceForm = ({ onAddRequest }) => {
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    contact: '',
    description: '',
    status: 'Pending'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const maintenanceURL = "http://localhost:3001/maintenanceRequests";

  useEffect(() => {
    if (currentUser && currentUser.role === 'tenant') {
        setFormData(prevData => ({
            ...prevData,
            name: currentUser.name || '',
            unit: currentUser.unit || '',
            contact: currentUser.contact || currentUser.email || currentUser.phone || ''
        }));
    } else {
        setFormData({
            name: '',
            unit: '',
            contact: '',
            description: '',
            status: 'Pending'
        });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    const newRequest = {
      ...formData,
      dateRequested: new Date().toISOString().split('T')[0],
      tenantId: currentUser && currentUser.role === 'tenant' ? currentUser.tenantId : null
    };

    try {
      const response = await fetch(maintenanceURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedRequest = await response.json();
      console.log('Maintenance request added:', addedRequest);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        unit: '',
        contact: '',
        description: '',
        status: 'Pending'
      });
      if (onAddRequest) {
        onAddRequest(addedRequest);
      }
    } catch (err) {
      console.error('Error submitting maintenance request:', err);
      setSubmitError('Failed to submit request: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return <div className="add-maintenance-form-container">Please log in to submit a maintenance request.</div>;
  }

  const isTenantPreFilled = currentUser && currentUser.role === 'tenant' && (currentUser.name || currentUser.unit || currentUser.contact);

  return (
    <div className="add-maintenance-form-container">
      <h2>Submit Maintenance Request</h2>
      {submitSuccess && <p className="success-message">Request submitted successfully!</p>}
      {submitError && <p className="error-message">{submitError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            readOnly={isTenantPreFilled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unit:</label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            readOnly={isTenantPreFilled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Info (Phone/Email):</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            readOnly={isTenantPreFilled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Issue Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default AddMaintenanceForm;
