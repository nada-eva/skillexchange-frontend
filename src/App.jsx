// App.jsx — Composant racine + configuration du Router
// C'est ici qu'on définit toutes les routes de l'application
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout global (Navbar + Footer) — Sprint 1
import Layout from './components/layout/Layout';

// Pages — on les créera progressivement
// Pour l'instant on crée des pages vides (placeholders)
import HomePage       from './pages/HomePage';
import AnnoncesPage   from './pages/AnnoncesPage';
import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import NotFoundPage   from './pages/NotFoundPage';

function App() {
  return (
    // BrowserRouter : gère la navigation avec l'URL du navigateur
    <BrowserRouter>
      // Layout : enveloppe toutes les pages avec Navbar + Footer
      <Layout>
        <Routes>
          // Routes publiques (accessibles sans connexion)
          <Route path="/"          element={<HomePage />}     />
          <Route path="/annonces" element={<AnnoncesPage />} />
          <Route path="/login"    element={<LoginPage />}    />
          <Route path="/register" element={<RegisterPage />} />

          // 404 — toute URL inconnue
          <Route path="*"          element={<NotFoundPage />}  />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;