import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGemini from '../hooks/useGemini';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Zap,
  Brain
} from 'lucide-react';

const AICoach = () => {
  const navigate = useNavigate();
  const { chat, loading: aiLoading } = useGemini();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hi! I'm your AI Career Coach powered by Gemini. I can help you prepare for interviews, improve your communication skills, and provide personalized career advice. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [selectedMode, setSelectedMode] = useState('chat');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const interviewModes = [
    {
      id: 'behavioral',
      name: 'Behavioral Interview',
      icon: <User className="w-5 h-5" />,
      color: 'neon-blue',
      description: 'Practice STAR method responses',
      systemPrompt: 'You are an expert behavioral interview coach. Help candidates practice STAR method (Situation, Task, Action, Result) responses. Provide constructive feedback on their answers, ask relevant follow-up questions, and help them improve their storytelling. Be encouraging but provide specific areas for improvement.'
    },
    {
      id: 'technical',
      name: 'Technical Interview',
      icon: <Brain className="w-5 h-5" />,
      color: 'neon-purple',
      description: 'Coding challenges & system design',
      systemPrompt: 'You are a senior technical interviewer. Ask coding problems, system design questions, and technical concepts. Evaluate solutions, suggest optimizations, discuss time/space complexity, and help candidates think through problems systematically. Focus on problem-solving approach and trade-offs.'
    },
    {
      id: 'mock',
      name: 'Mock Interview',
      icon: <Target className="w-5 h-5" />,
      color: 'neon-pink',
      description: 'Full interview simulation',
      systemPrompt: 'You are conducting a professional mock interview. Start with "Tell me about yourself", then ask a mix of behavioral and technical questions appropriate for the candidate. Provide realistic interview scenarios, evaluate answers, and give detailed feedback on communication style, content quality, and overall interview performance.'
    },
    {
      id: 'chat',
      name: 'Career Chat',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'neon-green',
      description: 'General career guidance',
      systemPrompt: 'You are a friendly and knowledgeable career coach. Provide personalized career advice, help with career transitions, discuss industry trends, offer guidance on skill development, and support career decision-making. Be conversational, empathetic, and provide actionable insights.'
    }
  ];

  const getSystemPrompt = () => {
    const mode = interviewModes.find(m => m.id === selectedMode);
    return mode?.systemPrompt || 'You are a helpful AI career coach.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || aiLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsAnalyzing(true);

    // Update conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: currentInput }
    ];

    try {
      // STATIC MODE: Use mock responses instead of Gemini API
      const mockResponses = {
        behavioral: [
          "Great question! Let's practice the STAR method. Can you describe a challenging situation you faced in your previous role?",
          "Excellent response! I notice you've covered the Situation and Task well. Could you elaborate more on the Action you took?",
          "Your answer demonstrates strong problem-solving skills. For even more impact, try quantifying your results with specific metrics.",
          "That's a solid example. Remember to structure your answer: Situation, Task, Action, Result. Let's refine each component.",
        ],
        technical: [
          "Let's dive into a system design challenge. How would you design a URL shortening service like bit.ly?",
          "Good thinking! Now consider scalability - how would you handle 1 million requests per second?",
          "Nice approach! Let's discuss trade-offs between different database solutions for this use case.",
          "Consider the CAP theorem here. Would you prioritize consistency or availability in this scenario?",
        ],
        mock: [
          "Welcome to your mock interview! I'll be your interviewer today. Tell me about yourself and why you're interested in this position.",
          "That's a solid introduction. Now, what do you consider your greatest professional achievement?",
          "Impressive! How do you handle working under tight deadlines with multiple priorities?",
          "Great answer! Can you describe a time when you had to work with a difficult team member?",
        ],
        chat: [
          "I'd be happy to help! Based on your background, I recommend focusing on building a strong portfolio of projects. What specific area interests you most?",
          "That's a great question! For career growth, consider these key areas: technical skills, soft skills, networking, and continuous learning. Which would you like to explore first?",
          "Excellent! Let me break down your career goals into actionable steps. First, let's assess your current skills and identify gaps.",
          "I can definitely help you with that. Career transitions take planning. Let's start by understanding your motivation and target role.",
        ]
      };

      const responses = mockResponses[selectedMode] || mockResponses.chat;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: randomResponse,
        timestamp: new Date(),
        feedback: ['behavioral', 'technical', 'mock'].includes(selectedMode) ? generateFeedback() : undefined
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update conversation history
      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: randomResponse }
      ]);
    } catch (error) {
      console.error('Error calling AI:', error);
      
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateFeedback = () => ({
    tone: Math.floor(Math.random() * 30) + 70,
    clarity: Math.floor(Math.random() * 30) + 70,
    confidence: Math.floor(Math.random() * 30) + 70,
    structure: Math.floor(Math.random() * 30) + 70
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-green opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-blue opacity-10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morph border-b border-white/10 px-6 py-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/dashboard')}
                className="w-12 h-12 glass-morph rounded-xl flex items-center justify-center hover:border-neon-green/50 border border-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold gradient-text">AI Career Coach</h1>
                <p className="text-gray-400 text-sm">Real-time interview practice & career guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 glass-morph rounded-full">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm">AI Active</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMessages([messages[0]])}
                className="px-4 py-2 glass-morph rounded-xl flex items-center space-x-2 border border-white/10 hover:border-neon-green/50"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full flex">
            {/* Sidebar - Interview Modes */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 glass-morph border-r border-white/10 p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Target className="w-5 h-5 text-neon-green" />
                <span>Interview Modes</span>
              </h2>

              <div className="space-y-3">
                {interviewModes.map(mode => (
                  <motion.button
                    key={mode.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`
                      w-full p-4 rounded-2xl text-left transition-all
                      ${selectedMode === mode.id 
                        ? `bg-gradient-to-r from-${mode.color}/20 to-transparent border-2 border-${mode.color}/50 shadow-glow` 
                        : 'glass-morph border border-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-${mode.color}/20 flex items-center justify-center flex-shrink-0`}>
                        {mode.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{mode.name}</h3>
                        <p className="text-xs text-gray-400">{mode.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Session Stats */}
              <div className="mt-8 glass-morph rounded-2xl p-6 border border-white/10">
                <h3 className="text-sm font-semibold mb-4 text-gray-400">Session Stats</h3>
                <div className="space-y-3">
                  <StatItem label="Messages" value={messages.length} icon={<Sparkles className="w-4 h-4" />} />
                  <StatItem label="Avg Response Time" value="1.2s" icon={<Zap className="w-4 h-4" />} />
                  <StatItem label="Feedback Items" value="12" icon={<TrendingUp className="w-4 h-4" />} />
                </div>
              </div>
            </motion.aside>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </AnimatePresence>

                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="glass-morph-strong rounded-2xl p-4 max-w-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-200"></div>
                        <span className="text-sm text-gray-400 ml-2">AI is analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="glass-morph border-t border-white/10 p-6">
                <div className="max-w-4xl mx-auto">
                  {/* Real-time Feedback Indicators */}
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 grid grid-cols-4 gap-3"
                    >
                      <FeedbackIndicator label="Tone" value={85} color="neon-blue" />
                      <FeedbackIndicator label="Clarity" value={78} color="neon-green" />
                      <FeedbackIndicator label="Pace" value={92} color="neon-purple" />
                      <FeedbackIndicator label="Confidence" value={88} color="neon-pink" />
                    </motion.div>
                  )}

                  {/* Input Controls */}
                  <div className="flex items-end space-x-4">
                    {/* Voice Input */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsRecording(!isRecording)}
                      className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                        ${isRecording 
                          ? 'bg-gradient-to-br from-neon-pink to-neon-purple shadow-neon-pink animate-pulse' 
                          : 'glass-morph border border-white/10 hover:border-neon-green/50'
                        }
                      `}
                    >
                      {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </motion.button>

                    {/* Text Input */}
                    <div className="flex-1 glass-morph-strong rounded-2xl border border-white/10 focus-within:border-neon-green/50 transition-colors">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your message or use voice input..."
                        className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none"
                        rows="3"
                      />
                    </div>

                    {/* Send Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0, 255, 185, 0.5)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="w-14 h-14 bg-gradient-to-br from-neon-green to-neon-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-6 h-6" />
                    </motion.button>

                    {/* Speaker Toggle */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsSpeaking(!isSpeaking)}
                      className="w-14 h-14 glass-morph rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 hover:border-neon-blue/50"
                    >
                      {isSpeaking ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>Press Enter to send, Shift+Enter for new line</span>
                    <span>Powered by AI • Real-time Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Message Bubble Component
const MessageBubble = ({ message }) => {
  const isAI = message.type === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex items-start space-x-4 ${!isAI && 'flex-row-reverse space-x-reverse'}`}
    >
      {/* Avatar */}
      <div className={`
        w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0
        ${isAI 
          ? 'bg-gradient-to-br from-neon-green to-neon-blue' 
          : 'bg-gradient-to-br from-neon-purple to-neon-pink'
        }
      `}>
        {isAI ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
      </div>

      <div className={`flex-1 ${!isAI && 'flex flex-col items-end'}`}>
        {/* Message Content */}
        <div className={`
          glass-morph-strong rounded-2xl p-4 max-w-2xl
          ${!isAI && 'bg-neon-gradient/10 border-neon-purple/30'}
        `}>
          <p className="text-gray-200 leading-relaxed">{message.text}</p>
          <span className="text-xs text-gray-500 mt-2 block">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>

        {/* Feedback Panel */}
        {message.feedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-morph rounded-xl p-4 mt-3 max-w-2xl border border-neon-green/30"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-semibold">AI Behavior Analysis</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FeedbackBar label="Tone" value={message.feedback.tone} />
              <FeedbackBar label="Clarity" value={message.feedback.clarity} />
              <FeedbackBar label="Confidence" value={message.feedback.confidence} />
              <FeedbackBar label="Structure" value={message.feedback.structure} />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Feedback Indicator Component
const FeedbackIndicator = ({ label, value, color }) => (
  <div className="glass-morph rounded-xl p-3 border border-white/10">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-sm font-bold neon-text-${color}`}>{value}%</span>
    </div>
    <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className={`h-full bg-${color} rounded-full`}
      />
    </div>
  </div>
);

// Feedback Bar Component
const FeedbackBar = ({ label, value }) => {
  const getColor = (val) => {
    if (val >= 80) return 'neon-green';
    if (val >= 60) return 'neon-blue';
    return 'neon-pink';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className={`text-xs font-bold neon-text-${getColor(value)}`}>{value}%</span>
      </div>
      <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full bg-${getColor(value)} rounded-full`}
        />
      </div>
    </div>
  );
};

// Stat Item Component
const StatItem = ({ label, value, icon }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <div className="text-neon-green">{icon}</div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
    <span className="text-sm font-bold">{value}</span>
  </div>
);

export default AICoach;
