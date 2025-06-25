import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { 
  Video, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sun, 
  Moon,
  Sparkles,
  LogIn
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const themeColors = {
    dark: {
      bg: 'from-purple-900 via-blue-900 to-indigo-900',
      cardBg: 'bg-black/40',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-white/20',
      accent: 'bg-white/10',
      inputBg: 'bg-white/10',
      inputBorder: 'border-white/20'
    },
    light: {
      bg: 'from-blue-50 via-purple-50 to-pink-50',
      cardBg: 'bg-white/80',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'bg-gray-100',
      inputBg: 'bg-white/50',
      inputBorder: 'border-gray-200'
    }
  };

  const theme = isDarkMode ? themeColors.dark : themeColors.light;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);
        toast.error("Please verify your email before logging in.");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        toast.success("Login successful!");
        navigate("/daily");
      } else {
        toast.success("Welcome! Let's complete your profile.");
        navigate("/ProfileSetup");
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }
    
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else {
        toast.error("Reset failed: " + err.message);
      }
    }
  };

  return (
    <div className={`min-h-screen min-w-screen bg-gradient-to-br ${theme.bg} ${theme.text} overflow-hidden relative`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between p-6 ${theme.cardBg} backdrop-blur-xl ${theme.border} border-b relative z-10`}
      >
        <Link to="/" className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className={`w-12 h-12 ${theme.accent} rounded-full flex items-center justify-center`}>
              <Video className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SkillStream</h1>
              <p className={`text-sm ${theme.textSecondary}`}>Daily Micro-Learning</p>
            </div>
          </motion.div>
        </Link>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-12 h-12 ${theme.accent} rounded-full flex items-center justify-center`}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </motion.header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={`${theme.cardBg} backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-md w-full ${theme.border} border`}
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className={`${theme.textSecondary}`}>Continue your learning journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className={`w-5 h-5 ${theme.textSecondary}`} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-12 pr-4 py-4 ${theme.inputBg} backdrop-blur-sm ${theme.inputBorder} border rounded-xl ${theme.text} placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className={`w-5 h-5 ${theme.textSecondary}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full pl-12 pr-12 py-4 ${theme.inputBg} backdrop-blur-sm ${theme.inputBorder} border rounded-xl ${theme.text} placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? 
                  <EyeOff className={`w-5 h-5 ${theme.textSecondary} hover:${theme.text} transition-colors`} /> : 
                  <Eye className={`w-5 h-5 ${theme.textSecondary} hover:${theme.text} transition-colors`} />
                }
              </button>
            </motion.div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleReset}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className={`${theme.textSecondary} text-sm`}>
                New to SkillStream?{" "}
                <Link 
                  to="/signup" 
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}