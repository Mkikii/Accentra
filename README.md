🎯 Accentra - Property Management System

Author: Maureen Karimi
Team Members:

    Maureen Karimi (Scrum Master & Full-Stack Developer)

    Jesse Kangethe (Maintenance Component Developer)

    Martha Shantelle (UI/Styling & Header Design)

    Ashley Mararo (Tenants Component Developer)

📝 Project Description

Accentra is a responsive and user-friendly web application built to streamline property management for both landlords and tenants. It enables:

    Tenants to submit maintenance requests and provide feedback

    Landlords to manage requests and tenant data in real time

    Secure authentication and role-based dashboards

Designed with a polished UI using React + Bootstrap, it follows best practices for component architecture, routing, and clean code organization.
🚀 Key Features

    🔐 Secure authentication with tenant/landlord roles

    🧰 Maintenance Request Form for tenants

    💬 Feedback Submission from tenants

    📋 Tenant Management for landlords

    📊 Landlord Dashboard for reviewing submissions

    📱 Responsive design using Bootstrap

    🧭 Client-side routing with react-router-dom

    🌐 RESTful API powered by json-server

⚙️ Technologies Used
Category Tools & Libraries
Frontend React (Vite), React Router DOM, Axios, Bootstrap
Backend json-server (for RESTful API), Express (optional)
Database SQLite (optional), db.json (local API)
Others Git, GitHub, Vercel (Deployment)
🛠️ Getting Started (Local Development)
✅ Prerequisites

    Node.js (LTS version)

    npm

    Git

📦 Installation

git clone https://github.com/Mkikii/Accentra.git
cd Accentra
npm install

▶️ Running the Application

1. Start the Backend (json-server):

npm install -g json-server
json-server --watch db.json --port 4000

Or, if you're using a custom Express server:

npm start

    Backend URL: http://localhost:4000

2. Start the Frontend (Vite):

npm run dev

    Frontend URL: http://localhost:5173

🔐 Demo Login Credentials

Tenant

    Username: kikii_tenant

    Password: password123

Landlord

    Username: landlord_john

    Password: adminpassword

🌐 Deployment

    Frontend Hosted On Vercel:
    🔗 https://accentra-sigma.vercel.app/

🧩 How to Make It Work After Deployment

    Deploy the backend (json-server or Express) to services like Render, Railway, or Cyclic.

    Update frontend API_BASE_URL in src/api.js or .env to point to deployed backend.

    Ensure CORS is properly enabled on the backend.

    Test communication between deployed frontend & backend.

    Validate all forms and protected routes work correctly.

🧠 Project Structure Highlights

    Fully SPA-based (Single Page App) using React and index.html

    Utilizes 5+ reusable components (Navbar, Login, TenantDashboard, MaintenanceForm, FeedbackForm)

    Built with clean and modular file structure

    Adheres to DRY principles for logic reuse

📈 Git Commit Practice

    20+ Git commits with descriptive messages for each key feature or fix

    Team followed structured branching and pull/merge process via GitHub

👥 Team & Contributions
Maureen Karimi

    Scrum Master & Full-Stack Developer

    Developed dashboard, routing, App.js, API integration, GitHub workflows

    Handled deployments (Vercel), QA testing, and project management

Jesse Kangethe

    Created the Maintenance Request feature

Martha Shantelle

    Designed the Header and managed UI styling

Ashley Mararo

    Developed the Tenants listing component

📄 License

MIT License © 2025 Maureen Karimi & Accentra Team
