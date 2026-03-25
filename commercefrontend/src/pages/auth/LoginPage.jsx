// import { Link } from "react-router-dom";
// import LoginForm from "../../components/users/LoginForm";
// import useLogin from "../../hooks/useLogin";

// export default function LoginPage() {
//   const { loading, error, success, handleLogin } = useLogin();

//   return (
//     <div className="container mt-5" style={{ maxWidth: "500px" }}>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       {loading && (
//         <div className="text-center mb-3">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Chargement...</span>
//           </div>
//           <p>Redirection en cours...</p>
//         </div>
//       )}

//       <LoginForm onSubmit={handleLogin} loading={loading} />

//       {/* 🔽 Lien vers RegisterPage */}
//       <p className="mt-3 text-center">
//         Pas encore de compte ?{" "}
//         <Link to="/register" className="text-primary fw-bold">
//           Créer un compte
//         </Link>
//       </p>
//     </div>
//   );
// }

// pages/users/LoginPageVuln.jsx
import { Link } from "react-router-dom";
import LoginForm from "../../components/users/LoginForm";
import useLogin from "../../hooks/useLogin";

export default function LoginPage() {
  const { loading, error, success, handleLogin } = useLogin();

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      {/*  VULN XSS: erreur rendue comme HTML */}
      {error && (
        <div
          className="alert alert-danger"
          dangerouslySetInnerHTML={{ __html: error }}
        />
      )}

      {/*  VULN XSS: success rendue comme HTML */}
      {success && (
        <div
          className="alert alert-success"
          dangerouslySetInnerHTML={{ __html: success }}
        />
      )}

      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p>Redirection en cours...</p>
        </div>
      )}

      <LoginForm onSubmit={handleLogin} loading={loading} />

      <p className="mt-3 text-center">
        Pas encore de compte ?{" "}
        <Link to="/register" className="text-primary fw-bold">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}


// version securisé

// import { Link } from "react-router-dom";
// import LoginForm from "../../components/users/LoginForm";
// import useLogin from "../../hooks/useLogin";

// export default function LoginPage() {
//   const { loading, error, success, handleLogin } = useLogin();

//   return (
//     <div className="container mt-5" style={{ maxWidth: "500px" }}>
//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="alert alert-success" role="alert">
//           {success}
//         </div>
//       )}

//       {loading && (
//         <div className="text-center mb-3">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Chargement...</span>
//           </div>
//           <p>Connexion en cours...</p>
//         </div>
//       )}

//       <LoginForm onSubmit={handleLogin} loading={loading} />

//       <p className="mt-3 text-center">
//         Pas encore de compte ?{" "}
//         <Link to="/register" className="text-primary fw-bold">
//           Créer un compte
//         </Link>
//       </p>
//     </div>
//   );
// }

// Objectifs :
// Pas de dangerouslySetInnerHTML
// React échappe le texte automatiquement