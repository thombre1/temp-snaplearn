// Import the Google Generative AI library
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Initialize the API with your key
const apiKey = "AIzaSyAC3hUlGMQXRwcLp1Zi9RrMStjWiVf6QXs";
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
});

// Configuration for the model
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

// Initialize chat session
let chatSession;

// Function to initialize the chat session
function initChatSession() {
  chatSession = model.startChat({
    generationConfig,
    history: [],
  });
}

// Function to toggle the Gemini chat visibility
window.toggleGeminiChat = function() {
  const chatContainer = document.getElementById("geminiChatContainer");
  
  if (chatContainer.classList.contains("hidden")) {
    chatContainer.classList.remove("hidden");
    // Initialize chat session if it doesn't exist
    if (!chatSession) {
      initChatSession();
    }
  } else {
    chatContainer.classList.add("hidden");
  }
};

// Function to ask Gemini and get a response
window.askGemini = async function() {
  const inputElement = document.getElementById("geminiInput");
  const responseElement = document.getElementById("geminiResponse");
  
  const userQuery = inputElement.value.trim();
  
  if (!userQuery) return;
  
  // Show loading state
  responseElement.innerText = "Thinking...";
  
  try {
    // Initialize chat session if it doesn't exist
    if (!chatSession) {
      initChatSession();
    }
    
    // Send message to Gemini
    const result = await chatSession.sendMessage(userQuery);
    
    // Display the response
    responseElement.innerText = result.response.text();
    
    // Clear the input field
    inputElement.value = "";
    
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    responseElement.innerText = "Sorry, there was an error. Please try again.";
  }
};

// Add event listener for Enter key in the input field
document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById("geminiInput");
  if (inputElement) {
    inputElement.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        window.askGemini();
      }
    });
  }
});

// Add navigation function for profile button
window.navigateTo = function(path) {
  window.location.href = path;
};