import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';
import '../styles/AppShell.css';

export default function AppShell({ children }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <Link to="/" className="logo">
              Movie Search
            </Link>
            <nav className="nav">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
              >
                <MagnifyingGlassIcon className="nav-icon" />
                Search
              </Link>
              <Link
                to="/favorites"
                className={`nav-link ${
                  location.pathname === '/favorites' ? 'active' : ''
                }`}
              >
                <HeartIcon className="nav-icon" />
                Favorites
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
    </div>
  );
}