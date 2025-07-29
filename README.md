# 🏠 Accentra - Property Management System

**Author:** Maureen Karimi  
**Team Members:** Maureen Karimi, Jesse Kangethe, Martha Shantelle, Ashley Mararo

## 📝 Project Description

Accentra is a modern, responsive single-page application (SPA) built with React that streamlines property management for both landlords and tenants. The application provides secure authentication, role-based dashboards, and comprehensive property management features.

### Key Features
- 🔐 Secure user authentication with role-based access
- 🏠 Property  management
- 🔧 Maintenance request system
- 💬 Feedback submission system
- 📊 Dashboard for landlords and tenants
- 📱 Fully responsive design
- 🌐 RESTful API integration

## 🚀 Technologies Used

- **Frontend:** React 18, React Router DOM, Bootstrap 5, Custom CSS
- **Backend:** JSON Server (RESTful API)
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Deployment:** Vercel (Frontend), Render (Backend)

## 📦 Project Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mkikii/Accentra.git
   cd Accentra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the JSON Server (Backend):**
   ```bash
   npm run server
   ```
   The API will be available at `http://localhost:4000`

4. **Start the React Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Demo Credentials
- **Tenant:** 
  - Email: kikii_tenant@example.com
  - Password: password123
- **Landlord:** 
  - Email: landlord_john@example.com
  - Password: adminpassword

## 🌐 Live Deployment

- **Frontend (Vercel):** [https://accentra-sigma.vercel.app/](https://accentra-sigma.vercel.app/)
- **Backend API (Render):** [https://accentra-backend.onrender.com](https://accentra-backend.onrender.com)

## 🏗️ Project Structure

The application follows React best practices with component-based architecture:

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Header.jsx      # Dashboard header
│   ├── Footer.jsx      # Footer component
│   ├── LoginForm.jsx   # Login form component
│   └── SignUpForm.jsx  # Registration form component
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── Login.jsx       # Login page
│   ├── TenantDashboard.jsx    # Tenant dashboard
│   ├── LandlordDashboard.jsx  # Landlord dashboard
│   ├── MaintenanceForm.jsx    # Maintenance requests
│   └── FeedbackForm.jsx       # Feedback submission
├── context/            # React Context for state management
│   └── AuthContext.jsx # Authentication context
├── api/               # API integration
│   └── api.js         # API functions
└── App.jsx           # Main application component
```

## 🔧 API Endpoints

The JSON Server provides the following RESTful endpoints:

- `GET /users` - Fetch all users
- `POST /users` - Create new user
- `GET /maintenanceRequests` - Fetch maintenance requests
- `POST /maintenanceRequests` - Create maintenance request
- `GET /feedback` - Fetch feedback
- `POST /feedback` - Submit feedback

## 🎨 Styling

The application uses a combination of:
- Bootstrap 5 for responsive layout and components
- Custom CSS for unique styling and dark theme
- Morphism design elements for modern UI

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Authentication & Authorization

- Role-based authentication (Tenant/Landlord)
- Protected routes based on user roles
- Secure session management
- Form validation and error handling

## 🚀 Deployment Instructions

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build and start commands
4. Deploy the JSON Server

## 📄 License

MIT License © 2025 Maureen Karimi & Accentra Team

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions, please contact the development team or create an issue on GitHub.

---

**Note:** This project was developed as part of Phase 2 requirements, demonstrating proficiency in React, component architecture, routing, API integration, and modern web development practices.
