import React from 'react';


function LoginForm() {
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
    role: 'Landlord'
  });
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    // Define all users with their credentials
    const users = {
      // Tenants
      'ashley': { password: 'ashley123', role: 'Tenant', name: 'Ashley Mararo' },
      'kikii': { password: 'kikii123', role: 'Tenant', name: 'Kikii' },
      'najma': { password: 'najma123', role: 'Tenant', name: 'Najma' },
      'arvin': { password: 'arvin123', role: 'Tenant', name: 'Arvin' },
      
      // Landlords
      'jesse': { password: 'jesse123', role: 'Landlord', name: 'Jesse' },
      'marth': { password: 'marth123', role: 'Landlord', name: 'Marth' },
      'vanessa': { password: 'vanessa123', role: 'Landlord', name: 'Vanessa' },
      'martha': { password: 'martha123', role: 'Landlord', name: 'Martha' },
      
      // Admin
      'maureen': { password: 'superadmin', role: 'Admin', name: 'Maureen' }
    };
    
    const user = users[credentials.username.toLowerCase()];
    
    if (user && 
        user.password === credentials.password && 
        user.role === credentials.role) {
      alert(`Welcome ${user.name}! Login successful as ${credentials.role}!`);
      setError('');
    } else {
      setError('Invalid username, password, or role selection');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <div className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </div>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter username"
        />
      </div>
      
      <div className="mb-4">
        <div className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </div>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter password"
        />
      </div>
      
      <div className="mb-6">
        <div className="block text-gray-700 text-sm font-bold mb-2">
          Role
        </div>
        <select
          name="role"
          value={credentials.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
        >
          <option value="Landlord">🏠 Landlord</option>
          <option value="Tenant">🏘️ Tenant</option>
          <option value="Admin">⚙️ Admin</option>
        </select>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </div>
  );
}

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white text-center py-6">
            <h2 className="text-2xl font-bold mb-2">Accentra Login</h2>
            <p className="opacity-75">Property Management System</p>
          </div>
          
          <div className="p-6">
            <LoginForm />
          </div>
          
          <div className="bg-gray-50 text-center py-4 border-t">
            <div className="text-sm text-gray-600 mb-1">
              Enter your credentials to access the system
            </div>
            <div className="text-xs text-gray-500">
              Made by M.Karimi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;