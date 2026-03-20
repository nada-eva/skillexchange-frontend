import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/auth.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '', confirm: ''});
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      return setError('Les mots de passe ne correspondent pas');
    }
    if (form.password.length < 6) {
      return setError('Le mot de passe doit faire au moins 6 caractères');
    }

    setLoading(true);

    try {
      await register({
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        password: form.password,
      });
      addNotification('Compte créé avec succès ! Bienvenue 🎉', 'success');
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-icon">🚀</div>
          <h1>Rejoindre la communauté</h1>
          <p>Créez votre compte gratuit</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Prénom</label>
              <input className="form-input" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Nada" required />
            </div>
            <div className="form-group">
              <label className="form-label">Nom</label>
              <input className="form-input" name="nom" value={form.nom} onChange={handleChange} placeholder="Saboula" required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Adresse email</label>
            <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="nada@exemple.com" required />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 caractères" required />
          </div>

          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <input className="form-input" type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="••••••••" required />
          </div>

          {error && <div className="form-error">⚠ {error}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="auth-switch">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}