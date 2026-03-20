import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/auth.css';

export default function LoginPage() {
  const { login }  = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      addNotification('Connexion réussie ! Bienvenue 👋', 'success');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">⚡</div>
          <h1>Bon retour !</h1>
          <p>Connectez-vous à SkillExchange</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email"
              value={form.email} onChange={handleChange}
              placeholder="vous@exemple.com" required autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input className="form-input" type="password" name="password"
              value={form.password} onChange={handleChange}
              placeholder="••••••••" required />
          </div>
          {error && <div className="form-error">⚠ {error}</div>}
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter →'}
          </button>
        </form>

        <p className="auth-switch">
          Pas de compte ? <Link to="/register">S'inscrire gratuitement</Link>
        </p>
      </div>
    </div>
  );
}