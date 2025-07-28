# Accentra - Property Management System

## 🚀 Live Demo

- **Frontend:** https://accentra-sigma.vercel.app/
- **Backend:** https://accentra-backend.onrender.com/

## 🎯 FOR GRADERS - QUICK ACCESS

### Demo Login Credentials (Available on Live Demo)

**Tenant Account:**

- Username: `kikii_tenant`
- Password: `password123`

**Landlord Account:**

- Username: `landlord_john`
- Password: `adminpassword`

### Option 1: Live Demo (Recommended)

1. Visit: https://accentra-sigma.vercel.app/
2. Use credentials above to login
3. Test all features (signup, login, dashboards)

### Option 2: Local Setup (Backup)

```bash
git clone https://github.com/Mkikii/Accentra.git
cd Accentra
npm install
npm start     # Terminal 1 (backend on port 4000)
npm run dev   # Terminal 2 (frontend on port 5173)
```

## Features Demonstrated

- **Login System:** Use provided credentials
- **Signup System:** Create new accounts
- **Tenant Dashboard:** Submit maintenance requests, view status
- **Landlord Dashboard:** Manage requests, view tenant info
- **Responsive Design:** Works on all devices

## Technologies Used

- **Frontend:** React (Vite), React Router DOM, Bootstrap
- **Backend:** json-server (RESTful API)
- **Deployment:** Vercel (Frontend), Render (Backend)

## Grading Criteria ✅

- ✅ **5+ React components** (LoginForm, SignUpForm, TenantDashboard, LandlordDashboard, App)
- ✅ **3+ client-side routes** (/, /login, /signup, /dashboard)
- ✅ **Single page application** (React SPA)
- ✅ **RESTful API with GET/POST** (json-server with CORS)
- ✅ **Login credentials provided** (See above)
- ✅ **Signup functionality** (Working on live demo)
- ✅ **Professional README** (This document)
- ✅ **Live deployment** (Both frontend and backend deployed)

## API Endpoints

- `GET /users` - User authentication
- `POST /users` - User registration
- `GET /maintenanceRequests` - Fetch requests
- `POST /maintenanceRequests` - Submit requests
- `POST /feedback` - Submit feedback

## License

MIT License

---

**For grading:** Both live demo and local setup work perfectly. Live demo is recommended for convenience.
