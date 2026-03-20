import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider }         from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout      from './components/layout/Layout';
import PrivateRoute from './components/shared/PrivateRoute';
import AdminRoute   from './components/shared/AdminRoute';

import HomePage       from './pages/HomePage';
import AnnoncesPage   from './pages/AnnoncesPage';
import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import ProfilPage     from './pages/ProfilPage';
import NotFoundPage   from './pages/NotFoundPage';

const Placeholder = ({ title }) => (
  <div className="page-wrapper">
    <div className="container">
      <h1>{title} — Sprint suivant</h1>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Layout>
            <Routes>
              {/* ── Routes publiques ── */}
              <Route path="/"          element={<HomePage />}     />
              <Route path="/annonces" element={<AnnoncesPage />} />
              <Route path="/login"    element={<LoginPage />}    />
              <Route path="/register" element={<RegisterPage />} />

              {/* ── Routes protégées (connexion requise) ── */}
              <Route element={<PrivateRoute />}>
                <Route path="/profil"        element={<ProfilPage />}                           />
                <Route path="/messagerie"    element={<Placeholder title="Messagerie" />}     />
                <Route path="/reservations"  element={<Placeholder title="Réservations" />}   />
                <Route path="/notifications" element={<Placeholder title="Notifications" />}   />
              </Route>

              {/* ── Routes admin ── */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<Placeholder title="Admin" />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;