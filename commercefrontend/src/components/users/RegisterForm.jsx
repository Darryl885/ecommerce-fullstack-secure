// import { useState } from "react";

// export default function RegisterForm({ onSubmit, loading }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = (e) => {
//     e.preventDefault();
//     onSubmit({ email, password });
//   };

//   return (
//     <form className="card p-4 shadow-sm" onSubmit={submit}>
//       <h3 className="mb-3 text-center">Créer un compte</h3>

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
//         {loading ? "Chargement..." : "S'inscrire"}
//       </button>
//     </form>
//   );
// }

// components/users/RegisterFormVuln.jsx
import { useState } from "react";

export default function RegisterForm({ onSubmit, loading }) {
  // VULN #2: données sensibles stockées en clair dans le state (visible React DevTools)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // VULN #3: pas de validation client / pas de limites
  // VULN #4: debug leak (affiche le password)
  const submit = (e) => {
    e.preventDefault();

    // Debug leak : très mauvais mais utile pour l'étude de cas
    console.log("[DEBUG] register payload:", { email, password });

    onSubmit({ email, password });
  };

  return (
    <form className="card p-4 shadow-sm" onSubmit={submit}>
      <h3 className="mb-3 text-center">Créer un compte (Vulnérable)</h3>

      <div className="mb-3">
        <label>Email</label>
        <input
          // VULN #3: type text au lieu de email
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // aucune validation
          required
          autoComplete="off" // pas forcément une vuln, mais anti UX, peut aider vos tests
        />
      </div>

      <div className="mb-3">
        <label>Mot de passe</label>
        <input
          type="password"
          className="form-control"
          value={password}
          // VULN #3: aucune contrainte (minLength, maxLength, pattern)
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* VULN #4: fuite volontaire dans le DOM */}
      <div className="small text-muted">
        Debug UI: {JSON.stringify({ email, password })}
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Chargement..." : "S'inscrire"}
      </button>
    </form>
  );
}

//version securisé
// import { useMemo, useState } from "react";

// export default function RegisterForm({ onSubmit, loading }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

//   const emailIsValid = useMemo(() => {
//     // validation simple (UX) — la validation finale doit rester côté backend
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   }, [email]);

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

//     // Bonne pratique : effacer le password après tentative
//     setPassword("");
//   };

//   return (
//     <form className="card p-4 shadow-sm" onSubmit={submit} noValidate>
//       <h3 className="mb-3 text-center">Créer un compte</h3>

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
//           inputMode="email"
//         />
//         {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
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
//           autoComplete="new-password"
//           minLength={8}
//           maxLength={72} // limite raisonnable pour éviter abus côté client
//         />
//         {fieldErrors.password && (
//           <div className="invalid-feedback">{fieldErrors.password}</div>
//         )}
//         <div className="form-text">
//           Minimum 8 caractères. (La validation finale est faite côté serveur.)
//         </div>
//       </div>

//       <button className="btn btn-primary w-100" disabled={loading}>
//         {loading ? "Chargement..." : "S'inscrire"}
//       </button>
//     </form>
//   );
// }