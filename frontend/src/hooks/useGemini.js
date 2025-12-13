import { useState, useCallback } from 'react';
import geminiService from '../services/geminiService';

/**
 * Custom hook for using Gemini AI in React components
 */
export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const callGemini = useCallback(async (prompt, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.callGeminiAPI(prompt, options);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeResume = useCallback(async (resumeText) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.analyzeResumeWithGemini(resumeText);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateResume = useCallback(async (resumeText) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.generateImprovedResume(resumeText);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAdvice = useCallback(async (resumeText, question) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.getCareerAdvice(resumeText, question);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCoverLetter = useCallback(async (resumeText, jobDescription) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.generateCoverLetter(resumeText, jobDescription);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const chat = useCallback(async (message, history = []) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.chatWithAI(message, history);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResponse(null);
  }, []);

  return {
    loading,
    error,
    response,
    callGemini,
    analyzeResume,
    generateResume,
    getAdvice,
    generateCoverLetter,
    chat,
    reset,
  };
};

export default useGemini;
