import { useState } from "react";

import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";
import { toast } from 'react-hot-toast';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

 const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send verification email
    await sendEmailVerification(user);

    toast.success("Signup successful! Please check your email to verify your account.");

    // Optionally, you can sign out the user here so they can't proceed without verification
    // await signOut(auth);
  } catch (error) {
    toast.error("Signup failed: " + error.message);
  }
};

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-white px-4">
      <form onSubmit={handleSignup} className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your SkillStream account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded border"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border pr-10"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <LuEyeClosed /> : <IoMdEye />}
          </span>
        </div>
        <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Sign Up
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}
