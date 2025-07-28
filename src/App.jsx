import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import TenantDashboard from './components/TenantDashboard';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/tenant-dashboard" component={TenantDashboard} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;