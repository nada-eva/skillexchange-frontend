import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const location              = useLocation();
  const navigate              = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // ex: "NS" pour Nada Sb
  const initials = user
    ? `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`
    : '';

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        {/* ── Logo ── */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">
            Skill<span className="logo-accent">Exchange</span>
          </span>
        </Link>

        {/* ── Liens de navigation desktop ── */}
        <div className="navbar-links">
          <Link to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Accueil
          </Link>
          <Link to="/annonces"
            className={`nav-link ${isActive('/annonces') ? 'active' : ''}`}>
            Annonces
          </Link>

          {/* Liens visibles uniquement si connecté */}
          {user && (
            <>
              <Link to="/messagerie"
                className={`nav-link ${isActive('/messagerie') ? 'active' : ''}`}>
                Messages
              </Link>
              <Link to="/reservations"
                className={`nav-link ${isActive('/reservations') ? 'active' : ''}`}>
                Réservations
              </Link>
              {/* Lien Admin visible uniquement pour les admins */}
              {user.role === 'admin' && (
                <Link to="/admin"
                  className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                  ⚙ Admin
                </Link>
              )}
            </>
          )}
        </div>

        {/* ── Zone auth desktop ── */}
        <div className="navbar-auth">
          {user ? (
            // Utilisateur connecté : avatar + prénom + déconnexion
            <div className="user-menu">
              <Link to="/profil" className="user-avatar">
                <div className="avatar avatar-sm">
                  {initials}
                </div>
                <span className="user-name">{user.prenom}</span>
              </Link>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}>
                Déconnexion
              </button>
            </div>
          ) : (
            // Non connecté : boutons Connexion + S'inscrire
            <>
              <Link to="/login"
                className="btn btn-secondary btn-sm">
                Connexion
              </Link>
              <Link to="/register"
                className="btn btn-primary btn-sm">
                S'inscrire
              </Link>
            </>
          )}
        </div>

        {/* ── Burger mobile ── */}
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* ── Menu mobile ── */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/"
            onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/annonces"
            onClick={() => setMenuOpen(false)}>Annonces</Link>

          {user ? (
            <>
              <Link to="/messagerie"
                onClick={() => setMenuOpen(false)}>Messages</Link>
              <Link to="/reservations"
                onClick={() => setMenuOpen(false)}>Réservations</Link>
              <Link to="/profil"
                onClick={() => setMenuOpen(false)}>Mon profil</Link>
              {user.role === 'admin' && (
                <Link to="/admin"
                  onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <button
                className="mobile-logout"
                onClick={() => { handleLogout(); setMenuOpen(false); }}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                onClick={() => setMenuOpen(false)}>Connexion</Link>
              <Link to="/register"
                onClick={() => setMenuOpen(false)}>S'inscrire</Link>
            </>
          )}
        </div>
      )}

    </nav>
  );
}