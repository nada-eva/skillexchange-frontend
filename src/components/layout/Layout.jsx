// Layout.jsx — Enveloppe toutes les pages avec Navbar + Footer
// Utilisation : <Layout>{children}</Layout>
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="app-wrapper">
      <Navbar />

      {/* Zone principale — contenu de la page */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">⚡ Skill<span>Exchange</span></div>
          <p>Projet réalisé par Nada Saboula · Filière Développement Digital 2025–2026</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;