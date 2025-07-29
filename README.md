# Accentra - Property Management System

**Author:** Maureen Karimi

**Team Members:**

- Maureen Karimi (Scrum Master & Developer: Dashboard, Navigation, `app.js`, `package.json`, `db.json`, `server.js`, git pull/merge, deployment & QA)

- Jesse Kangethe (Maintenance component creation)

- Martha Shantelle (Header and styling component)

- Ashley Mararo (Tenants component)

---

## Project Description

Accentra is a web application designed to streamline property management tasks for both tenants and landlords. It allows tenants to submit maintenance requests and feedback, and landlords to manage tenant information, view all requests, and monitor feedback in real time. The app features secure authentication, easy navigation, and a user-friendly design.

---

## Key Features

- **Tenant and Landlord login roles**

- **Tenant Dashboard:** Submit maintenance requests and feedback

- **Landlord Dashboard:** View/manage maintenance requests and tenant feedback

- **Secure user authentication**

- **Responsive design** (Bootstrap)

---

## Technologies Used

- **Frontend:** React (Vite), React Router DOM, Axios, Bootstrap

- **Backend:** Node.js, Express.js or `json-server` (for grading), CORS

- **Database:** SQLite (file-based) or `db.json` (for local/mock API)

- **Package Manager:** npm

- **Version Control:** Git / GitHub

---

## Getting Started (Local Development)

### Prerequisites

- Node.js (LTS version)

- npm (comes with Node.js)

- Git

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Mkikii/Accentra.git
cd Accentra
```

2. **Install dependencies:**

```bash
npm install
```

### Running the Application

#### **Start the Backend Server**

- For grading or development, run using `json-server`:

```bash
npm install -g json-server
json-server --watch db.json --port 4000
```

- Or, if using your custom Express backend:

```bash
npm start
```

- The backend runs on [http://localhost:4000](http://localhost:4000).

#### **Start the Frontend Dev Server**

- In another terminal tab/window:

```bash
npm run dev
```

- The frontend runs on [http://localhost:5173](http://localhost:5173).

#### **Access the Application**

- Go to [http://localhost:5173](http://localhost:5173) in your web browser.

---

## Deployment

- **Frontend is deployed on Vercel:**

[https://accentra-sigma.vercel.app/](https://accentra-sigma.vercel.app/)

- **Note:** For full functionality, you must have the backend running locally or deploy it to a public server (Render, Railway, etc.).

---

## Demo Login Credentials

**Tenant**

- Username: `kikii_tenant`

- Password: `password123`

**Landlord**

- Username: `landlord_john`

- Password: `adminpassword`

---

## How to Make the Project Work When Deployed

1. Ensure the backend API (either json-server or your Express backend) is deployed to a public server accessible by the frontend.

2. Update the API base URL in your frontend configuration (e.g., in `src/api.js` or environment variables) to point to the deployed backend URL.
 r
3. Deploy the frontend to a hosting service like Vercel, Netlify, or similar.

4. Make sure CORS is properly configured on the backend to allow requests from the frontend domain.

5. Test the deployed frontend to verify it communicates correctly with the backend API.

---

## Team Members and Roles

- **Maureen Karimi**

Scrum Master & Developer. Built dashboard, navigation, core files (`app.js`, `package.json`, `db.json`, `server.js`), handled git pulls/merges, worked on main branch, and ensured successful deployment and QA, overall project management.

- **Jesse Kangethe**

Developed the Maintenance component.

- **Martha Shantelle**

Created header and handled styling.

- **Ashley Mararo**

Built the Tenants component.
