// import { Link } from "react-router-dom";
// import RegisterForm from "../../components/users/RegisterForm";
// import useRegister from "../../hooks/useRegister";

// export default function RegisterPage() {
//   const { loading, error, success, handleRegister } = useRegister();

//   return (
//     <div className="container mt-5" style={{ maxWidth: "500px" }}>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       <RegisterForm onSubmit={handleRegister} loading={loading} />

//       {/* 🔽 Ajout du lien vers LoginPage */}
//       <p className="mt-3 text-center">
//         Déjà inscrit ?{" "}
//         <Link to="/login" className="text-primary fw-bold">
//           Se connecter
//         </Link>
//       </p>
//     </div>
//   );
// }
// pages/users/RegisterPageVuln.jsx
import { Link } from "react-router-dom";
import RegisterFormVuln from "../../components/users/RegisterForm";
import useRegisterVuln from "../../hooks/useRegister";

export default function RegisterPageVuln() {
  const { loading, error, success, handleRegister } = useRegisterVuln();

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      {/* VULN #1: XSS possible si `error` contient du HTML/JS */}
      {error && (
        <div
          className="alert alert-danger"
          dangerouslySetInnerHTML={{ __html: error }}
        />
      )}

      {/* VULN #1 bis: idem pour success */}
      {success && (
        <div
          className="alert alert-success"
          dangerouslySetInnerHTML={{ __html: success }}
        />
      )}

      <RegisterFormVuln onSubmit={handleRegister} loading={loading} />

      <p className="mt-3 text-center">
        Déjà inscrit ?{" "}
        <Link to="/login" className="text-primary fw-bold">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

// version securisé 
 // pages/users/RegisterPage.jsx
// import { Link } from "react-router-dom";
// import RegisterForm from "../../components/users/RegisterForm";
// import useRegister from "../../hooks/useRegister";

// export default function RegisterPage() {
//   const { loading, error, success, handleRegister } = useRegister();

//   return (
//     <div className="container mt-5" style={{ maxWidth: "500px" }}>
//       {/* React échappe automatiquement le texte → protège contre XSS */}
//       {error && <div className="alert alert-danger" role="alert">{error}</div>}
//       {success && <div className="alert alert-success" role="alert">{success}</div>}

//       <RegisterForm onSubmit={handleRegister} loading={loading} />

//       <p className="mt-3 text-center">
//         Déjà inscrit ?{" "}
//         <Link to="/login" className="text-primary fw-bold">
//           Se connecter
//         </Link>
//       </p>
//     </div>
//   );
// }