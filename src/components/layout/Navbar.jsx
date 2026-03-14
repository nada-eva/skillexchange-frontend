// Navbar.jsx — Barre de navigation fixe en haut de page
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const location  = useLocation();   // URL actuelle
  const navigate  = useNavigate();   // fonction de navigation
  const [menuOpen, setMenuOpen] = useState(false);

  // Récupérer l'utilisateur depuis localStorage (sera remplacé par AuthContext en Sprint 2)
  const user = null; // TODO Sprint 2 : remplacer par useAuth()

  // Vérifier si un lien est actif (pour le style)
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        // Logo — clic renvoie à l'accueil
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">
            Skill<span className="logo-accent">Exchange</span>
          </span>
        </Link>

        // Liens de navigation — desktop
        <div className="navbar-links">
          <Link to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Accueil
          </Link>
          <Link to="/annonces"
            className={`nav-link ${isActive('/annonces') ? 'active' : ''}`}>
            Annonces
          </Link>
          {/* Sprint 2 : ajouter Messagerie, Profil, etc. quand user connecté */}
        </div>

        // Boutons Auth — desktop
        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <div className="avatar avatar-sm">
                {user.prenom?.[0]}{user.nom?.[0]}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login"    className="btn btn-secondary btn-sm">Connexion</Link>
              <Link to="/register" className="btn btn-primary btn-sm">S'inscrire</Link>
            </>
          )}
        </div>

        // Bouton burger — mobile
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      // Menu mobile
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/"         onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/annonces" onClick={() => setMenuOpen(false)}>Annonces</Link>
          <Link to="/login"    onClick={() => setMenuOpen(false)}>Connexion</Link>
          <Link to="/register"onClick={() => setMenuOpen(false)}>S'inscrire</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;