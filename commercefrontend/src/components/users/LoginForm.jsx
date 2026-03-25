// import { useState } from "react";

// export default function LoginForm({ onSubmit, loading }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = (e) => {
//     e.preventDefault();
//     onSubmit({ email, password });
//   };

//   return (
//     <form className="card p-4 shadow-sm" onSubmit={submit}>
//       <h3 className="mb-3 text-center">Connexion</h3>

//       <div className="mb-3">
//         <label>Email</label>
//         <input
//           type="email"
//           className="form-control"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Mot de passe</label>
//         <input
//           type="password"
//           className="form-control"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       <button className="btn btn-primary w-100" disabled={loading}>
//         {loading ? "Connexion..." : "Se connecter"}
//       </button>
//     </form>
//   );
// }
// components/users/LoginFormVuln.jsx
import { useState } from "react";

export default function LoginFormVuln({ onSubmit, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    //  VULN: fuite de secrets dans les logs
    console.log("[DEBUG] Login payload:", { email, password });

    onSubmit({ email, password });
  };

  return (
    <form className="card p-4 shadow-sm" onSubmit={submit}>
      <h3 className="mb-3 text-center">Connexion (Vulnérable)</h3>

      <div className="mb-3">
        <label>Email</label>
        <input
          //  VULN: type text → pas de validation navigateur
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
        />
      </div>

      <div className="mb-3">
        <label>Mot de passe</label>
        <input
          type="password"
          className="form-control"
          value={password}
          //  VULN: aucune contrainte minLength/maxLength/pattern
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/*  VULN: fuite volontaire dans le DOM */}
      <div className="small text-muted">
        Debug UI: {JSON.stringify({ email, password })}
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}

// version securisé 

// import { useMemo, useState } from "react";

// export default function LoginForm({ onSubmit, loading }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

//   const emailIsValid = useMemo(
//     () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
//     [email]
//   );

//   const validate = () => {
//     const next = { email: "", password: "" };

//     if (!email) next.email = "Email requis.";
//     else if (!emailIsValid) next.email = "Email invalide.";

//     if (!password) next.password = "Mot de passe requis.";
//     else if (password.length < 8) next.password = "8 caractères minimum.";

//     setFieldErrors(next);
//     return !next.email && !next.password;
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     if (!validate()) return;

//     await onSubmit({ email: email.trim(), password });

     // réduire l'exposition du secret en mémoire/UI
//     setPassword("");
//   };

//   return (
//     <form className="card p-4 shadow-sm" onSubmit={submit} noValidate>
//       <h3 className="mb-3 text-center">Connexion</h3>

//       <div className="mb-3">
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           disabled={loading}
//           autoComplete="email"
//         />
//         {fieldErrors.email && (
//           <div className="invalid-feedback">{fieldErrors.email}</div>
//         )}
//       </div>

//       <div className="mb-3">
//         <label htmlFor="password">Mot de passe</label>
//         <input
//           id="password"
//           type="password"
//           className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           disabled={loading}
//           autoComplete="current-password"
//           minLength={8}
//           maxLength={72}
//         />
//         {fieldErrors.password && (
//           <div className="invalid-feedback">{fieldErrors.password}</div>
//         )}
//       </div>

//       <button className="btn btn-primary w-100" disabled={loading}>
//         {loading ? "Connexion..." : "Se connecter"}
//       </button>
//     </form>
//   );
// }


// Objectifs :

// Validation client minimale (UX)
// Pas de debug (console/DOM)
// Empêcher double submit
// Effacer le password après tentative