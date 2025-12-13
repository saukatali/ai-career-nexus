# Dynamic Gemini API Integration

## Frontend API Service

### Location
- **Service:** `frontend/src/services/geminiService.js`
- **Hook:** `frontend/src/hooks/useGemini.js`
- **Config:** `frontend/.env`

### Available Functions

#### 1. **callGeminiAPI(prompt, options)**
Generic API call to Gemini
```javascript
import geminiService from '@/services/geminiService';

const response = await geminiService.callGeminiAPI('Your prompt here', {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 0.9,
  topK: 40
});
```

#### 2. **analyzeResumeWithGemini(resumeText)**
Analyze resume and return structured data
```javascript
const analysis = await geminiService.analyzeResumeWithGemini(resumeText);
// Returns: scores, strengths, improvements, keywords, skills
```

#### 3. **generateImprovedResume(resumeText)**
Generate enhanced resume
```javascript
const improvedResume = await geminiService.generateImprovedResume(resumeText);
// Returns: Markdown formatted improved resume
```

#### 4. **getCareerAdvice(resumeText, question)**
Get personalized career advice
```javascript
const advice = await geminiService.getCareerAdvice(resumeText, 'How can I improve my resume?');
```

#### 5. **generateCoverLetter(resumeText, jobDescription)**
Create tailored cover letter
```javascript
const coverLetter = await geminiService.generateCoverLetter(resumeText, jobDescription);
```

#### 6. **chatWithAI(message, history)**
Interactive AI chat
```javascript
const response = await geminiService.chatWithAI('What skills should I add?', conversationHistory);
```

### Using the React Hook

```javascript
import useGemini from '@/hooks/useGemini';

function MyComponent() {
  const { loading, error, response, analyzeResume, generateResume, getAdvice, chat } = useGemini();

  const handleAnalyze = async () => {
    try {
      const result = await analyzeResume(resumeText);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      <button onClick={handleAnalyze}>Analyze Resume</button>
    </div>
  );
}
```

### Example Use Cases

#### 1. Resume Analysis Component
```javascript
const { analyzeResume, loading } = useGemini();

const handleFileUpload = async (file) => {
  const text = await extractText(file);
  const analysis = await analyzeResume(text);
  setAnalysisData(analysis);
};
```

#### 2. AI Chat Interface
```javascript
const { chat, loading, response } = useGemini();
const [history, setHistory] = useState([]);

const sendMessage = async (message) => {
  const aiResponse = await chat(message, history);
  setHistory([...history, 
    { role: 'user', content: message },
    { role: 'assistant', content: aiResponse }
  ]);
};
```

#### 3. Cover Letter Generator
```javascript
const { generateCoverLetter, loading } = useGemini();

const handleGenerate = async () => {
  const letter = await generateCoverLetter(resumeText, jobDescription);
  downloadFile(letter, 'cover-letter.md');
};
```

### Configuration

Update `.env` file:
```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_MODEL=gemini-2.0-flash-exp
```

### API Models Available
- `gemini-2.0-flash-exp` (Fast, recommended)
- `gemini-pro` (Balanced)
- `gemini-pro-vision` (With image support)

### Error Handling
All functions include try-catch blocks and proper error propagation. Use the hook's `error` state to display errors to users.

### Rate Limits
- Free tier: 60 requests/minute
- Consider implementing request queuing for production

### Best Practices
1. **Cache responses** when possible
2. **Show loading states** during API calls
3. **Handle errors gracefully** with user-friendly messages
4. **Limit text length** to 4000 characters for optimal performance
5. **Use appropriate temperature** (0.5 for factual, 0.9 for creative)
