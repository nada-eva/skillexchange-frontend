import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnnonceById } from '../services/annonceService';
import { useAuth } from '../context/AuthContext';

export default function AnnonceDetailPage() {
  const { id }  = useParams();  
  const navigate  = useNavigate();
  const { user } = useAuth();

  const [annonce, setAnnonce]  = useState(null);
  const [loading, setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getAnnonceById(id);
        setAnnonce(data.annonce);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (notFound) return (
    <div className="page-wrapper"><div className="container loading-container">
      <p style={{fontSize:'3rem'}}>😕</p>
      <p>Annonce introuvable.</p>
      <button className="btn btn-secondary" onClick={() => navigate('/annonces')}>← Retour</button>
    </div></div>
  );

  const auteur  = annonce.userId;
  const initials = auteur ? `${auteur.prenom?.[0]}${auteur.nom?.[0]}` : '?';

  return (
    <div className="page-wrapper">
      <div className="container">

        <button className="btn btn-secondary btn-sm"
          onClick={() => navigate('/annonces')}
          style={{marginBottom:'1.5rem'}}>← Retour aux annonces</button>

        <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:'1.5rem',alignItems:'start'}}>

          {/* Colonne principale */}
          <div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'12px'}}>
              <span className={`tag tag-${annonce.type}`}>{annonce.type === 'offre' ? '✦ Offre' : '◈ Demande'}</span>
              <span className="chip">📚 {annonce.categorie}</span>
              {annonce.rating > 0 && <span style={{color:'var(--amber)',fontWeight:'700'}}>★ {annonce.rating.toFixed(1)}/5</span>}
            </div>
            <h1 style={{fontSize:'1.75rem',fontWeight:'800',letterSpacing:'-.02em',marginBottom:'1rem'}}>
              {annonce.titre}
            </h1>
            <div className="card" style={{marginBottom:'1rem'}}>
              <p style={{fontSize:'10.5px',color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.07em',fontWeight:'600',marginBottom:'8px'}}>Description</p>
              <p style={{fontSize:'13.5px',lineHeight:'1.85'}}>{annonce.description}</p>
            </div>
            <div className="grid-4" style={{marginBottom:'1rem'}}>
              {[
                { icon:'🎯', label:'Compétence', value:annonce.competence },
                { icon:'📊', label:'Niveau',      value:annonce.niveauRequis },
                { icon:'🕐', label:'Disponibilité',value:annonce.disponibilite || 'Non précisé' },
                { icon:'📅', label:'Publié le',   value:new Date(annonce.createdAt).toLocaleDateString('fr-FR') },
              ].map((item) => (
                <div key={item.label} className="card-sm" style={{textAlign:'center'}}>
                  <div style={{fontSize:'1.25rem',marginBottom:'4px'}}>{item.icon}</div>
                  <div style={{fontSize:'10px',color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em'}}>{item.label}</div>
                  <div style={{fontSize:'12.5px',fontWeight:'700',marginTop:'2px'}}>{item.value}</div>
                </div>
              ))}
            </div>
            {annonce.enEchange && (
              <div className="card" style={{borderColor:'rgba(124,58,237,.3)'}}>
                <p style={{color:'var(--purple-light)'}}>🔄 <strong>En échange de :</strong> {annonce.enEchange}</p>
              </div>
            )}
          </div>

          {/* Sidebar auteur */}
          <div>
            <div className="card" style={{textAlign:'center',padding:'20px'}}>
              <div className="avatar avatar-lg" style={{margin:'0 auto 12px'}}>{initials}</div>
              <p style={{fontWeight:'700',fontSize:'15px'}}>{auteur ? `${auteur.prenom} ${auteur.nom}` : 'Anonyme'}</p>
              {auteur?.rating > 0 && <p style={{color:'var(--amber)',margin:'6px 0'}}>★ {auteur.rating} / 5</p>}
              <hr style={{border:'none',borderTop:'1px solid var(--border)',margin:'12px 0'}} />
              {user && user._id !== auteur?._id ? (
                <Link
                  to="/messagerie"
                  className="btn btn-primary btn-full"
                  style={{marginBottom:'8px'}}>
                  💬 Contacter
                </Link>
              ) : !user && (
                <Link to="/login" className="btn btn-primary btn-full">
                  Se connecter pour contacter
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}