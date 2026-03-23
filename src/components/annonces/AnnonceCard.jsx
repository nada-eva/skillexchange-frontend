import { useNavigate } from 'react-router-dom';
import { useAuth }     from '../../context/AuthContext';
import { deleteAnnonce } from '../../services/annonceService';
import { useNotification } from '../../context/NotificationContext';
import './AnnonceCard.css';

export default function AnnonceCard({ annonce, onDelete }) {
  const navigate  = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();

  // Initiales de l'auteur pour l'avatar
  const auteur = annonce.userId;
  const initials = auteur ? `${auteur.prenom?.[0] || ''}${auteur.nom?.[0] || ''}`: '?';

  // L'utilisateur peut supprimer ses propres annonces (ou admin)
  const canDelete = user && (
    user._id === annonce.userId?._id || user.role === 'admin'
  );

  const handleDelete = async (e) => {
    e.stopPropagation(); // empêche la navigation au clic
    if (!confirm('Supprimer cette annonce ?')) return;
    try {
      await deleteAnnonce(annonce._id);
      addNotification('Annonce supprimée', 'success');
      if (onDelete) onDelete(annonce._id); 
    } catch {
      addNotification('Erreur lors de la suppression', 'error');
    }
  };

  return (
    <div className="annonce-card" onClick={() => navigate(`/annonces/${annonce._id}`)}>

      {/* En-tête : type + note */}
      <div className="annonce-card-top">
        <span className={`tag tag-${annonce.type}`}> {annonce.type === 'offre' ? '✦ Offre' : '◈ Demande'} </span>
        {annonce.rating > 0 && (
          <span className="annonce-rating">★ {annonce.rating.toFixed(1)}</span>
        )}
      </div>

      {/* Titre + description */}
      <h3 className="annonce-titre">{annonce.titre}</h3>
      <p className="annonce-desc">{annonce.description}</p>

      {/* Chips : compétence + niveau + dispo */}
      <div className="annonce-chips">
        <span className="chip">📚 {annonce.competence}</span>
        {annonce.niveauRequis && <span className="chip">🎯 {annonce.niveauRequis}</span>}
        {annonce.disponibilite && <span className="chip">🕐 {annonce.disponibilite}</span>}
      </div>

      {/* En échange */}
      {annonce.enEchange && (
        <div className="annonce-echange">
          🔄 En échange : {annonce.enEchange}
        </div>
      )}

      {/* Footer : auteur + actions */}
      <div className="annonce-footer">
        <div className="annonce-auteur">
          <div className="avatar avatar-xs">{initials}</div>
          <span>{auteur ? `${auteur.prenom} ${auteur.nom}` : 'Anonyme'}</span>
        </div>
        {canDelete && (
          <button
            className="btn-delete-annonce"
            onClick={handleDelete}
            title="Supprimer">
            🗑
          </button>
        )}
      </div>
    </div>
  );
}