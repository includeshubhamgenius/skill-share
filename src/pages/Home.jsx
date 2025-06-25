import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Video, 
  Play, 
  Trophy, 
  Target, 
  Users, 
  Zap, 
  BookOpen, 
  Star,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  TrendingUp,
  Award,
  Clock
} from "lucide-react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const features = [
    {
      icon: Clock,
      title: "5-Minute Daily Skills",
      description: "Learn something new every day in just minutes",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Trophy,
      title: "Build Your Streak",
      description: "Stay motivated with daily learning streaks",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Join the Community",
      description: "Share your progress and learn from others",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Unlock Achievements",
      description: "Earn badges as you master new skills",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { label: "Active Learners", value: "10K+", icon: Users },
    { label: "Skills Available", value: "500+", icon: BookOpen },
    { label: "Minutes Learned", value: "1M+", icon: Clock },
    { label: "Success Rate", value: "95%", icon: TrendingUp }
  ];

  return (
    <div className={`min-h-screen min-w-screen bg-gradient-to-br ${theme.bg} ${theme.text} overflow-hidden`}>
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              SkillStream
            </h1>
            
            <p className={`text-xl md:text-2xl ${theme.textSecondary} mb-4 max-w-3xl mx-auto leading-relaxed`}>
              Learn one fun skill per day. Minimal. No scroll. Just skill.
            </p>
            
            <p className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto`}>
              Transform your daily routine with bite-sized learning experiences designed for the modern world.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link 
              to="/login" 
              className="group relative overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl flex items-center space-x-2"
              >
                <Play className="w-6 h-6" />
                <span>Start Learning Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${theme.cardBg} backdrop-blur-xl ${theme.border} border hover:border-purple-500/50 text-purple-400 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg`}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`${theme.cardBg} backdrop-blur-xl rounded-2xl p-6 ${theme.border} border shadow-xl text-center hover:scale-105 transition-transform duration-300`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-2xl font-bold ${theme.text} mb-1`}>{stat.value}</div>
              <div className={`text-sm ${theme.textSecondary}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold ${theme.text} mb-4`}>
              Why Choose SkillStream?
            </h2>
            <p className={`text-xl ${theme.textSecondary} max-w-2xl mx-auto`}>
              Designed for busy people who want to learn efficiently and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${theme.cardBg} backdrop-blur-xl rounded-3xl p-8 ${theme.border} border shadow-2xl hover:shadow-3xl transition-all duration-300`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${theme.text} mb-4`}>{feature.title}</h3>
                <p className={`${theme.textSecondary} text-lg leading-relaxed`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className={`${theme.cardBg} backdrop-blur-xl rounded-3xl p-12 ${theme.border} border shadow-2xl text-center`}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Star className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className={`text-4xl font-bold ${theme.text} mb-6`}>
            Ready to Start Your Learning Journey?
          </h2>
          
          <p className={`text-xl ${theme.textSecondary} mb-8 max-w-2xl mx-auto`}>
            Join thousands of learners who are already building new skills, one day at a time.
          </p>
          
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-2xl"
            >
              Get Started Free
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className={`${theme.cardBg} backdrop-blur-xl ${theme.border} border-t mt-20 p-8`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`w-10 h-10 ${theme.accent} rounded-full flex items-center justify-center`}>
              <Video className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xl font-bold">SkillStream</span>
          </div>
          <p className={`${theme.textSecondary}`}>
            © 2025 SkillStream. Empowering daily learning for everyone.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}