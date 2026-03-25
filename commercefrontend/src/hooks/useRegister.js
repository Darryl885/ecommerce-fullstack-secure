// import { useState } from "react";
// import { registerUser } from "../api/user";

// export default function useRegister() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleRegister = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const res = await registerUser(formData);

//       setSuccess(res.message || "Inscription réussie !");
//     } catch (err) {
//       setError(err.response?.data?.error || "Erreur inconnue");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     error,
//     success,
//     handleRegister,
//   };

// hooks/useRegisterVuln.js
import { useState } from "react";
import { registerUser } from "../api/user";

export default function useRegister () {
  const [loading, setLoading] = useState(false);

  // VULN #1: on va afficher `error`/`success` comme HTML côté page
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // VULN #2: stockage local de données sensibles (mauvaise pratique)
      // Utile pour démontrer l'impact en cas de XSS (lecture localStorage)
      localStorage.setItem("lastRegisterEmail", formData.email);
      localStorage.setItem("lastRegisterPassword", formData.password);

      const res = await registerUser(formData);

      // VULN #1: si res.message est manipulable, XSS au rendu
      setSuccess(res.message || "Inscription réussie !");
    } catch (err) {
      // VULN #1: message d'erreur très verbeux + potentiellement HTML
      // Utile en étude de cas si backend renvoie des erreurs “riches”
      const raw =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Erreur inconnue";

      // Optionnel pour démonstration (si vous voulez un XSS même sans backend):
      // setError(`<img src=x onerror="alert('XSS via error')">`);

      setError(raw);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleRegister };
}


// hooks/useRegister.js version securisé

// import { useState } from "react";
// import { registerUser } from "../api/user";

// export default function useRegister() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");     // texte uniquement
//   const [success, setSuccess] = useState(""); // texte uniquement

//   const handleRegister = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       // Aucune persistance locale de données sensibles
//       const res = await registerUser({
//         email: formData.email,
//         password: formData.password,
//       });

//       // On force un message texte (défensif)
//       setSuccess(typeof res?.message === "string" ? res.message : "Inscription réussie !");
//     } catch (err) {
//       // Éviter d'afficher des détails techniques bruts
//       const status = err?.response?.status;

//       if (status === 400) {
//         setError("Données invalides. Vérifiez email/mot de passe.");
//       } else if (status === 409) {
//         setError("Cet email est déjà utilisé.");
//       } else {
//         setError("Erreur lors de l'inscription. Réessayez plus tard.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, success, handleRegister };
// }