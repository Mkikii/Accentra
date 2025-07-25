<<<<<<< HEAD
Accentra is a simple and responsive web application built with React to manage property-related tasks such as maintenance requests and feedback submission. The system offers role-based dashboards for tenants and landlords.
## 🚀 Features

- 🔐 Role-based login (Tenant & Landlord)
- 🏠 Tenant Dashboard
- 🧰 Submit and track maintenance requests
- 💬 Send feedback to landlord
- 🧑‍💼 Landlord Dashboard to manage maintenance and view feedback
- 🎨 Responsive UI with Bootstrap 5
- ☁️ Axios-based API integration

## 📁 Folder Structure
🔧 Backend Setup (Required)

The frontend assumes a backend API running at http://localhost:4000.
Example Endpoints Expected:

    GET /api/maintenance

    POST /api/maintenance

    PATCH /api/maintenance/:id

    GET /api/feedback

    POST /api/feedback

    Ensure your backend server supports CORS and is running on the correct port.

🧪 Tech Stack

    Frontend: React

    Routing: React Router DOM

    HTTP Requests: Axios

    UI Framework: Bootstrap 5

    Backend (assumed): Node.js
📌 Notes

    The background image has been removed from all pages for a cleaner user experience.

    Login determines route redirect (/tenant or /landlord) based on role selection.

    Tenant can view their submitted requests; landlord can update their statuses.
>>>>>>> aef5dfe1cafca1a683c09677db5ed7e67da4c98a
