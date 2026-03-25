import { useEffect, useState } from "react";
import { getProfile } from "../../api/user";
import ProfileCard from "../../components/users/ProfileCard";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getProfile(token);
        setUser(res.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <ProfileCard user={user} />
    </div>
  );
}
