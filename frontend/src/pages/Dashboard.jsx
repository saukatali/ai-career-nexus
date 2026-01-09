import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain,
  Target,
  FileText,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  Home,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard overview data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/dashboard/overview');
        
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
          setError(null);
        } else {
          console.error('Failed to fetch dashboard data');
          setError('Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Use API data or fallback to default
  const userName = dashboardData?.user_name || 'Bug Buster';
  const userTitle = dashboardData?.user_title || 'Software Engineer';
  const careerLevel = dashboardData?.career_level || 'Mid-Senior';
  const careerScore = dashboardData?.career_score || { overall_score: 92 };
  const progressTasks = dashboardData?.progress_tasks || [];
  const aiRecommendations = dashboardData?.ai_recommendations || [];
  const stats = dashboardData?.stats || { total_skills: 0, completed_tasks: 0, job_matches: 0, network_connections: 0 };

  const aiScoreData = [
    { name: 'Score', value: careerScore.overall_score, fill: 'url(#scoreGradient)' }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="flex h-screen relative">
        {/* Enhanced Sidebar with Glow */}
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-80 bg-dark-800 border-r border-white/10 relative z-20"
        >
          <div className="p-6 relative z-10">
            {/* Premium Logo */}
            <div className="flex items-center space-x-3 mb-12">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-neon-blue rounded-xl flex items-center justify-center"
              >
                <Brain className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold text-neon-blue">
                  AI Career Nexus
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] text-cyan-400 font-semibold tracking-wider">PREMIUM</span>
                </div>
              </div>
            </div>

            {/* Enhanced User Profile Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-700 rounded-2xl p-6 mb-8 border border-white/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-neon-blue flex items-center justify-center text-2xl font-bold">
                  {loading ? '...' : userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{loading ? 'Loading...' : userName}</h3>
                  <p className="text-sm text-gray-400">{loading ? '...' : userTitle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Career Level</span>
                <span className="text-cyan-400 font-semibold">
                  {loading ? '...' : careerLevel}
                </span>
              </div>
            </motion.div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <NavItem 
                icon={<Home className="w-5 h-5" />} 
                label="Overview" 
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
              />
              <NavItem 
                icon={<Target className="w-5 h-5" />} 
                label="Skill Matcher" 
                onClick={() => navigate('/skill-matcher')}
              />
              <NavItem 
                icon={<FileText className="w-5 h-5" />} 
                label="Resume Analyzer" 
                onClick={() => navigate('/resume-analyzer')}
              />
              <NavItem 
                icon={<MessageSquare className="w-5 h-5" />} 
                label="AI Coach" 
                onClick={() => navigate('/ai-coach')}
              />
              <NavItem 
                icon={<BarChart3 className="w-5 h-5" />} 
                label="Skill Gap" 
                onClick={() => navigate('/skill-gap')}
              />
            </nav>

            <div className="mt-auto pt-8 space-y-2">
              <NavItem 
                icon={<User className="w-5 h-5" />} 
                label="Profile" 
                onClick={() => navigate('/profile')}
              />
              <NavItem 
                icon={<Settings className="w-5 h-5" />} 
                label="Settings" 
                onClick={() => navigate('/settings')}
              />
              <NavItem 
                icon={<LogOut className="w-5 h-5" />} 
                label="Logout" 
                onClick={() => setShowLogoutModal(true)}
              />
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative z-10">
          <div className="p-8">
            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 glass-morph rounded-xl border border-neon-pink/50 flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-neon-pink" />
                <div>
                  <p className="text-neon-pink font-semibold">Failed to load dashboard data</p>
                  <p className="text-sm text-gray-400">Using cached data. Please check your connection.</p>
                </div>
              </motion.div>
            )}

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{loading ? 'Loading...' : userName}</span>! 🚀
              </h1>
              <p className="text-gray-400">Here's your AI-powered career dashboard</p>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-20"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400">Loading your dashboard...</p>
                </div>
              </motion.div>
            )}

            {/* Dashboard Content */}
            {!loading && (
              <>
                {/* Career Progress */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-morph-strong rounded-3xl p-8 border border-white/10 mb-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Career Progress</h3>
                    <Award className="w-6 h-6 text-neon-yellow" />
                  </div>
                  <div className="space-y-4">
                    {progressTasks.length > 0 ? (
                      progressTasks.map((task, index) => (
                        <ProgressItem 
                          key={index}
                          icon={
                            task.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-neon-green" /> :
                            task.status === 'in-progress' ? <Clock className="w-5 h-5 text-neon-blue" /> :
                            <Star className="w-5 h-5 text-neon-purple" />
                          }
                          title={task.task_name}
                          subtitle={task.last_updated}
                          progress={task.progress}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No progress tasks available</p>
                    )}
                  </div>
                </motion.div>

                {/* Recommendations Carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-bold mb-6">AI Recommendations for You</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {aiRecommendations.length > 0 ? (
                      aiRecommendations.slice(0, 3).map((rec, index) => (
                        <RecommendationCard
                          key={index}
                          icon={
                            rec.priority === 'high' ? <Brain className="w-8 h-8" /> :
                            rec.priority === 'medium' ? <Target className="w-8 h-8" /> :
                            <MessageSquare className="w-8 h-8" />
                          }
                          title={rec.title}
                          description={rec.description}
                          gradient={
                            index === 0 ? "from-neon-blue to-neon-purple" :
                            index === 1 ? "from-neon-purple to-neon-pink" :
                            "from-neon-pink to-neon-green"
                          }
                          action={rec.action}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 col-span-3 text-center py-8">No recommendations available</p>
                    )}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <QuickActionCard
                      icon={<Target />}
                      title="Find Jobs"
                      onClick={() => navigate('/skill-matcher')}
                    />
                    <QuickActionCard
                      icon={<FileText />}
                      title="Scan Resume"
                      onClick={() => navigate('/resume-analyzer')}
                    />
                    <QuickActionCard
                      icon={<MessageSquare />}
                      title="AI Chat"
                      onClick={() => navigate('/ai-coach')}
                    />
                    <QuickActionCard
                      icon={<BarChart3 />}
                      title="View Analytics"
                      onClick={() => navigate('/skill-gap')}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="backdrop-blur-xl bg-gradient-to-br from-white/[0.15] to-white/[0.08] rounded-2xl p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,217,255,0.2)] max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,217,255,0.4)]">
                <LogOut className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Logout Confirmation</h3>
              <p className="text-gray-400 mb-8">Are you sure you want to logout?</p>
              
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/login')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all"
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Components
const NavItem = ({ icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ x: 8, scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-neon-blue text-dark-900 shadow-lg shadow-neon-blue/50' 
        : 'text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-md'
    }`}
  >
    <motion.div
      animate={active ? { rotate: [0, 5, -5, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <span className="font-medium">{label}</span>
    {active && (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="ml-auto"
      >
        <ChevronRight className="w-4 h-4" />
      </motion.div>
    )}
  </motion.button>
);

const ScoreBar = ({ label, value, color }) => {
  const colorMap = {
    blue: 'bg-neon-blue',
    purple: 'bg-neon-purple',
    pink: 'bg-neon-pink',
    green: 'bg-neon-green',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full ${colorMap[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

const SkillWheel = () => (
  <svg className="w-full h-full" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="skillGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D9FF" />
        <stop offset="100%" stopColor="#B026FF" />
      </linearGradient>
    </defs>
    <motion.circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="url(#skillGrad1)"
      strokeWidth="8"
      strokeDasharray="502"
      initial={{ strokeDashoffset: 502 }}
      animate={{ strokeDashoffset: 0, rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <circle cx="100" cy="100" r="60" fill="rgba(0, 217, 255, 0.1)" />
  </svg>
);

const SkillTag = ({ label, level, color }) => (
  <div className="flex items-center justify-between px-4 py-2 glass-morph rounded-lg">
    <span className="text-sm font-medium">{label}</span>
    <span className={`text-sm font-bold neon-text-${color}`}>{level}%</span>
  </div>
);

const ProgressItem = ({ icon, title, subtitle, progress }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
      </div>
      <span className="text-sm font-bold">{progress}%</span>
    </div>
    <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-neon-gradient rounded-full"
      />
    </div>
  </div>
);

const RecommendationCard = ({ icon, title, description, gradient, action }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-morph-strong rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all cursor-pointer"
  >
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-sm text-gray-400 mb-4">{description}</p>
    <button className="flex items-center space-x-2 text-neon-blue font-semibold group">
      <span>{action}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

const QuickActionCard = ({ icon, title, onClick }) => (
  <motion.button
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="glass-morph-strong rounded-2xl p-6 border border-white/10 hover:border-neon-blue/50 transition-all flex flex-col items-center space-y-3"
  >
    <div className="w-12 h-12 rounded-xl bg-neon-gradient flex items-center justify-center">
      {React.cloneElement(icon, { className: 'w-6 h-6' })}
    </div>
    <span className="font-semibold">{title}</span>
  </motion.button>
);

export default Dashboard;
