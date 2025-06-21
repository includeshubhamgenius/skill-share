import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function DailySkill() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      else setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative">
      
      {/* Profile Button at Top-Right */}
      <div className="absolute top-4 right-4">
        <Link
          to="/profile"
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm"
        >
          Profile
        </Link>
      </div>

      <h1 className="text-3xl font-semibold mb-4">🎯 Today's Micro-Skill</h1>
      <iframe
        className="w-full max-w-xl aspect-video rounded-lg shadow-md"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Skill Video"
        frameBorder="0"
        allowFullScreen
      />
      <p className="mt-6 text-gray-600">Try it today! Come back tomorrow for a new one.</p>
    </div>
  );
}
