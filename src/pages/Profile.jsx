import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Trophy, 
  Target, 
  Calendar, 
  Settings, 
  Crown, 
  Zap, 
  BookOpen, 
  Star,
  ArrowLeft,
  LogOut,
  Sun,
  Moon,
  Edit3,
  Share2,
  Award
} from "lucide-react";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [streak, setStreak] = useState(7);
  const [completedSkills, setCompletedSkills] = useState(12);
  const [totalWatchTime, setTotalWatchTime] = useState(145);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const themeColors = {
    dark: {
      bg: 'from-purple-900 via-blue-900 to-indigo-900',
      cardBg: 'bg-black/40',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-white/20',
      accent: 'bg-white/10'
    },
    light: {
      bg: 'from-blue-50 via-purple-50 to-pink-50',
      cardBg: 'bg-white/80',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'bg-gray-100'
    }
  };

  const theme = isDarkMode ? themeColors.dark : themeColors.light;

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first skill", icon: Star, earned: true },
    { id: 2, title: "Week Warrior", description: "7-day streak", icon: Trophy, earned: true },
    { id: 3, title: "Skill Master", description: "Complete 10 skills", icon: Crown, earned: true },
    { id: 4, title: "Lightning Learner", description: "Complete 3 skills in one day", icon: Zap, earned: false },
    { id: 5, title: "Knowledge Seeker", description: "50 skills completed", icon: BookOpen, earned: false },
    { id: 6, title: "Champion", description: "30-day streak", icon: Award, earned: false }
  ];

  const stats = [
    { label: "Day Streak", value: streak, icon: Trophy, color: "from-yellow-500 to-orange-500" },
    { label: "Skills Completed", value: completedSkills, icon: Target, color: "from-green-500 to-emerald-500" },
    { label: "Watch Time", value: `${totalWatchTime}m`, icon: Calendar, color: "from-blue-500 to-purple-500" },
    { label: "Achievements", value: achievements.filter(a => a.earned).length, icon: Crown, color: "from-pink-500 to-rose-500" }
  ];

  if (loading || profileLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex items-center justify-center`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen min-w-screen bg-gradient-to-br ${theme.bg} ${theme.text}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between p-4 ${theme.cardBg} backdrop-blur-xl ${theme.border} border-b sticky top-0 z-40`}
      >
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className={`w-12 h-12 ${theme.accent} rounded-full flex items-center justify-center`}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <p className={`text-sm ${theme.textSecondary}`}>Your learning journey</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-12 ${theme.accent} rounded-full flex items-center justify-center`}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowEditModal(true)}
            className={`w-12 h-12 ${theme.accent} rounded-full flex items-center justify-center`}
          >
            <Edit3 className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${theme.cardBg} backdrop-blur-xl rounded-3xl p-8 ${theme.border} border shadow-2xl`}
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-500 p-1"
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center border-4 border-white/20"
              >
                <Crown className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className={`text-3xl font-bold ${theme.text}`}>{profile?.name || "User"}</h2>
              <p className={`text-lg ${theme.textSecondary}`}>@{profile?.username || "username"}</p>
              <p className={`${theme.textSecondary}`}>{user?.email}</p>
            </div>

            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-200">{streak} Day Streak</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme.cardBg} backdrop-blur-xl rounded-2xl p-6 ${theme.border} border shadow-lg text-center`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-2xl font-bold ${theme.text} mb-1`}>{stat.value}</div>
              <div className={`text-sm ${theme.textSecondary}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`${theme.cardBg} backdrop-blur-xl rounded-3xl p-8 ${theme.border} border shadow-2xl`}
        >
          <h3 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center`}>
            <Award className="w-8 h-8 mr-3 text-yellow-400" />
            Achievements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border transition-all ${
                  achievement.earned 
                    ? `bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30` 
                    : `${theme.accent} ${theme.border}`
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : theme.accent
                  }`}>
                    <achievement.icon className={`w-5 h-5 ${achievement.earned ? 'text-white' : theme.textSecondary}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.earned ? 'text-green-400' : theme.text}`}>
                      {achievement.title}
                    </h4>
                  </div>
                </div>
                <p className={`text-sm ${theme.textSecondary}`}>{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
          >
            <Share2 className="w-6 h-6" />
            <span>Share Profile</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
          >
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}