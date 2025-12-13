import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
  RefreshCw,
  TrendingUp,
  Award,
  Zap,
  Target,
  Eye,
  X,
  Plus
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const ResumeAnalyzer = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploadedFile(file);
    setError(null);
    setAnalyzing(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/resume-analyzer/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const result = await response.json();
      setAnalysisData(result);
      setShowResults(true);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze resume');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setShowResults(false);
    setAnalysisData(null);
    setError(null);
  };

  const handleReanalyze = () => {
    if (uploadedFile) {
      handleFileUpload(uploadedFile);
    }
  };

  const handleGenerateResume = async () => {
    if (!analysisData || !uploadedFile) return;

    setGenerating(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('http://localhost:8000/api/resume-analyzer/generate-better', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate improved resume');
      }

      const result = await response.json();
      setGeneratedResume(result);
      
      // Download the generated resume as markdown/text
      const blob = new Blob([result.improved_resume], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'improved-resume.md';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('✅ Improved resume downloaded successfully!');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate improved resume');
    } finally {
      setGenerating(false);
    }
  };

  // Component: Score Card with Radial Chart
  const ScoreCard = ({ data }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-morph-strong rounded-2xl p-6 border border-white/10"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center justify-center space-x-2">
        <Award className="w-5 h-5 text-neon-purple" />
        <span>Overall Score</span>
      </h2>
      
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <RadialBarChart
            width={192}
            height={192}
            cx={96}
            cy={96}
            innerRadius={60}
            outerRadius={96}
            barSize={20}
            data={[{ value: data?.overall_score || 0, fill: "#00D9FF" }]}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-neon-blue">{data?.overall_score || 0}</div>
              <div className="text-sm text-gray-400">/ 100</div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-400 mt-4">
          {data?.overall_score >= 80 ? "Excellent resume!" : 
           data?.overall_score >= 60 ? "Good, but can be improved" :
           "Needs significant improvement"}
        </p>
      </div>
    </motion.div>
  );

  // Component: Detailed Scores
  const DetailedScores = ({ data }) => {
    const scores = [
      { name: "Content Quality", value: data?.content_quality || 0, color: "neon-blue" },
      { name: "Format & Structure", value: data?.formatting_score || 0, color: "neon-purple" },
      { name: "Keywords Match", value: data?.keyword_match || 0, color: "neon-pink" },
      { name: "Experience Impact", value: data?.experience_impact || 0, color: "neon-green" },
      { name: "Skills Relevance", value: data?.skills_relevance || 0, color: "neon-yellow" },
      { name: "ATS Compatibility", value: data?.ats_compatibility || 0, color: "neon-cyan" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-morph-strong rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-bold mb-4">Detailed Breakdown</h3>
        <div className="space-y-4">
          {scores.map((score, index) => (
            <div key={score.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-300">{score.name}</span>
                <span className="text-sm font-bold">{score.value}%</span>
              </div>
              <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score.value}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`h-full bg-${score.color}`}
                  style={{
                    background: `linear-gradient(90deg, #${
                      score.color === 'neon-blue' ? '00D9FF' :
                      score.color === 'neon-purple' ? 'B026FF' :
                      score.color === 'neon-pink' ? 'FF006B' :
                      score.color === 'neon-green' ? '00FFB9' :
                      score.color === 'neon-yellow' ? 'FFD700' :
                      '00FFFF'
                    }, rgba(255,255,255,0.5))`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Component: Insights Section
  const InsightsSection = ({ title, icon, items = [], color = "blue" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morph-strong rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        {icon}
        <span>{title}</span>
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 glass-morph rounded-xl"
          >
            <div className={`w-2 h-2 rounded-full bg-neon-${color} mt-2`} />
            <p className="text-sm text-gray-300 flex-1">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Component: Keywords Section
  const KeywordsSection = ({ title, keywords = [], color = "pink" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morph-strong rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <Zap className={`w-5 h-5 text-neon-${color}`} />
        <span>{title}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`px-3 py-2 glass-morph rounded-lg text-sm border border-neon-${color}/30 hover:border-neon-${color}/60 transition-colors cursor-pointer`}
          >
            {keyword}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

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
              <h1 className="text-4xl font-bold text-neon-blue">AI Resume Analyzer</h1>
              <p className="text-gray-400 mt-1">Get instant AI-powered insights to improve your resume</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 glass-morph rounded-full">
            <Sparkles className="w-4 h-4 text-neon-yellow animate-pulse" />
            <span className="text-sm">AI Powered</span>
          </div>
        </motion.div>

        {!showResults ? (
          /* Upload Section */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-morph-strong rounded-3xl p-12 border border-white/10 text-center">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 transition-all ${
                  dragActive ? 'border-neon-blue bg-neon-blue/10' : 'border-white/20'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
                
                <motion.div
                  animate={{ y: analyzing ? 0 : [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-6 bg-neon-blue rounded-full flex items-center justify-center"
                >
                  {analyzing ? (
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Upload className="w-12 h-12" />
                  )}
                </motion.div>

                <h2 className="text-2xl font-bold mb-2">
                  {analyzing ? 'Analyzing Your Resume...' : 'Upload Your Resume'}
                </h2>
                <p className="text-gray-400 mb-6">
                  {analyzing ? 'AI is processing your document' : 'Drag & drop or click to upload PDF, DOC, or DOCX'}
                </p>

                {!analyzing && (
                  <label htmlFor="file-upload">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-8 py-4 bg-neon-blue text-dark-900 rounded-xl font-bold cursor-pointer"
                    >
                      Choose File
                    </motion.div>
                  </label>
                )}

                {uploadedFile && !analyzing && (
                  <div className="mt-6 glass-morph rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-neon-blue" />
                      <span className="text-sm">{uploadedFile.name}</span>
                    </div>
                    <button onClick={handleReset} className="text-neon-pink hover:text-neon-pink/80">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {error && (
                  <div className="mt-6 glass-morph rounded-xl p-4 border border-neon-pink/50 flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-neon-pink" />
                    <span className="text-sm text-neon-pink">{error}</span>
                  </div>
                )}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="glass-morph rounded-xl p-4">
                  <Zap className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-sm font-semibold">Instant Analysis</p>
                </div>
                <div className="glass-morph rounded-xl p-4">
                  <Target className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                  <p className="text-sm font-semibold">AI Insights</p>
                </div>
                <div className="glass-morph rounded-xl p-4">
                  <Award className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-sm font-semibold">Score & Tips</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Results Section */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Left Column - Scores */}
              <div className="lg:col-span-1 space-y-6">
                {/* Overall Score */}
                <ScoreCard data={analysisData} />

                {/* Detailed Scores */}
                <DetailedScores data={analysisData} />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReanalyze}
                    className="w-full py-3 glass-morph rounded-xl font-semibold border border-white/20 flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Re-analyze</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="w-full py-3 glass-morph rounded-xl font-semibold border border-white/20 flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New</span>
                  </motion.button>
                </div>
              </div>

              {/* Right Column - AI Insights */}
              <div className="lg:col-span-2 space-y-6">
                {/* Strengths */}
                <InsightsSection
                  title="Strengths"
                  icon={<CheckCircle2 className="w-5 h-5 text-neon-green" />}
                  items={analysisData?.strengths || []}
                  color="green"
                />

                {/* Improvements */}
                <InsightsSection
                  title="Recommended Improvements"
                  icon={<TrendingUp className="w-5 h-5 text-neon-blue" />}
                  items={analysisData?.improvements || []}
                  color="blue"
                />

                {/* Missing Keywords */}
                <KeywordsSection
                  title="Missing Keywords"
                  keywords={analysisData?.missing_keywords || []}
                />

                {/* Suggested Skills */}
                <KeywordsSection
                  title="Suggested Skills to Add"
                  keywords={analysisData?.suggested_skills || []}
                  color="purple"
                />

                {/* Generate Better Resume Button */}
                <motion.button
                  whileHover={{ scale: generating ? 1 : 1.02, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
                  whileTap={{ scale: generating ? 1 : 0.98 }}
                  onClick={handleGenerateResume}
                  disabled={generating}
                  className={`w-full py-4 bg-neon-blue text-dark-900 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 ${generating ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Improved Resume...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Better Resume with AI</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
