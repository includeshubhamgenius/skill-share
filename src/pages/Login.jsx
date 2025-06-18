import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.emailVerified) {
      toast.success("Login successful!");
      navigate("/daily");
    } else {
      toast.error("Please verify your email before logging in.");
      // Optionally, you can sign out the user here
      // await signOut(auth);
    }
  } catch (err) {
    if (err.code === "auth/invalid-email") {
      toast.error("Invalid email format.");
    } else if (err.code === "auth/user-not-found") {
      toast.error("No account found with this email.");
    } else if (err.code === "auth/wrong-password") {
      toast.error("Incorrect password.");
    } else if (err.code === "auth/invalid-credential") {
      if (!email.includes("@")) {
        toast.error("Invalid email format.");
      } else {
        toast.error("Incorrect email or password.");
      }
    } else {
      toast.error("Login failed: " + err.message);
    }
  }
};

  const handleReset = async () => {
    if (!email) return alert("Enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err) {
  if (err.code === "auth/invalid-email") {
    alert("Invalid email format.");
  } else if (err.code === "auth/user-not-found") {
    alert("No account found with this email.");
  } else if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
    alert("Incorrect email or password.");
  } else {
    alert("Login failed: " + err.message);
  }
}
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-white px-4">
      <form onSubmit={handleLogin} className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to SkillStream</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded border text-black"
        />
        <div className="relative mb-4">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full p-3 rounded border pr-10 text-black"
  />
  <span
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword ? <LuEyeClosed/> : <IoMdEye/>}
  </span>
</div>

        <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Login
        </button>
        <p className="mt-3 text-blue-500 cursor-pointer text-sm text-center" onClick={handleReset}>
          Forgot Password?
        </p>
        <p className="text-sm text-gray-500 mt-4 text-center">
          New here? <Link to="/signup" className="text-blue-500">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
