import React, { useState } from 'react';

import { useAuth } from '../context/AuthContext.jsx';


const LoginForm = () => {

const [username, setUsername] = useState('');

const [password, setPassword] = useState('');

const [role, setRole] = useState('tenant');

const [isLoading, setIsLoading] = useState(false);

const [error, setError] = useState('');

const { login } = useAuth();


const handleSubmit = async (e) => {

e.preventDefault();

setIsLoading(true);

setError('');


const success = await login(username, password, role);

if (!success) {

setError('Invalid credentials. Please try again.');

}

setIsLoading(false);

};


return (

<form onSubmit={handleSubmit}>

{error && (

<div className="alert alert-danger" role="alert">

{error}

</div>

)}

<div className="mb-3">

<label htmlFor="username" className="form-label">Username</label>

<input

type="text"

className="form-control"

id="username"

value={username}

onChange={(e) => setUsername(e.target.value)}

required

/>

</div>


<div className="mb-3">

<label htmlFor="password" className="form-label">Password</label>

<input

type="password"

className="form-control"

id="password"

value={password}

onChange={(e) => setPassword(e.target.value)}

required

/>

</div>


<div className="mb-3">

<label htmlFor="role" className="form-label">Role</label>

<select

className="form-select"

id="role"

value={role}

onChange={(e) => setRole(e.target.value)}

>

<option value="tenant">Tenant</option>

<option value="landlord">Landlord</option>

</select>

</div>


<button

type="submit"

className="btn btn-primary w-100"

disabled={isLoading}

>

{isLoading ? 'Logging in...' : 'Login'}

</button>

</form>

);

};


export default LoginForm; 