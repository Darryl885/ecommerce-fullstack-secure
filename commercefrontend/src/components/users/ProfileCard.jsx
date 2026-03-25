import { FaIdBadge, FaEnvelope, FaUserShield, FaCalendarAlt } from "react-icons/fa";

export default function ProfileCard({ user }) {
  // Génération automatique d'une initiale si le backend ne renvoie pas de "name"
  const initial = user.name
    ? user.name.charAt(0).toUpperCase()
    : user.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="card p-4 shadow-sm text-center">

      {/* Avatar avec initiales */}
      <div
        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3"
        style={{
          width: "100px",
          height: "100px",
          fontSize: "2rem",
          margin: "0 auto",
        }}
      >
        {initial}
      </div>

      <h4 className="mb-3">Mon Profil</h4>

      <p>
        <FaIdBadge className="me-2 text-primary" />
        <strong>ID :</strong> {user.id}
      </p>

      <p>
        <FaEnvelope className="me-2 text-success" />
        <strong>Email :</strong> {user.email}
      </p>

      <p>
        <FaUserShield className="me-2 text-warning" />
        <strong>Rôle :</strong> {user.role}
      </p>

      <p>
        <FaCalendarAlt className="me-2 text-info" />
        <strong>Créé le :</strong>{" "}
        {user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "N/A"}
      </p>
    </div>
  );
}
