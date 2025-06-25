import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
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
  UserPlus,
  CheckCircle,
  RefreshCw,
  ArrowLeft
} from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const actionCodeSettings = {
    url: `${window.location.origin}/login`,
    handleCodeInApp: false,
  };

  const disposableDomains = ["mailinator.com", "tempmail.com", "10minutemail.com"];

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

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailDomain = email.split("@")[1];
    if (disposableDomains.includes(emailDomain)) {
      toast.error("Please use a real email address.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user, actionCodeSettings);
      await signOut(auth);
      setTempUser(user);
      setIsVerificationSent(true);
      toast.success("Verification email sent! Check your inbox or spam.");
    } catch (error) {
      toast.error("Signup failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    if (!tempUser) {
      toast.error("User not available to resend.");
      return;
    }

    setIsLoading(true);
    try {
      await sendEmailVerification(tempUser, actionCodeSettings);
      toast.success("Verification email resent!");
    } catch (error) {
      toast.error("Failed to resend: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    toast("Please verify your email before logging in.");
    navigate("/login");
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
          {!isVerificationSent ? (
            <>
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
                  Join SkillStream
                </h2>
                <p className={`${theme.textSecondary}`}>Start your learning journey today</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
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
                    placeholder="Password (min. 6 characters)"
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

                {/* Sign Up Button */}
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
                      <UserPlus className="w-5 h-5" />
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className={`${theme.textSecondary} text-sm`}>
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </>
          ) : (
            /* Verification Screen */
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Check Your Email
                </h2>
                <p className={`${theme.textSecondary} mb-2`}>
                  We've sent a verification link to
                </p>
                <p className="font-semibold text-purple-400 mb-4">{email}</p>
                <p className={`text-sm ${theme.textSecondary} mb-6`}>
                  Please check your inbox (and spam folder) before signing in.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resendVerificationEmail}
                  disabled={isLoading}
                  className={`w-full ${theme.accent} backdrop-blur-sm ${theme.border} border hover:border-purple-500/50 text-purple-400 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      <span>Resend Email</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoToLogin}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Continue to Login</span>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}