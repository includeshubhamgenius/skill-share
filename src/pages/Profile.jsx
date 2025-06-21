import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Case: no user
    if (!loading && !user) {
      console.log("User not logged in. Redirecting...");
      navigate("/login");
    }

    const fetchProfile = async () => {
      try {
        if (user) {
          console.log("Fetching profile for UID:", user.uid);
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Profile found:", docSnap.data());
            setProfile(docSnap.data());
          } else {
            console.log("No profile document found.");
            setProfile({ name: "No name", username: "No username" }); // fallback
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    if (user && !loading) {
      fetchProfile();
    }
  }, [user, loading, navigate]);

  if (loading || profileLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-gray-600">@{profile.username}</p>
        <p className="text-gray-500">{user?.email}</p>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            View Streaks
          </button>
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            onClick={() => auth.signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
