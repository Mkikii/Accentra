# Accentra - Property Management System

## Author

Maureen Karimi

## Description

Accentra is a property management system designed to help property owners and managers keep track of their properties and tenants. The system allows users to view and manage tenant information, submit maintenance requests, and view property details.

## Project Setup Instructions

1. Clone the repository: `git clone https://github.com/Mkikii/Accentra.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`

## Live Site

https://accentra-sigma.vercel.app/

## Technologies Used

* Frontend: React (Vite), React Router DOM, Bootstrap
* Backend: json-server (RESTful API)
* Deployment: Vercel (Frontend), Render (Backend)

## Features

* Login System: Use provided credentials to log in
* Signup System: Create new accounts
* Tenant Dashboard: Submit maintenance requests, view status
* Landlord Dashboard: Manage requests, view tenant info
* Responsive Design: Works on all devices

## API Endpoints

* `GET /users` - User authentication
* `POST /users` - User registration
* `GET /maintenanceRequests` - Fetch requests
* `POST /maintenanceRequests` - Submit requests
* `POST /feedback` - Submit feedback

## License

MIT License

Copyright 2023 Maureen Karimi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.