import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";
import { toast } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const navigate = useNavigate();

  const actionCodeSettings = {
    url: `${window.location.origin}/login`, // 🔁 Redirect to login page after email verified
    handleCodeInApp: false,
  };

  const disposableDomains = ["mailinator.com", "tempmail.com", "10minutemail.com"];

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailDomain = email.split("@")[1];
    if (disposableDomains.includes(emailDomain)) {
      toast.error("Please use a real email address.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user, actionCodeSettings);
      await signOut(auth); // 🔒 Logout to enforce verification
      setTempUser(user);
      setIsVerificationSent(true);
      toast.success("Verification email sent! Check your inbox or spam.");
    } catch (error) {
      toast.error("Signup failed: " + error.message);
    }
  };

  const resendVerificationEmail = async () => {
    if (!tempUser) return toast.error("User not available to resend.");

    try {
      await sendEmailVerification(tempUser, actionCodeSettings);
      toast.success("Verification email resent!");
    } catch (error) {
      toast.error("Failed to resend: " + error.message);
    }
  };

  const handleGoToLogin = () => {
    toast("Please verify your email before logging in.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-white px-4">
      <form onSubmit={handleSignup} className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isVerificationSent ? "Verify your Email" : "Create your SkillStream account"}
        </h2>

        {!isVerificationSent ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 text-black p-3 rounded border"
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-black p-3 rounded border pr-10"
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
          </>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              A verification link has been sent to <strong>{email}</strong>.
              <br />
              Please check your inbox or spam before logging in.
            </p>
            <button
              type="button"
              onClick={resendVerificationEmail}
              className="text-blue-500 text-sm underline"
            >
              Didn't get it? Resend Email
            </button>
            <button
              type="button"
              onClick={handleGoToLogin}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        )}

        {!isVerificationSent && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        )}
      </form>
    </div>
  );
}
