import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Share2, 
  BookmarkPlus, 
  CheckCircle, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  User,
  Calendar,
  Trophy,
  Target,
  ArrowLeft,
  MessageCircle,
  Send,
  Plus,
  Home,
  Search,
  Video,
  Sun,
  Moon,
  Upload,
  Filter,
  TrendingUp,
  Users,
  ChevronUp,
  ChevronDown,
  X
} from "lucide-react";

export default function DailySkillApp() {
  const [activeTab, setActiveTab] = useState('today');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [streak, setStreak] = useState(7);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [completedSkills, setCompletedSkills] = useState({});
  const [likedContent, setLikedContent] = useState({});
  const [savedContent, setSavedContent] = useState({});
  
  const navigate = useNavigate();

  // Mock data for daily skills and user content
  const [dailySkills, setDailySkills] = useState([
    {
      id: 1,
      title: "Master the Perfect Paper Airplane",
      description: "Learn to fold a paper airplane that flies straight and far every time.",
      category: "DIY & Crafts",
      difficulty: "Beginner",
      estimatedTime: "3 minutes",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1",
      likes: 1247,
      saves: 892,
      completions: 543,
      comments: [
        { id: 1, user: "Alex", avatar: "A", text: "This is amazing! Finally got it right 🛩️", time: "2h" },
        { id: 2, user: "Sarah", avatar: "S", text: "My kids love this, thanks!", time: "4h" }
      ]
    },
    {
      id: 2,
      title: "5-Minute Morning Meditation",
      description: "Start your day with mindfulness and peace using this simple technique.",
      category: "Wellness",
      difficulty: "Beginner",
      estimatedTime: "5 minutes",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1",
      likes: 2156,
      saves: 1433,
      completions: 892,
      comments: [
        { id: 3, user: "Mike", avatar: "M", text: "So relaxing, perfect way to start the day", time: "1h" }
      ]
    }
  ]);

  const userChallenges = [
    {
      id: 101,
      user: "Emma",
      userAvatar: "E",
      title: "My paper airplane attempt!",
      description: "First try at the daily skill - it actually worked!",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1",
      likes: 234,
      comments: [
        { id: 4, user: "Tom", avatar: "T", text: "Great job! Mine didn't fly as well 😅", time: "1h" }
      ],
      skillId: 1,
      time: "3h"
    },
    {
      id: 102,
      user: "Jordan",
      userAvatar: "J",
      title: "Meditation progress day 7",
      description: "Feeling more centered each day 🧘‍♂️",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1",
      likes: 189,
      comments: [
        { id: 5, user: "Lisa", avatar: "L", text: "Inspiring! Starting my journey tomorrow", time: "30m" }
      ],
      skillId: 2,
      time: "5h"
    }
  ];

  const allContent = activeTab === 'today' ? dailySkills : 
                   activeTab === 'feed' ? userChallenges : 
                   [...dailySkills, ...userChallenges];

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

  const handleComplete = (skillId) => {
    setCompletedSkills(prev => ({ ...prev, [skillId]: true }));
    setStreak(prev => prev + 1);
    
    // Update the skill data
    setDailySkills(prev => prev.map(skill => 
      skill.id === skillId 
        ? { ...skill, completions: skill.completions + 1 }
        : skill
    ));
  };

  const handleLike = (contentId, isUserContent = false) => {
    setLikedContent(prev => ({ ...prev, [contentId]: !prev[contentId] }));
    
    if (!isUserContent) {
      setDailySkills(prev => prev.map(skill => 
        skill.id === contentId 
          ? { ...skill, likes: skill.likes + (likedContent[contentId] ? -1 : 1) }
          : skill
      ));
    }
  };

  const handleSave = (contentId) => {
    setSavedContent(prev => ({ ...prev, [contentId]: !prev[contentId] }));
    
    setDailySkills(prev => prev.map(skill => 
      skill.id === contentId 
        ? { ...skill, saves: skill.saves + (savedContent[contentId] ? -1 : 1) }
        : skill
    ));
  };

  const handleComment = () => {
    if (newComment.trim() && allContent[currentVideoIndex]) {
      const newCommentObj = {
        id: Date.now(),
        user: "You",
        avatar: "Y",
        text: newComment,
        time: "now"
      };
      
      // Add comment to the current content
      if (activeTab === 'today') {
        setDailySkills(prev => prev.map(skill => 
          skill.id === allContent[currentVideoIndex].id
            ? { ...skill, comments: [...(skill.comments || []), newCommentObj] }
            : skill
        ));
      }
      
      setNewComment('');
    }
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleShare = async (content) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: `Check out this skill: ${content.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const filters = ['all', 'DIY & Crafts', 'Wellness', 'Cooking', 'Fitness', 'Art'];

  return (
    <div className={`min-h-screen min-w-screen bg-gradient-to-br ${theme.bg} ${theme.text} overflow-hidden`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between p-4 ${theme.cardBg} backdrop-blur-xl ${theme.border} border-b sticky top-0 z-40`}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className={`w-12 h-12 ${theme.accent} rounded-full flex items-center justify-center`}>
              <Video className="w-6 h-6 text-purple-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">SkillStream</h1>
              <p className={`text-xs ${theme.textSecondary}`}>Daily Micro-Learning</p>
            </div>
          </motion.div>
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

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-2 rounded-full border border-yellow-500/30"
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-200">{streak}</span>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleProfileClick}
            className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <User className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className={`flex justify-center space-x-1 p-4 ${theme.cardBg} backdrop-blur-sm ${theme.border} border-b`}>
        {[
          { id: 'today', label: 'Today', icon: Calendar },
          { id: 'feed', label: 'Feed', icon: Users },
          { id: 'trending', label: 'Trending', icon: TrendingUp }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : `${theme.accent} ${theme.textSecondary} hover:${theme.text}`
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Filter Bar */}
      {activeTab !== 'today' && (
        <div className="flex overflow-x-auto space-x-2 p-4 pb-2">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : `${theme.accent} ${theme.textSecondary}`
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      )}

      {/* Video Feed - Responsive Layout */}
      <div className="flex-1 relative">
        <div className="h-[calc(100vh-200px)] md:h-[calc(100vh-180px)] snap-y snap-mandatory overflow-y-auto">
          {allContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
                           className="h-full snap-start relative flex-shrink-0 flex flex-col items-center justify-center p-4 space-y-4"
            >
              {/* Video Embed */}
              <div className={`aspect-video w-full max-w-2xl rounded-xl overflow-hidden shadow-lg ${theme.cardBg}`}>
                <iframe
                  src={content.videoUrl}
                  title={content.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Content Info */}
              <div className={`w-full max-w-2xl rounded-xl p-4 ${theme.cardBg} ${theme.border} border`}>
                <h2 className="text-lg font-bold">{content.title}</h2>
                <p className={`text-sm mt-1 ${theme.textSecondary}`}>{content.description}</p>

                {content.category && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                    {content.category} • {content.difficulty} • {content.estimatedTime || content.time}
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-3">
                    <button onClick={() => handleLike(content.id, activeTab !== 'today')}>
                      <Heart className={`w-5 h-5 ${likedContent[content.id] ? 'text-pink-500' : theme.textSecondary}`} />
                    </button>
                    <button onClick={() => handleSave(content.id)}>
                      <BookmarkPlus className={`w-5 h-5 ${savedContent[content.id] ? 'text-yellow-400' : theme.textSecondary}`} />
                    </button>
                    <button onClick={() => handleShare(content)}>
                      <Share2 className={`w-5 h-5 ${theme.textSecondary}`} />
                    </button>
                  </div>
                  {activeTab === 'today' && !completedSkills[content.id] && (
                    <button
                      onClick={() => handleComplete(content.id)}
                      className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark as Complete</span>
                    </button>
                  )}
                </div>

                {/* Comments */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowComments((prev) => !prev)}
                    className="flex items-center space-x-2 text-sm font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{showComments ? 'Hide' : 'Show'} Comments ({content.comments?.length || 0})</span>
                  </button>

                  {showComments && (
                    <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-1">
                      {(content.comments || []).map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                            {comment.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{comment.user} <span className={`text-xs ${theme.textSecondary}`}>· {comment.time}</span></p>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                      {/* New Comment Box */}
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write a comment..."
                          className={`flex-1 rounded-full px-3 py-1 text-sm ${theme.cardBg} ${theme.text} border ${theme.border} focus:outline-none`}
                        />
                        <button
                          onClick={handleComment}
                          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Challenge Button */}
      {activeTab === 'today' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-4 shadow-lg"
        >
          <Upload className="w-5 h-5" />
        </motion.button>
      )}

      {/* Upload Modal (Simple Version) */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className={`bg-white rounded-xl p-6 w-96 max-w-full ${theme.text}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Upload Challenge</h2>
                <button onClick={() => setShowUploadModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600">This feature is under development.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
