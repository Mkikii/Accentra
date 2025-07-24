import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/" end>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/tenants">Tenants</NavLink>
        </li>
        <li>
          <NavLink to="/maintenance">Maintenance</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;