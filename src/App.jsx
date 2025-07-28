import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import TenantDashboard from './components/TenantDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" render={() => <LoginForm handleLogin={handleLogin} />} />
        <Route path="/tenant-dashboard" render={() => <TenantDashboard user={user} handleLogout={handleLogout} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;