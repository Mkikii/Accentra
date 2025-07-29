const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, username: 'tenantdemo', password: 'demotenant123', role: 'tenant' },
  { id: 2, username: 'landlorddemo', password: 'demolandlord123', role: 'landlord' },
];

let properties = [
  {
    id: 1,
    name: 'Greenview Apartments',
    address: '123 Main St',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipcode: '00100',
    price: 100000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    type: 'Apartment',
  },
  {
    id: 2,
    name: 'Riverside Villas',
    address: '456 River Rd',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipcode: '00200',
    price: 250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    type: 'Townhouse',
  },
  {
    id: 3,
    name: 'City Centre Lofts',
    address: '789 Central Ave',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipcode: '00100',
    price: 80000,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 750,
    type: 'Studio Apartment',
  },
  {
    id: 4,
    name: 'Karen Family Home',
    address: '101 Forest Lane',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipcode: '00506',
    price: 450000,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3500,
    type: 'Detached House',
  },
  {
    id: 5,
    name: 'Lavington Executive Suite',
    address: '222 Executive Way',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipcode: '00600',
    price: 180000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    type: 'Condominium',
  },
];

app.get('/properties', (req, res) => {
  res.json(properties);
});

app.post('/properties', (req, res) => {
  const newProperty = { id: properties.length + 1, ...req.body };
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser = { id: users.length + 1, username, password, email, role: 'tenant' };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});