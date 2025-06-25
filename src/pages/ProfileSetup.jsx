import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  Video, 
  User, 
  AtSign, 
  Calendar, 
  ArrowRight, 
  Sun, 
  Moon,
  Sparkles,
  UserPlus,
  Save
} from "lucide-react";

export default function ProfileSetup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not logged in");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        dob,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      toast.success("Profile created successfully!");
      navigate("/daily");
    } catch (err) {
      toast.error("Error saving profile: " + err.message);
    } finally {
      setIsLoading(false);
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
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UserPlus className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Complete Your Profile
            </h2>
            <p className={`${theme.textSecondary}`}>Tell us a bit about yourself to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className={`w-5 h-5 ${theme.textSecondary}`} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full pl-12 pr-4 py-4 ${theme.inputBg} backdrop-blur-sm ${theme.inputBorder} border rounded-xl ${theme.text} placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all`}
              />
            </motion.div>

            {/* Username Input */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <AtSign className={`w-5 h-5 ${theme.textSecondary}`} />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                required
                className={`w-full pl-12 pr-4 py-4 ${theme.inputBg} backdrop-blur-sm ${theme.inputBorder} border rounded-xl ${theme.text} placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <span className={`text-xs ${theme.textSecondary}`}>
                  {username.length > 0 && `@${username}`}
                </span>
              </div>
            </motion.div>

            {/* Date of Birth Input */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className={`w-5 h-5 ${theme.textSecondary}`} />
              </div>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className={`w-full pl-12 pr-4 py-4 ${theme.inputBg} backdrop-blur-sm ${theme.inputBorder} border rounded-xl ${theme.text} focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
              />
            </motion.div>

            {/* Additional Info */}
            <div className={`p-4 rounded-xl ${theme.accent} ${theme.border} border`}>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Why we need this info:</p>
                  <ul className={`text-xs ${theme.textSecondary} mt-1 space-y-1`}>
                    <li>• Personalize your learning experience</li>
                    <li>• Connect with other learners</li>
                    <li>• Track your progress and achievements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Save Profile Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Profile</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Skip Option */}
            <div className="text-center pt-4">
              <p className={`${theme.textSecondary} text-sm`}>
                Want to explore first?{" "}
                <button 
                  type="button"
                  onClick={() => navigate("/daily")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline"
                >
                  Skip for now
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <div className={`px-4 py-2 ${theme.cardBg} backdrop-blur-sm rounded-full ${theme.border} border`}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}