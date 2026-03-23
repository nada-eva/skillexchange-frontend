import { useState, useEffect, useCallback } from 'react';
import { useAuth }  from '../context/AuthContext';
import { useNotification }  from '../context/NotificationContext';
import { getAnnonces, createAnnonce } from '../services/annonceService';
import AnnonceCard  from '../components/annonces/AnnonceCard';
import '../components/annonces/AnnonceCard.css';

const CATEGORIES = [
  'Toutes', 'Informatique', 'Musique', 'Langues', 'Art',
  'Gastronomie', 'Photographie', 'Sport', 'Académique', 'Autre',
];
const FORM_INIT = {
  titre: '', description: '', competence: '',
  categorie: 'Informatique', type: 'offre',
  niveauRequis: 'Tous niveaux', disponibilite: '', enEchange: '',
};

export default function AnnoncesPage() {
  const { user } = useAuth();
  const { addNotification } = useNotification();

  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState(FORM_INIT);
  const [pagination,  setPagination] = useState({});

  const [search, setSearch] = useState('');
  const [typeFilter,setTypeFilter] = useState('');
  const [catFilter, setCatFilter]  = useState('Toutes');

  //  Charger annonces 
  const loadAnnonces = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) 
        params.search = search;
      if (typeFilter)
        params.type = typeFilter;
      if (catFilter && catFilter !== 'Toutes')
        params.categorie = catFilter;

      //au lieu de : const response = await getAnnonces(params);
      //const data = response.data;
      const { data } = await getAnnonces(params);
      setAnnonces(data.annonces);
      setPagination(data.pagination);
    } catch {
      addNotification('Erreur lors du chargement', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, catFilter]);

  //quand les filtres changent
  useEffect(() => {
    const timer = setTimeout(loadAnnonces, 400); // debounce 400ms
    return () => clearTimeout(timer);
  }, [loadAnnonces]);

  // Publier une annonce
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const { data } = await createAnnonce(form);
      setAnnonces(prev => [data.annonce, ...prev]); // ajouter en tête
      setForm(FORM_INIT);
      setShowForm(false);
      addNotification('Annonce publiée avec succès ! 🎉', 'success');
    } catch (err) {
      addNotification(err.response?.data?.message || 'Erreur', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = (id) =>
    setAnnonces(prev => prev.filter(a => a._id !== id));

  const handleChange = (e) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* En-tête */}
        <div className="section-header">
          <div>
            <h1 className="section-title">Annonces</h1>
            <p  className="section-sub">
              {pagination.total || 0} annonce{(pagination.total || 0) > 1 ? 's' : ''} disponible{(pagination.total || 0) > 1 ? 's' : ''}
            </p>
          </div>
          {user && (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}>
              {showForm ? '✕ Fermer' : '+ Publier une annonce'}
            </button>
          )}
        </div>

        {/* Formulaire de publication */}
        {showForm && (
          <div className="card" style={{marginBottom:'1.5rem',borderColor:'rgba(124,58,237,.3)'}}>
            <h2 style={{fontSize:'1rem',fontWeight:'700',marginBottom:'1rem'}}>✦ Nouvelle annonce</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-3" style={{marginBottom:'12px'}}>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="type" value={form.type} onChange={handleChange}>
                    <option value="offre">Offre de compétence</option>
                    <option value="demande">Demande de compétence</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Titre</label>
                  <input className="form-input" name="titre" value={form.titre} onChange={handleChange} placeholder="Ex: Cours de guitare" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Compétence</label>
                  <input className="form-input" name="competence" value={form.competence} onChange={handleChange} placeholder="Guitare acoustique" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select className="form-select" name="categorie" value={form.categorie} onChange={handleChange}>
                    {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Niveau requis</label>
                  <select className="form-select" name="niveauRequis" value={form.niveauRequis} onChange={handleChange}>
                    {['Tous niveaux','Débutant','Intermédiaire','Avancé'].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Disponibilité</label>
                  <input className="form-input" name="disponibilite" value={form.disponibilite} onChange={handleChange} placeholder="Ex: Weekends" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" name="description" rows={3} value={form.description} onChange={handleChange} placeholder="Décrivez votre compétence, méthode..." required />
              </div>
              <div className="form-group">
                <label className="form-label">En échange de (optionnel)</label>
                <input className="form-input" name="enEchange" value={form.enEchange} onChange={handleChange} placeholder="Ex: Cours de cuisine, sport..." />
              </div>
              <div style={{display:'flex',gap:'8px'}}>
                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                  {formLoading ? 'Publication...' : 'Publier l\'annonce'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
              </div>
            </form>
          </div>
        )}

        {/* Filtres */}
        <div className="card" style={{marginBottom:'1.5rem',padding:'14px 16px'}}>
          <div style={{display:'flex',gap:'10px',marginBottom:'12px',flexWrap:'wrap'}}>
            <input
              className="form-input"
              placeholder="🔍  Rechercher une compétence..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{flex:1,minWidth:'200px'}}
            />
            <select
              className="form-select"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              style={{width:'auto'}}>
              <option value="">Offres & Demandes</option>
              <option value="offre">Offres uniquement</option>
              <option value="demande">Demandes uniquement</option>
            </select>
          </div>
          <div className="pills">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`pill ${catFilter === c ? 'active' : ''}`}
                onClick={() => setCatFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grille d'annonces */}
        {loading ? (
          <div className="loading-container"><div className="spinner"></div><p>Chargement...</p></div>
        ) : annonces.length === 0 ? (
          <div className="loading-container">
            <p style={{fontSize:'3rem'}}>🔍</p>
            <p>Aucune annonce ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid-auto">
            {annonces.map(annonce => (
              <AnnonceCard
                key={annonce._id}
                annonce={annonce}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}