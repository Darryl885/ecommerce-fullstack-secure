import { useEffect, useState } from "react";
import { getProfile } from "../api/user";

export default function useProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getProfile();
        setUser(res.user);
      } catch (err) {
        setError(err.response?.data?.error || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { loading, user, error };
}
