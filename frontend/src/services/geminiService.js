const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash-exp';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 3000; // 3 seconds between requests

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Call Gemini API with retry logic and rate limiting
 * @param {string} prompt - The prompt to send to Gemini
 * @param {object} options - Optional configuration
 * @returns {Promise<string>} - The AI response text
 */
export const callGeminiAPI = async (prompt, options = {}) => {
  const {
    temperature = 0.7,
    maxTokens = 2048,
    topP = 0.9,
    topK = 40,
    maxRetries = 2,
  } = options;

  // Rate limiting - wait if needed
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await wait(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  lastRequestTime = Date.now();

  let lastError;
  
  // Retry loop
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
            topP,
            topK,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || 'Gemini API request failed';
        
        // Check for rate limit (429)
        if (response.status === 429) {
          if (attempt < maxRetries - 1) {
            const waitTime = (attempt + 1) * 5000; // 5s, 10s
            console.log(`Rate limited. Waiting ${waitTime}ms before retry...`);
            await wait(waitTime);
            continue;
          }
          throw new Error('⚠️ Too many requests. Please wait a minute and try again.');
        }
        
        // Check for quota errors
        if (errorMessage.includes('quota') || errorMessage.includes('exceeded')) {
          throw new Error('⚠️ Daily quota exceeded. Get a new API key at https://makersuite.google.com/app/apikey');
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (!text) {
        throw new Error('No response generated');
      }
      
      return text;
      
    } catch (error) {
      lastError = error;
      
      // Only retry on network errors
      if (attempt < maxRetries - 1 && !error.message?.includes('quota') && !error.message?.includes('Daily')) {
        await wait(2000);
        continue;
      }
      break;
    }
  }
  
  console.error('Gemini API Error:', lastError);
  throw lastError;
};

/**
 * Analyze resume content using Gemini
 * @param {string} resumeText - The resume text to analyze
 * @returns {Promise<object>} - Analysis results
 */
export const analyzeResumeWithGemini = async (resumeText) => {
  const prompt = `You are an expert resume analyzer. Analyze this resume and provide feedback in JSON format:

Resume:
${resumeText.substring(0, 4000)}

Return JSON with:
{
  "overall_score": <0-100>,
  "content_quality": <0-100>,
  "formatting_score": <0-100>,
  "keyword_match": <0-100>,
  "experience_impact": <0-100>,
  "skills_relevance": <0-100>,
  "ats_compatibility": <0-100>,
  "strengths": [<4-6 strengths>],
  "improvements": [<4-6 improvements>],
  "missing_keywords": [<6-8 keywords>],
  "suggested_skills": [<5-7 skills>]
}`;

  const response = await callGeminiAPI(prompt, { temperature: 0.5 });
  
  // Clean response
  let cleanedResponse = response;
  if (response.includes('```json')) {
    cleanedResponse = response.split('```json')[1].split('```')[0].trim();
  } else if (response.includes('```')) {
    cleanedResponse = response.split('```')[1].split('```')[0].trim();
  }
  
  return JSON.parse(cleanedResponse);
};

/**
 * Generate improved resume using Gemini
 * @param {string} resumeText - Original resume text
 * @returns {Promise<string>} - Improved resume in markdown
 */
export const generateImprovedResume = async (resumeText) => {
  const prompt = `You are an expert resume writer. Improve this resume:

Original Resume:
${resumeText.substring(0, 4000)}

Create an IMPROVED version with:
1. Better formatting and structure
2. Strong action verbs
3. Quantifiable achievements
4. ATS optimization
5. Professional summary
6. Clear sections

Return ONLY the improved resume in markdown format, no explanations.`;

  return await callGeminiAPI(prompt, { temperature: 0.7, maxTokens: 3000 });
};

/**
 * Get career advice based on resume
 * @param {string} resumeText - Resume text
 * @param {string} question - User's question
 * @returns {Promise<string>} - AI career advice
 */
export const getCareerAdvice = async (resumeText, question) => {
  const prompt = `You are a professional career coach. Based on this resume, answer the question:

Resume Summary:
${resumeText.substring(0, 2000)}

Question: ${question}

Provide clear, actionable advice:`;

  return await callGeminiAPI(prompt, { temperature: 0.8, maxTokens: 1000 });
};

/**
 * Generate cover letter based on resume and job description
 * @param {string} resumeText - Resume text
 * @param {string} jobDescription - Job description
 * @returns {Promise<string>} - Generated cover letter
 */
export const generateCoverLetter = async (resumeText, jobDescription) => {
  const prompt = `Create a professional cover letter based on this resume and job description:

Resume:
${resumeText.substring(0, 2000)}

Job Description:
${jobDescription.substring(0, 2000)}

Write a compelling cover letter in markdown format that:
1. Highlights relevant experience
2. Shows enthusiasm for the role
3. Demonstrates fit for the position
4. Maintains professional tone
5. Is concise (3-4 paragraphs)`;

  return await callGeminiAPI(prompt, { temperature: 0.7, maxTokens: 2000 });
};

/**
 * Chat with AI about career topics
 * @param {string} message - User message
 * @param {array} history - Conversation history
 * @returns {Promise<string>} - AI response
 */
export const chatWithAI = async (message, history = []) => {
  const contextPrompt = history.length > 0
    ? `Previous conversation:\n${history.map(h => `${h.role}: ${h.content}`).join('\n')}\n\n`
    : '';

  const prompt = `${contextPrompt}User: ${message}\n\nAssistant (Career Advisor):`;

  return await callGeminiAPI(prompt, { temperature: 0.9, maxTokens: 1500 });
};

export default {
  callGeminiAPI,
  analyzeResumeWithGemini,
  generateImprovedResume,
  getCareerAdvice,
  generateCoverLetter,
  chatWithAI,
};
