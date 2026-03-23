import { useState, useEffect } from 'react';
import { Link, useNavigate }  from 'react-router-dom';
import { getAnnonces }         from '../services/annonceService';
import AnnonceCard             from '../components/annonces/AnnonceCard';
import '../components/annonces/AnnonceCard.css';
import { useAuth }             from '../context/AuthContext';

const CATEGORIES = [
  {icon:'💻',label:'Informatique'},{icon:'🎵',label:'Musique'},
  {icon:'🌍',label:'Langues'},    {icon:'🎨',label:'Art'},
  {icon:'🍳',label:'Gastronomie'},{icon:'📸',label:'Photographie'},
  {icon:'💪',label:'Sport'},      {icon:'📚',label:'Académique'},
];

export default function HomePage() {
  const { user }    = useAuth();
  const navigate   = useNavigate();
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    getAnnonces({ limit: 6 })
      .then(({ data }) => setAnnonces(data.annonces))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{minHeight:'88vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'4rem 2rem',textAlign:'center'}}>
        <div style={{maxWidth:'720px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'var(--purple-bg)',border:'1px solid var(--purple-border)',borderRadius:'999px',padding:'4px 14px',fontSize:'11.5px',color:'var(--purple-light)',fontWeight:'600',marginBottom:'1.25rem'}}>
            ✦ Échangez des compétences gratuitement
          </div>
          <h1 style={{fontSize:'clamp(2.2rem,5vw,3.8rem)',fontWeight:'800',letterSpacing:'-.03em',lineHeight:'1.1',marginBottom:'1rem'}}>
            Apprenez plus.

            <span style={{background:'linear-gradient(135deg,#7c3aed,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Partagez plus.</span>
          </h1>
          <p style={{fontSize:'1.05rem',color:'var(--text2)',lineHeight:'1.75',maxWidth:'500px',margin:'0 auto 2rem'}}>
            SkillExchange connecte des personnes qui souhaitent apprendre et partager. Tu enseignes ce que tu sais, tu apprends ce dont tu as besoin.
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/annonces" className="btn btn-primary btn-lg">Explorer les annonces →</Link>
            {!user && <Link to="/register" className="btn btn-secondary btn-lg">Créer un compte</Link>}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{padding:'2rem 2rem',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div className="container grid-4">
          {[{v:'1 200+',l:'Membres actifs'},{v:'3 800+',l:'Échanges réalisés'},{v:'150+',l:'Compétences'},{v:'4.8★',l:'Note moyenne'}].map(s => (
            <div key={s.l} style={{textAlign:'center'}}>
              <div style={{fontSize:'1.75rem',fontWeight:'800',color:'var(--purple-light)'}}>{s.v}</div>
              <div style={{fontSize:'12px',color:'var(--text3)',marginTop:'3px'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section style={{padding:'3rem 2rem'}}>
        <div className="container">
          <h2 style={{textAlign:'center',marginBottom:'1.5rem',fontSize:'1.5rem',fontWeight:'800'}}>Explorer par catégorie</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:'10px'}}>
            {CATEGORIES.map(c => (
              <div key={c.label} className="card card-hover"
                style={{textAlign:'center',padding:'14px'}}
                onClick={() => navigate(`/annonces?categorie=${c.label}`)}>
                <div style={{fontSize:'1.75rem',marginBottom:'6px'}}>{c.icon}</div>
                <div style={{fontSize:'12px',fontWeight:'600'}}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANNONCES RÉCENTES ── */}
      {annonces.length > 0 && (
        <section style={{padding:'3rem 2rem'}}>
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">Annonces récentes</h2>
                <p  className="section-sub">Dernières opportunités d'échange</p>
              </div>
              <Link to="/annonces" className="btn btn-secondary btn-sm">Voir tout →</Link>
            </div>
            <div className="grid-3">
              {annonces.map(a => <AnnonceCard key={a._id} annonce={a} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}