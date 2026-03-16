import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="app-wrapper">
      <Navbar />

      <main>{children}</main>

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