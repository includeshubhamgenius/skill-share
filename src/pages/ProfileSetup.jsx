import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProfileSetup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) return toast.error("Not logged in");

      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        dob,
        email: user.email,
      });

      toast.success("Profile created successfully!");
      navigate("/daily");
    } catch (err) {
      toast.error("Error saving profile: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded border text-black"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded border text-black"
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded border text-black"
        />
        <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Save Profile
        </button>
      </form>
    </div>
  );
}
