// src/components/AddTenantForm.jsx

import React, { useState } from 'react';

const AddTenantForm = ({ onAddTenant }) => {
  const getToday = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    apartment: '',
    leaseStart: getToday(),
    leaseEnd: getToday(),
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.apartment) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add tenant');

      const newTenant = await response.json();
      onAddTenant(newTenant); // callback to update parent state

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        apartment: '',
        leaseStart: getToday(),
        leaseEnd: getToday(),
      });

      setError('');
    } catch (err) {
      console.error(err);
      setError('An error occurred while adding the tenant.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-tenant-form">
      <h2>Add New Tenant</h2>

      {error && <p className="error">{error}</p>}

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Martha Shantel"
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. martha@example.com"
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 252-555-1234"
        />
      </label>

      <label>
        Apartment #:
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          placeholder="e.g. A12"
        />
      </label>

      <label>
        Lease Start:
        <input
          type="date"
          name="leaseStart"
          value={formData.leaseStart}
          onChange={handleChange}
        />
      </label>

      <label>
        Lease End:
        <input
          type="date"
          name="leaseEnd"
          value={formData.leaseEnd}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Tenant</button>
    </form>
  );
};

export default AddTenantForm;
