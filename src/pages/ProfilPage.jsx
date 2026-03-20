import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ProfilPage() {
  const { user, updateUser,logout } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [editing, setEditing]  = useState(false);
  const [loading, setLoading]  = useState(false);
  const [form, setForm] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    bio: user?.bio || '',
    competences: (user?.competences || []).join(', '),
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const competences = form.competences
        .split(',').map(s => s.trim()).filter(Boolean);

      const { data } = await api.put(`/users/${user._id}`, {...form, competences });
      updateUser(data.user); // update context + localStorage
      addNotification('Profil mis à jour !', 'success');
      setEditing(false);
    } catch (err) {
      addNotification('Erreur lors de la mise à jour', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Supprimer définitivement votre compte ?')) return;
    try {
      await api.delete(`/users/${user._id}`);
      logout();
      addNotification('Compte supprimé', 'info');
      navigate('/');
    } catch {
      addNotification('Erreur lors de la suppression', 'error');
    }
  };

  if (!user) return null;

  const initials = `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '800px' }}>

        <div className="card" style={{ marginBottom: '1rem' }}>
          <div style={{ display:'flex', gap:'1.25rem', alignItems:'flex-start', flexWrap:'wrap' }}>
            <div className="avatar avatar-lg">{initials}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
                <div>
                  <h1 style={{ fontSize:'1.4rem', fontWeight:'800' }}>
                    {user.prenom} {user.nom}
                  </h1>
                  <p style={{ color:'var(--text3)', fontSize:'.875rem' }}>{user.email}</p>
                  {user.role === 'admin' && <span className="badge badge-admin">Admin</span>}
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(!editing)}>
                  {editing ? 'Annuler' : '✏ Modifier'}
                </button>
              </div>

              {/* Form modif */}
              {editing ? (
                <div style={{ marginTop:'1rem' }}>
                  <div className="form-grid-2" style={{ marginBottom:'12px' }}>
                    <div className="form-group">
                      <label className="form-label">Prénom</label>
                      <input className="form-input" value={form.prenom}
                        onChange={e => setForm(p => ({...p, prenom:e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nom</label>
                      <input className="form-input" value={form.nom}
                        onChange={e => setForm(p => ({...p, nom:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea className="form-textarea" rows={2}
                      value={form.bio} placeholder="Parlez de vous..."
                      onChange={e => setForm(p => ({...p, bio:e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Compétences (séparées par virgules)</label>
                    <input className="form-input"
                      value={form.competences} placeholder="React, Guitare, Anglais..."
                      onChange={e => setForm(p => ({...p, competences:e.target.value}))} />
                  </div>
                  <div style={{ display:'flex', gap:'8px' }}>
                    <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                      {loading ? 'Sauvegarde...' : 'Enregistrer'}
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditing(false)}>Annuler</button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop:'1rem' }}>
                  <p style={{ color:'var(--text2)', fontSize:'.9rem', marginBottom:'10px' }}>
                    {user.bio || 'Aucune bio. Cliquez sur Modifier pour en ajouter une.'}
                  </p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {(user.competences || []).map(c => (
                      <span key={c} className="chip chip-purple">✦ {c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {{/* Zone de danger */}}
        <div className="danger-zone">
          <h3 style={{ color:'var(--red)', marginBottom:'6px' }}>Zone de danger</h3>
          <p style={{ fontSize:'.8rem', color:'var(--text2)', marginBottom:'12px' }}>
            La suppression est définitive et irréversible.
          </p>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Supprimer mon compte
          </button>
        </div>

      </div>
    </div>
  );
}