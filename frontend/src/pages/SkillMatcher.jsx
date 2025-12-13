import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGemini from '../hooks/useGemini';
import {
  ArrowLeft,
  Plus,
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  MapPin,
  Briefcase,
  Clock,
  Users,
  Award,
  Target,
  CheckCircle2,
  Star,
  Send,
  Upload,
  Mail,
  Phone,
  User,
  FileText,
  Zap
} from 'lucide-react';

const SkillMatcher = () => {
  const navigate = useNavigate();
  const { callGemini, loading: aiLoading } = useGemini();
  const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js']);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [jobMatches, setJobMatches] = useState([]);
  const [matchError, setMatchError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [desiredRole, setDesiredRole] = useState('Software Engineer');
  const [location, setLocation] = useState('');

  const suggestedSkills = [
    'Python', 'TypeScript', 'AWS', 'Docker', 'MongoDB',
    'GraphQL', 'Vue.js', 'Angular', 'Kubernetes', 'Redis',
    'PostgreSQL', 'Git', 'CI/CD', 'Machine Learning', 'TensorFlow'
  ];

  // Fetch trending skills from API
  useEffect(() => {
    const fetchTrendingSkills = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/skill-matcher/trending-skills');
        if (response.ok) {
          const data = await response.json();
          setTrendingSkills(data);
        } else {
          console.error('Failed to fetch trending skills');
          // Fallback to default skills
          setTrendingSkills(['TypeScript', 'Next.js', 'Docker', 'Kubernetes', 'GraphQL']);
        }
      } catch (error) {
        console.error('Error fetching trending skills:', error);
        // Fallback to default skills
        setTrendingSkills(['TypeScript', 'Next.js', 'Docker', 'Kubernetes', 'GraphQL']);
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrendingSkills();
  }, []);

  const handleAddSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setMatchError(null);
    setAiRecommendations(null);
    
    try {
      // Fetch job matches from backend
      const response = await fetch('http://localhost:8000/api/skill-matcher/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          skills: skills,
          desired_role: desiredRole,
          location: location
        })
      });

      if (response.ok) {
        const data = await response.json();
        const transformedMatches = data.map((job, index) => ({
          id: index + 1,
          title: job.job_title,
          company: job.company,
          location: job.location,
          type: 'Full-time',
          salary: job.salary_range,
          match: job.match_percentage,
          skills: job.required_skills,
          matchedSkills: job.matched_skills,
          missingSkills: job.missing_skills,
          posted: '2 days ago',
          applicants: Math.floor(Math.random() * 150) + 20
        }));
        
        setJobMatches(transformedMatches);
        setShowResults(true);
      } else {
        const errorData = await response.text();
        console.error('Failed to fetch job matches:', errorData);
        setMatchError('Failed to fetch job matches. Using AI recommendations instead.');
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      
      // Check for quota/rate limit errors
      if (error.message?.includes('quota') || error.message?.includes('exceeded')) {
        setMatchError('⚠️ AI quota exceeded. Showing static recommendations instead.');
      } else {
        setMatchError('Using static AI recommendations.');
      }
      
      setShowResults(true);
    } finally {
      setAnalyzing(false);
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return 'neon-green';
    if (match >= 80) return 'neon-blue';
    if (match >= 70) return 'neon-purple';
    return 'neon-pink';
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neon-blue opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-neon-purple opacity-10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/dashboard')}
              className="w-12 h-12 glass-morph rounded-xl flex items-center justify-center hover:border-neon-blue/50 border border-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-4xl font-bold text-neon-blue">Skill-to-Job Matching</h1>
              <p className="text-gray-400 mt-1">AI-powered career opportunities tailored for you</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 glass-morph rounded-full">
            <Sparkles className="w-4 h-4 text-neon-yellow animate-pulse" />
            <span className="text-sm">AI Analysis Active</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Skill Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-morph-strong rounded-3xl p-8 border border-white/10 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Target className="w-6 h-6 text-neon-blue" />
                <h2 className="text-2xl font-bold">Your Skills</h2>
              </div>

              {/* Desired Role Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Desired Role</label>
                <input
                  type="text"
                  value={desiredRole}
                  onChange={(e) => setDesiredRole(e.target.value)}
                  placeholder="e.g., Senior Full Stack Developer"
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
              </div>

              {/* Skill Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSkill(inputValue);
                    }
                  }}
                  placeholder="Type a skill..."
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddSkill(inputValue)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 glass-morph-strong rounded-xl border border-white/10 max-h-60 overflow-y-auto z-50"
                    >
                      <div className="p-2 space-y-1">
                        {suggestedSkills
                          .filter(s => s.toLowerCase().includes(inputValue.toLowerCase()) && !skills.includes(s))
                          .map(skill => (
                            <button
                              key={skill}
                              onClick={() => handleAddSkill(skill)}
                              className="w-full px-4 py-2 text-left rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
                            >
                              <span>{skill}</span>
                              <Sparkles className="w-4 h-4 text-neon-blue" />
                            </button>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* AI Suggestions */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-neon-purple" />
                  <span className="text-sm text-gray-400">AI Suggested</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.slice(0, 6).map(skill => (
                    !skills.includes(skill) && (
                      <motion.button
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddSkill(skill)}
                        className="px-3 py-1.5 glass-morph rounded-lg text-sm border border-neon-purple/30 hover:border-neon-purple/60 transition-colors"
                      >
                        {skill}
                      </motion.button>
                    )
                  ))}
                </div>
              </div>

              {/* Trending Skills from API */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-neon-green" />
                  <span className="text-sm text-gray-400">Trending Skills</span>
                  {loadingTrending && (
                    <div className="w-3 h-3 border border-neon-green border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                {loadingTrending ? (
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-8 w-20 glass-morph rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {trendingSkills.map(skill => (
                      !skills.includes(skill) && (
                        <motion.button
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddSkill(skill)}
                          className="px-3 py-1.5 glass-morph rounded-lg text-sm border border-neon-green/30 hover:border-neon-green/60 transition-colors flex items-center space-x-1.5"
                        >
                          <TrendingUp className="w-3 h-3 text-neon-green" />
                          <span>{skill}</span>
                        </motion.button>
                      )
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Skills */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">
                  Selected Skills ({skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <SkillChip key={skill} skill={skill} onRemove={handleRemoveSkill} />
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={skills.length === 0 || analyzing}
                className="w-full py-4 bg-neon-blue text-dark-900 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Find Matching Jobs'
                )}
              </motion.button>

              {/* Error Message */}
              {matchError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 glass-morph rounded-xl border border-neon-pink/50 flex items-center space-x-2"
                >
                  <X className="w-4 h-4 text-neon-pink" />
                  <span className="text-sm text-neon-pink">{matchError}</span>
                </motion.div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="glass-morph rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold neon-text-blue">{skills.length}</div>
                  <div className="text-xs text-gray-500">Skills Added</div>
                </div>
                <div className="glass-morph rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold neon-text-purple">
                    {showResults ? jobMatches.length : '---'}
                  </div>
                  <div className="text-xs text-gray-500">Job Matches</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Job Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-morph-strong rounded-3xl p-12 border border-white/10 flex flex-col items-center justify-center min-h-[600px]"
                >
                  <div className="w-32 h-32 bg-neon-gradient opacity-20 rounded-full blur-2xl mb-8"></div>
                  <Target className="w-16 h-16 text-gray-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-500 mb-2">Add Your Skills</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Start by adding your skills to get AI-powered job recommendations
                    tailored specifically for you
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* AI Recommendations */}
                  {aiRecommendations && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-morph-strong rounded-3xl p-8 border border-neon-green/30 mb-6"
                    >
                      {aiLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-neon-green"></div>
                          <p className="ml-4 text-gray-400">Generating insights...</p>
                        </div>
                      ) : (
                        <div className="prose prose-invert max-w-none">
                          <div className="bg-dark-800/50 rounded-xl p-6 whitespace-pre-wrap">
                            {aiRecommendations}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {jobMatches.length > 0 ? (
                        <>
                          <span className="gradient-text">{jobMatches.length} Perfect Matches</span> Found
                        </>
                      ) : (
                        <span className="text-gray-400">{jobMatches.length} Found</span>
                      )}
                    </h2>
                    <div className="flex items-center space-x-2 px-4 py-2 glass-morph rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-neon-green" />
                      <span className="text-sm">AI Verified</span>
                    </div>
                  </div>

                  {/* Job Cards */}
                  {jobMatches.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} getMatchColor={getMatchColor} onApply={handleApplyNow} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedJob && (
          <ApplicationFormModal 
            job={selectedJob} 
            onClose={() => setShowApplicationForm(false)} 
            userSkills={skills}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Skill Chip Component
const SkillChip = ({ skill, onRemove }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-2 px-3 py-2 bg-neon-blue text-dark-900 rounded-lg"
  >
    <span className="text-sm font-semibold">{skill}</span>
    <button
      onClick={() => onRemove(skill)}
      className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
    >
      <X className="w-3 h-3" />
    </button>
  </motion.div>
);

// Job Card Component
const JobCard = ({ job, index, getMatchColor, onApply }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="glass-morph-strong rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
            <div className="flex items-center space-x-2 text-gray-400">
              <Briefcase className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
          </div>
          {/* Match Percentage */}
          <div className={`px-4 py-2 glass-morph rounded-xl border-2 border-${getMatchColor(job.match)}/50`}>
            <div className={`text-3xl font-bold neon-text-${getMatchColor(job.match)}`}>
              {job.match}%
            </div>
            <div className="text-xs text-gray-500 text-center">Match</div>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-4 mt-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>{job.applicants} applicants</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Award className="w-4 h-4" />
            <span>{job.posted}</span>
          </div>
        </div>

        {/* Salary Prediction Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Salary Range</span>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-neon-green" />
              <span className="font-bold neon-text-green">{job.salary}</span>
            </div>
          </div>
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${job.match}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="h-full bg-neon-green rounded-full"
            />
          </div>
        </div>

        {/* Required Skills with Match Indicators */}
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Required Skills</div>
          <div className="flex flex-wrap gap-2">
            {job.matchedSkills && job.matchedSkills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 glass-morph rounded-lg text-xs font-medium border border-neon-green/50 flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3 h-3 text-neon-green" />
                <span>{skill}</span>
              </span>
            ))}
            {job.missingSkills && job.missingSkills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 glass-morph rounded-lg text-xs font-medium border border-neon-pink/30 flex items-center space-x-1"
              >
                <Plus className="w-3 h-3 text-neon-pink" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onApply(job)}
            className="w-full py-3 bg-neon-blue text-dark-900 rounded-xl font-semibold"
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);

// Application Form Modal Component
const ApplicationFormModal = ({ job, onClose, userSkills }) => {
  const { generateCoverLetter, loading: aiLoading } = useGemini();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleGenerateCoverLetter = async () => {
    try {
      // STATIC MODE: Use mock cover letter instead of Gemini API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${job.title} position at ${job.company}. With my expertise in ${skills.slice(0, 3).join(', ')}, I am confident I can contribute significantly to your team.

Throughout my career, I have developed strong proficiency in ${job.matchedSkills?.slice(0, 2).join(' and ')}, which aligns perfectly with your requirements. My experience includes building scalable applications, implementing best practices, and collaborating with cross-functional teams to deliver high-quality solutions.

What excites me most about this opportunity is the chance to work on innovative projects at ${job.company}. I am particularly drawn to your company's commitment to excellence and technical innovation. I am eager to bring my skills in ${skills[0]} and ${skills[1]} to help drive your projects forward.

I am actively working on developing expertise in ${job.missingSkills?.slice(0, 2).join(' and ')}, which I understand are valuable for this role. I am a quick learner and committed to continuous professional development.

I would welcome the opportunity to discuss how my background and skills can contribute to ${job.company}'s success. Thank you for considering my application.

Best regards,
[Your Name]`;
      
      setFormData({ ...formData, coverLetter: mockCoverLetter });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Failed to generate cover letter. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Create FormData for multipart form submission
      const formDataToSend = new FormData();
      formDataToSend.append('job_id', job.id);
      formDataToSend.append('job_title', job.title);
      formDataToSend.append('company', job.company);
      formDataToSend.append('salary', job.salary);
      formDataToSend.append('location', job.location);
      formDataToSend.append('applicant_name', formData.fullName);
      formDataToSend.append('applicant_email', formData.email);
      formDataToSend.append('applicant_phone', formData.phone);
      formDataToSend.append('cover_letter', formData.coverLetter);
      
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }
      
      // Send to backend API
      const response = await fetch('http://localhost:8000/api/job/apply', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Application submitted successfully:', result);
        setSubmitting(false);
        setSubmitted(true);
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Application submission failed:', errorData);
        alert('Failed to submit application. Please try again.');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please check your connection.');
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl glass-morph-strong rounded-3xl border border-white/20 p-8 max-h-[90vh] overflow-y-auto"
      >
        {!submitted ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-neon-blue mb-2">Job Application</h2>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Briefcase className="w-4 h-4" />
                  <span>Application ID: #{job.id}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 glass-morph rounded-xl flex items-center justify-center hover:border-neon-pink/50 border border-white/10"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Job Details Section */}
            <div className="glass-morph rounded-2xl p-6 mb-6 border border-neon-blue/30">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-neon-yellow" />
                <span>Position Details</span>
              </h3>
              
              <div className="space-y-4">
                {/* Company & Title */}
                <div>
                  <div className="text-2xl font-bold neon-text-blue mb-1">{job.title}</div>
                  <div className="flex items-center space-x-2 text-lg text-neon-purple">
                    <Briefcase className="w-5 h-5" />
                    <span>{job.company}</span>
                  </div>
                </div>

                {/* Location, Type, Match */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-neon-green" />
                    <span className="text-gray-300">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-neon-blue" />
                    <span className="text-gray-300">{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="w-4 h-4 text-neon-purple" />
                    <span className="text-gray-300">{job.match}% Match</span>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-neon-green" />
                  <span className="text-lg font-semibold neon-text-green">{job.salary}</span>
                </div>

                {/* Required Skills */}
                <div>
                  <div className="text-sm text-gray-400 mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {job.matchedSkills && job.matchedSkills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 glass-morph rounded-lg text-xs font-medium border border-neon-green/50 flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-neon-green" />
                        <span>{skill}</span>
                      </span>
                    ))}
                    {job.missingSkills && job.missingSkills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 glass-morph rounded-lg text-xs font-medium border border-neon-pink/30 flex items-center space-x-1"
                      >
                        <Plus className="w-3 h-3 text-neon-pink" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <div className="text-sm text-gray-400 mb-2">Job Description:</div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We are seeking a talented {job.title} to join our team at {job.company}. 
                    The ideal candidate will have experience with {job.matchedSkills?.join(', ')} 
                    and be willing to learn {job.missingSkills?.join(', ')}. This is a {job.type} 
                    position located in {job.location} with competitive compensation of {job.salary}.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Form Section */}
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-neon-blue" />
                <span>Your Application</span>
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <Upload className="w-4 h-4" />
                  <span>Resume / CV</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl flex items-center justify-between cursor-pointer hover:border-neon-blue/50 transition-colors"
                  >
                    <span className={formData.resume ? 'text-white' : 'text-gray-500'}>
                      {formData.resume ? formData.resume.name : 'Choose file...'}
                    </span>
                    <FileText className="w-5 h-5 text-neon-blue" />
                  </label>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center space-x-2 text-sm text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>Cover Letter</span>
                  </label>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerateCoverLetter}
                    disabled={aiLoading}
                    className="px-4 py-2 glass-morph rounded-lg text-xs border border-neon-green/50 hover:shadow-neon-green transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-neon-green" />
                    <span>{aiLoading ? 'Generating...' : 'Generate with AI'}</span>
                  </motion.button>
                </div>
                <textarea
                  required
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Tell us why you're interested in this position..."
                  rows="4"
                  className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-neon-blue text-dark-900 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 glass-morph rounded-xl font-semibold border border-white/20"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <h3 className="text-3xl font-bold text-neon-green mb-3">Application Submitted!</h3>
            <p className="text-gray-400 mb-2">
              Your application for <span className="text-neon-blue font-semibold">{job.title}</span> at <span className="text-neon-purple font-semibold">{job.company}</span> has been submitted successfully.
            </p>
            <p className="text-sm text-gray-500">
              You'll receive a confirmation email shortly.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SkillMatcher;

