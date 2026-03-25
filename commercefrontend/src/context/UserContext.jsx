// // src/context/UserContext.jsx

// // On importe createContext pour créer un contexte global,
// // et useState pour gérer l'état utilisateur.
// import { createContext, useState } from "react";

// // Création du contexte utilisateur.
// // Ce contexte servira à partager les infos du user dans toute l'application.
// export const UserContext = createContext();

// // Composant Provider qui englobe l'application.
// // Il fournit l'état "user" et la fonction "setUser" à tous les composants enfants.
// export const UserProvider = ({ children }) => {
//   // Initialisation de l'état "user".
//   // On essaie de récupérer l'utilisateur depuis le localStorage (si déjà connecté),
//   // sinon on met "null".
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );
//   // On retourne le Provider du contexte.
//   // Tous les composants enfants auront accès à { user, setUser } via useContext(UserContext).
//  return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// src/context/UserContext.jsx
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

function safeJsonParse(value, fallback = null) {
  if (typeof value !== "string" || value.trim() === "") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    const parsed = safeJsonParse(raw, null);

    // Si la clé existe mais n'est pas un JSON valide, on nettoie pour éviter
    // un crash à chaque refresh (tout en gardant la logique vulnérable localStorage)
    if (raw && parsed === null) {
      localStorage.removeItem("user");
      // Optionnel : garder role/token pour démontrer la vuln Broken Access Control,
      // ou nettoyer tout si tu veux revenir à un état propre :
      // localStorage.removeItem("role");
      // localStorage.removeItem("token");
    }

    setUser(parsed);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// version sécurisé

// src/context/UserContext.jsx
// import { createContext, useState } from "react";

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
   //  Secure: pas de localStorage => pas de JSON.parse crash, pas de session volable via XSS
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


// version actuelle lit localStorage directement et
//  peut crash si corrompu. En secure, on évite localStorage comme source d’autorité.





// securisé nouvelle version
// src/context/UserContext.js
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifySession = async () => {
//       const token = localStorage.getItem("token"); // On ne stocke que le token, pas l'objet user
      
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // 🛡️ Étape CRUCIALE : On demande au serveur qui est le propriétaire du token
//         // Le serveur validera le JWT et renverra les vraies données (id, email, role)
//         const response = await axios.get("http://localhost:3001/api/users/me", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Session invalide ou expirée");
//         localStorage.removeItem("token");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifySession();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, loading }}>
//       {!loading && children} 
//     </UserContext.Provider>
//   );
// };