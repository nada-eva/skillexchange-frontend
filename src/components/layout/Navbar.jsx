import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        <Link to="/" className="navbar-logo">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">
            Skill<span className="logo-accent">Exchange</span>
          </span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}> Accueil </Link>
          <Link to="/annonces" className={`nav-link ${isActive('/annonces') ? 'active' : ''}`}> Annonces </Link>
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <div className="avatar avatar-sm">
                {user.prenom?.[0]}{user.nom?.[0]}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm"> Connexion </Link>
              <Link to="/register" className="btn btn-primary btn-sm"> S'inscrire </Link>
            </>
          )}
        </div>

        <button className="burger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/annonces" onClick={() => setMenuOpen(false)}>Annonces</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Connexion</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>S'inscrire</Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;