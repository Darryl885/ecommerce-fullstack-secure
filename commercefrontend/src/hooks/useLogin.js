// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/user";
// import { UserContext } from "../context/UserContext"; // <-- import du contexte global

// export default function useLogin() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [token, setToken] = useState(null);

//   const navigate = useNavigate();

//   const { setUser } = useContext(UserContext); // <-- récupération de la fonction pour mettre à jour le user

//   const handleLogin = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const res = await loginUser(formData);

//       setSuccess(res.message || "Connexion réussie !");
//       setToken(res.token);

      // Stockage des infos dans localStorage
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user", JSON.stringify(res.user)); // <-- stockage du user DANS localStorage à la connexion
//       localStorage.setItem("role", res.user.role); // le backend renvoie res.user.role
       // <--- contrôle d'accès depuis le front pour accéder aux ressources nécessaires

       // Mise à jour immédiate du user dans le contexte → Navbar se met à jour instantanément
//       setUser(res.user);

       // Afficher le spinner pendant 2 secondes avant redirection
//       setTimeout(() => {
//         navigate("/"); // redirection vers la HomePage après login
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.error || "Erreur inconnue");
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     error,
//     success,
//     token,
//     handleLogin,
//   };
// }


// hooks/useLoginVuln.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user";
import { UserContext } from "../context/UserContext";

export default function useLoginVuln() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");     
  const [success, setSuccess] = useState(""); 
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await loginUser(formData);

      //  IMPORTANT: adapter au backend vuln (token/user dans res.data)
      const tokenFromApi = res?.data?.token;
      const userFromApi = res?.data?.user;

      setToken(tokenFromApi);

      // VULN conservée : localStorage lisible par JS
      if (typeof tokenFromApi === "string") localStorage.setItem("token", tokenFromApi);

      //  VULN conservée : user stocké en localStorage
      if (userFromApi && typeof userFromApi === "object") {
        localStorage.setItem("user", JSON.stringify(userFromApi));
        localStorage.setItem("role", userFromApi.role || "user");
        setUser(userFromApi);
      }

      //  VULN  : message potentiellement HTML
      setSuccess(res?.message || "Login OK");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setLoading(false);

      const raw =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Erreur inconnue";

      //  VULN : erreur brute potentiellement HTML
      setError(raw);
    }
  };

  return { loading, error, success, token, handleLogin };
}


// version securisé
// src/hooks/useLogin.js
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/user";
// import { UserContext } from "../context/UserContext";

// export default function useLogin() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");     // texte only
//   const [success, setSuccess] = useState(""); // texte only

   // Optionnel: token en mémoire (éviter localStorage)
//   const [token, setToken] = useState(null);

//   const navigate = useNavigate();
//   const { setUser } = useContext(UserContext);

//   const handleLogin = async (formData) => {
//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const res = await loginUser(formData);

//       // ✅ Aligné avec TON backend vuln
//       const tokenFromApi = res?.data?.token ?? null;
//       const userFromApi = res?.data?.user ?? null;

//       // On garde token uniquement en mémoire (toujours mieux que localStorage)
//       if (typeof tokenFromApi === "string" && tokenFromApi.length > 0) {
//         setToken(tokenFromApi);
//       } else {
//         setToken(null);
//       }

//       if (userFromApi && typeof userFromApi === "object") {
//         setUser(userFromApi);
//       } else {
//         setUser(null);
//       }

//       setSuccess("Connexion réussie !");
//       navigate("/");
//     } catch (err) {
//       // Ne pas afficher les détails renvoyés par le backend vuln (stack, etc.)
//       const status = err?.response?.status;

//       if (status === 401) setError("Identifiants invalides.");
//       else if (status === 400) setError("Données invalides.");
//       else setError("Erreur de connexion. Réessayez plus tard.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, success, token, handleLogin };
// }

// Objectifs :

// Ne pas stocker token/user/role dans localStorage (sinon XSS ⇒ vol session)
// Lire le format réel du backend (res.data.token, res.data.user)
// Message d’erreur générique (ne pas exposer stack/infos)
// Mise à jour du contexte setUser avec user renvoyé serveur
// Redirection directe (tu peux garder un spinner si tu veux)